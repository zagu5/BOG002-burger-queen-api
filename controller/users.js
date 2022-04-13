/* eslint-disable no-console */
// /* eslint-disable no-console */
// const jwt = require('jsonwebtoken');
// const config = require('../config');
const { validateUser, createUser } = require('../services/users');

// const { secret } = config;

module.exports = {

  getUsers: (req, resp, next) => {
  },

  postUsers: (req, resp) => {
    const { email } = req.body;

    // Verifica si el email existe en la base de datos
    validateUser(email).then((res) => {
      console.log(res, 'post res promesa');
      if (!res.validUser) {
        // Funcion para crear usuario en la base de datos
        createUser(req.body).then((res) => {
          const { msg } = res;
          console.log('createUser', res);
          resp.status(200).json({ msg });
        }).catch((error) => {
          console.error('error', error);
        });
      } else {
        console.log('Ya fue creado el usuario', res);
        const { msg, code } = res;
        resp.status(code).json({ msg });
      }
    }).catch((error) => {
      console.error('error', error);
    });
  },
};
