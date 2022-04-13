/* eslint-disable no-console */
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
const configdb = require('../database/configdb');

// const { secret } = config;

// Funcion para verificar si el usuario existe en la base de datos
const validateUser = (email) => new Promise((resolve, reject) => {
  let validUser = true;
  let msg = '';
  let code = 0;
  console.log('email', email);

  // Realizar el query con la consulta en la base de datos table usuarios
  configdb.query('SELECT * FROM usuarios  WHERE email = ?', [email], (error, results) => {
    if (error) {
      reject(error);
    }

    if (results.length === 0) {
      code = 401;
      msg = 'User does not exist';
      validUser = false;
    } else if (results[0].email !== email) {
      validUser = false;
      code = 400;
      msg = 'Invalid User';
    } else {
      code = 200;
      msg = 'User exist';
      validUser = true;
    }
    resolve({
      validUser,
      results: results[0],
      code,
      msg,
    });
  });
});

// Realizar el query para crear usuario en la base de datos table usuarios
const createUser = (req) => new Promise((resolve, reject) => {
  const {
    username,
    email,
    password,
    rol,
    photo,
  } = req;

  console.log(req, 'req.body');
  let msg = '';
  // let code = 0;
  const newPassword = bcrypt.hashSync(password, 10);
  const fields = 'nombre, email, contrasena, roles, photo';
  console.log(req, 'Parametros');
  // Creando usuario en la base de datos com mysql
  configdb.query(`INSERT INTO usuarios (${fields}) VALUES (?,?,?,?,?)`, [username, email, newPassword, rol, photo], (error, results) => {
    if (error) {
      reject(error);
    }
    console.log(results, 'RESULT DE CREATE');
    msg = 'User created successfully';
    resolve({ msg });
  });
});

module.exports = { validateUser, createUser };
