const configdb = require('./configdb');

const existTableCategories = () => new Promise((resolve, reject) => {
    let result = false;
    configdb.query('SHOW TABLES like "categories"', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results.length > 0) {
        console.log('Tabla categories ya existe', results);
        result = true;
      }
      resolve(result);
    });
  });

const createTableCategories = () => new Promise((resolve, reject) => {
    configdb.query('CREATE TABLE IF NOT EXISTS categories(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const dbcategories = () => {
    existTableCategories().then((res) => {
      if (!res) {
        createTableCategories().then((res) => {
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
module.exports = dbcategories;