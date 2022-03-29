/* eslint-disable no-console */
// /* eslint-disable no-console */
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const config = require('../config');
const configdb = require('../database/configdb');

module.exports = {

  getUsers: (req, resp, next) => {
  },

  postUsers: async (req, resp, next) => {
    const {
      username,
      email,
      password,
      roles,
      photo,
    } = req.body;

    console.log('Ingresaste a PostUser');

    // Verificar si el usuario existe en la base de datos
    await configdb.query('SELECT * FROM usuario  WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.log('Error');
        throw error;
      }
      if (results[0].email === email) {
        console.log('Email existe');
        resp.status(400).json({ error: 'User exists in the database' });
      } else {
        console.log('Creando');
        // Si usuario no existe, crearlo en la base de datos
        // Encriptar el password
        const newPassword = bcrypt.hashSync(password, 10);
        const fields = 'nombre, email, Contrasena, roles, photo';
        // Creando usuario en la base de datos com mysql
        configdb.query(`INSERT INTO usuarios (${fields}) VALUES (?,?,?,?,?)`, [username, email, newPassword, roles, photo], (error, results) => {
          if (error) throw error;

          results.forEach((result) => {
            console.log('results', result);
          });
        });
      }
    });
    // configdb.end();
  },
};
