/* eslint-disable no-console */
const configdb = require('./configdb');

const existTableClients = () => new Promise((resolve, reject) => {
  let result = false;
  configdb.query('SHOW TABLES like "Clients"', (error, results) => {
    if (error) {
      reject(error);
    }

    if (results.length > 0) {
      console.log('Tabla clientes ya existe', results);
      result = true;
    }

    resolve(result);
  });
});

const createTableClients = () => new Promise((resolve, reject) => {
  configdb.query('CREATE TABLE IF NOT EXISTS clients(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
    if (error) {
      reject(error);
    }

    resolve(results);
  });
});

const dbclients = () => {
  existTableClients().then((res) => {
    if (!res) {
      createTableClients().then((res) => {
        console.log('tabla creada', res);
      }).catch((error) => {
        console.error('error', error);
      });

      return false;
    }
  }).catch((error) => {
    throw error;
  });
};

module.exports = dbclients;
