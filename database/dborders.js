/* eslint-disable no-console */
const configdb = require('./configdb');

const existTableOrders = () => new Promise((resolve, reject) => {
  let result = false;
  configdb.query('SHOW TABLES like "ordenes"', (error, results) => {
    if (error) {
      reject(error);
    }

    if (results.length > 0) {
      console.log('Tabla ordenes ya existe', results);
      result = true;
    }

    resolve(result);
  });
});

const createTableOrders = () => new Promise((resolve, reject) => {
  configdb.query('CREATE TABLE IF NOT EXISTS orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, hour_finish TIMESTAMP DEFAULT CURRENT_TIMESTAMP, tables_ID INT NOT NULL, FOREIGN KEY(tables_ID) REFERENCES tables(id), clients_ID INT NOT NULL, FOREIGN KEY(clients_ID) REFERENCES clients(id))', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

const dborders = () => {
  existTableOrders().then((res) => {
    if (!res) {
      createTableOrders().then((res) => {
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

module.exports = dborders;
