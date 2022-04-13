/* eslint-disable no-console */
const configdb = require('./configdb');

const existTableProducts = () => new Promise((resolve, reject) => {
  let result = false;

  configdb.query('SHOW TABLES like "productos"', (error, results) => {
    if (error) {
      reject(error);
    }
    if (results.length > 0) {
      console.log('Tabla productos ya existe', results);
      result = true;
    }

    resolve(result);
  });
});

const createTableProducts = () => new Promise((resolve, reject) => {
  configdb.query('CREATE TABLE IF NOT EXISTS products(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, description TEXT, image VARCHAR(100),  price INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, productType_ID INT NOT NULL, FOREIGN KEY(productType_ID) REFERENCES producttype(id))', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

const dbproducts = () => {
  existTableProducts().then((res) => {
    if (!res) {
      createTableProducts().then((res) => {
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

module.exports = dbproducts;
