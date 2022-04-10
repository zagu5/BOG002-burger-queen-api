const configdb = require('./configdb');

const existTableProductType= () => new Promise((resolve, reject) => {
    let result = false;
    configdb.query('SHOW TABLES like "Tipo_producto"', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results.length > 0) {
        console.log('Tabla product_type ya existe', results);
        result = true;
      }
      resolve(result);
    });
  });

const createTableProductType = () => new Promise((resolve, reject) => {
    configdb.query('CREATE TABLE IF NOT EXISTS productType(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, categories_id INT NOT NULL, constraint fk_id FOREIGN KEY(categories_id) REFERENCES categories(id))', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const dbProductType = () => {
    existTableProductType().then((res) => {
      if (!res) {
        createTableProductType().then((res) => {
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
module.exports = dbProductType;