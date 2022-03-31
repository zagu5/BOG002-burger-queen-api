/* eslint-disable no-else-return */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const { validateUser } = require('../services/users');

module.exports = (secret) => async (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    // TODO: validar usuario con el decodeToken usando el email
    validateUser(decodedToken.email).then((res) => {
      if (res.validUser) {
        req.body.user = res.results;
        next();
      }
    }).catch((error) => {
      console.error('error', error);
    });
  });
};

module.exports.isAuthenticated = (req) => {
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  if (req.body.user) {
    console.log('ingresaste a autorizar');
    return true;
  }
};

module.exports.isAdmin = (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  if (req.body.user.roles === 'admin') {
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
