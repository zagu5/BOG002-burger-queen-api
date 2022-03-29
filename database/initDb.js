/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const config = require('../config');

// Funcion para crear usuario admin en la base de datos
const createAdmin = (adminEmail, adminPassword, configdb) => {
  const newPassword = bcrypt.hashSync(adminPassword, 10);
  const fields = 'nombre, email, contrasena, roles, photo';
  configdb.query(`INSERT INTO usuarios (${fields}) VALUES (?,?,?,?,?)`, ['admin', adminEmail, newPassword, 'admin', ''], (error, results, fields) => {
    if (error) {
      throw error;
    }
    // console.log('Usuario creado');
    configdb.end();
  });
};

const initAdminUser = async (configdb) => {
  const { adminEmail, adminPassword } = config;
  if (!adminEmail || !adminPassword) {
    throw new Error('Usuario no configurado');
  }

  // TODO: crear usuaria admin
  await configdb.query('SELECT * FROM usuarios  WHERE email = ?', [adminEmail], (error, results) => {
    if (error) {
      throw error;
    }

    // Validar si el usuario esta creado en base de datos.
    if (results.length === 0) {
      // console.log('Usuario no existe', results);
      createAdmin(adminEmail, adminPassword, configdb);
    }
    // else {
    //   console.log('Usuario existe', results[0]);
    // }
  });
};

const createTableUsers = (configdb) => {
  configdb.query('SHOW TABLES like "usuarios"', (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      // console.log('creando tabla');
      // Para crear la tabla de  usuarios en la base de datos si no existe
      configdb.query('CREATE TABLE IF NOT EXISTS usuarios (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL,  email  VARCHAR(100) NOT NULL, contrasena VARCHAR(200) NOT NULL, roles VARCHAR(20) NOT NULL, photo VARCHAR(100), data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error) => {
        if (error) {
          throw error;
        }
        // console.log('Tabla creada');
        initAdminUser(configdb);
      });
    } else {
      // console.log('Tabla ya existe', results);
      initAdminUser(configdb);
    }
  });
};

module.exports = createTableUsers;
