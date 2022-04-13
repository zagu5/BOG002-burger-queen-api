/* eslint-disable no-console */
const configdb = require('./configdb');

const existTableTables = () => new Promise((resolve, reject) => {
  let result = false;

  configdb.query('SHOW TABLES like "Tables"', (error, results) => {
    if (error) {
      reject(error);
    }
    if (results.length > 0) {
      console.log('Tabla mesas ya existe', results);
      result = true;
    }
    resolve(result);
  });
});

const createTableTables = () => new Promise((resolve, reject) => {
  configdb.query('CREATE TABLE IF NOT EXISTS tables(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

const dbtables = () => {
  existTableTables().then((res) => {
    if (!res) {
      createTableTables().then((res) => {
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

module.exports = dbtables;
