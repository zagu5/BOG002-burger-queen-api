/* eslint-disable no-console */
const configdb = require('../database/configdb');

// Funcion para revisar si la categotia ya existe en la base de datos
const validateProductType = (name) => new Promise((resolve, reject) => {
  let validProductType = true;
  let msg = '';
  let code = 0;
  console.log('name', name);

  configdb.query('SELECT * FROM productType  WHERE name = ?', [name], (error, results) => {
    console.log('comparando nombres', results);
    if (error) {
      reject(error);
    }

    if (results.length === 0) {
      code = 401;
      msg = 'ProductType does not exist';
      validProductType = false;
    } else if (results[0].name !== name) {
      code = 400;
      msg = 'ProductType Invalid';
      validProductType = false;
    } else {
      code = 200;
      msg = 'ProductType exist';
      validProductType = true;
    }
    resolve({
      validProductType,
      results: results[0],
      code,
      msg,
    });
  });
});

// Funcion para crear la categoria en la base de datos
const createProductType = (name, categoriesId) => new Promise((resolve, reject) => {
  const fields = 'name, categories_id';

  configdb.query(`INSERT INTO productType (${fields}) VALUES (?,?)`, [name, categoriesId], (error, results) => {
    if (error) {
      reject(error);
    }

    console.log(results, 'CREATE PRODUCT TYPE');
    const msg = 'ProductType of Product created successfully';
    resolve({ msg });
  });
});

module.exports = { validateProductType, createProductType };
