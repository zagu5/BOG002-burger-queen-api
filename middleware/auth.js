/* eslint-disable no-else-return */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const configdb = require('../database/configdb');

module.exports = (secret) => async (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  await jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    console.log('decodedToken', decodedToken);
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    configdb.query('SELECT * FROM usuarios WHERE email = ?', [decodedToken.email], (error, results) => {
      if (error) throw error;
      console.log('decode 1');
      if (results.length === 0) {
        console.log('decode 2');
        throw new Error('User does not exist');
      } else if (results[0].email !== decodedToken.email) {
        console.log('decode 3');
        throw new Error('Invalid User');
      } else {
        // eslint-disable-next-line prefer-destructuring
        req.user = results[0];
        console.log('decode 4', results[0]);
      }
      configdb.end();
      // resp.end();
      console.log('para seguir al proximo paso');
      next();
    });
  });
};

module.exports.isAuthenticated = (req) => {
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  if (req.user) {
    console.log('ingresaste a autorizar');
    return true;
  }
};

module.exports.isAdmin = (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  if (req.user.roles === 'admin') {
    console.log('Esto es admin');
    return true;
  }
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
