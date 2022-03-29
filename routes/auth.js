/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const configdb = require('../database/configdb');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    // TODO: autenticar a la usuarix
    // Haciendo la consulta a la base de datos
    configdb.query('SELECT * from usuarios WHERE email = ? ', [email], async (error, results) => {
      if (error) throw error;

      // Verificar si el usuario existe en la base de datos
      if (results.length > 0) {
        const user = results[0];

        // Verificar el password del usuario con el password en base de datos
        const validPassword = await bcrypt.compare(password, user.contrasena);

        if (validPassword) {
          // Creando el token con JSON Web Token
          const token = jwt.sign({ email }, secret, { expiresIn: 60 * 60 * 24 });
          resp.status(200).json({ message: 'Valid password', token });
        } else {
          resp.status(400).json({ error: 'Invalid Password' });
        }
      } else {
        resp.status(401).json({ error: 'User does not exist' });
      }
      // Finalizando la consulta a base de datos
      configdb.end();
      resp.end();
    });
  });

  return nextMain();
};
