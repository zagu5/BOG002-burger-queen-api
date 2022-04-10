const configdb = require('./configdb');

const existTableDetailProducts= () => new Promise((resolve, reject) => {
    let result = false;
    configdb.query('SHOW TABLES like "detalle productos"', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results.length > 0) {
        console.log('Tabla DetailProducts ya existe', results);
        result = true;
      }
      resolve(result);
    });
  });

const createTableDetailProducts = () => new Promise((resolve, reject) => {
    configdb.query('CREATE TABLE IF NOT EXISTS detailProducts(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, orders_ID INT NOT NULL, FOREIGN KEY(orders_ID) REFERENCES orders(id), products_ID INT NOT NULL, FOREIGN KEY(products_ID) REFERENCES products(id), aditional_ID INT NOT NULL, FOREIGN KEY(aditional_ID) REFERENCES aditional(id), Qty INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const dbdetailProducts = () => {
    existTableDetailProducts().then((res) => {
      if (!res) {
        createTableDetailProducts().then((res) => {
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
module.exports = dbdetailProducts;