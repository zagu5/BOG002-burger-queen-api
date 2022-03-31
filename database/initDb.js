/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const config = require('../config');
const configdb = require('./configdb');

const existAdminUser = () => new Promise((resolve, reject) => {
  let result = false;
  const { adminEmail, adminPassword } = config;
  if (!adminEmail || !adminPassword) {
    const newLocal = 'Usuario no configurado';
    reject(newLocal);
  }
  // TODO: crear usuaria admin
  configdb.query('SELECT * FROM usuarios  WHERE email = ?', [adminEmail], (error, results) => {
    if (error) {
      reject(error);
    }
    if (results.length > 0) {
      console.log('Usuario admin ya existe', results);
      result = true;
    }
    resolve(result);
  });
});
// Funcion para crear usuario admin en la base de datos
const createAdminUser = () => new Promise((resolve, reject) => {
  const { adminEmail, adminPassword } = config;
  const newPassword = bcrypt.hashSync(adminPassword, 10);
  const fields = 'nombre, email, contrasena, roles, photo';
  configdb.query(`INSERT INTO usuarios (${fields}) VALUES (?,?,?,?,?)`, ['admin', adminEmail, newPassword, 'admin', ''], (error, results, fields) => {
    if (error) {
      reject(error);
    }
    console.log('Usuario admin creado', results);
    resolve(results);
  });
});

const existTableUsers = () => new Promise((resolve, reject) => {
  let result = false;
  configdb.query('SHOW TABLES like "usuarios"', (error, results) => {
    if (error) {
      reject(error);
    }
    if (results.length > 0) {
      console.log('Tabla usuarios ya existe', results);
      result = true;
    }
    resolve(result);
  });
});

const createTableUsers = () => new Promise((resolve, reject) => {
  configdb.query('CREATE TABLE IF NOT EXISTS usuarios (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL,  email  VARCHAR(100) NOT NULL, contrasena VARCHAR(200) NOT NULL, roles VARCHAR(20) NOT NULL, photo VARCHAR(100), data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

const initDb = () => {
  existTableUsers().then((res) => {
    if (!res) {
      console.log('100');
      createTableUsers().then((res) => {
        console.log('tabla creada', res);

        existAdminUser().then((res) => {
          if (!res) {
            createAdminUser().then((res) => {
              console.log('Admin creado', res);
            });
          }
        });
      }).catch((error) => {
        console.error('error', error);
      });
      return false;
    }

    console.log('200');
    existAdminUser().then((res) => {
      if (!res) {
        createAdminUser().then((res) => {
          console.log('Creacion de usuario', res);
        });
      }
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = initDb;
