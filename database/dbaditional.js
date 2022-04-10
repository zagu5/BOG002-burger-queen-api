const configdb = require('./configdb');

const existTableAditional = () => new Promise((resolve, reject) => {
    let result = false;
    configdb.query('SHOW TABLES like "Adicionales"', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results.length > 0) {
        console.log('Tabla adicionales ya existe', results);
        result = true;
      }
      resolve(result);
    });
  });

const createTableAditional = () => new Promise((resolve, reject) => {
    configdb.query('CREATE TABLE IF NOT EXISTS aditional(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), price INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const dbaditional = () => {
    existTableAditional().then((res) => {
      if (!res) {
        console.log('100');
        createTableAditional().then((res) => {
          console.log('tabla creada', res);
  
        }).catch((error) => {
          console.error('error', error);
        });
        return false;
      }
  
      console.log('200');

    }).catch((error) => {
      throw error;
    });
  };  
module.exports = dbaditional;