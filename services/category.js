/* eslint-disable no-console */
const configdb = require('../database/configdb');

// Funcion para revisar si la categotia ya existe en la base de datos
const validateCategory = (name) => new Promise((resolve, reject) => {
  let validCategory = true;
  let msg = '';
  let code = 0;
  console.log('name', name);

  configdb.query('SELECT * FROM categories  WHERE name = ?', [name], (error, results) => {
    console.log('comparando nombres', results);
    if (error) {
      reject(error);
    }

    if (results.length === 0) {
      code = 401;
      msg = 'Category does not exist';
      validCategory = false;
    } else if (results[0].name !== name) {
      code = 400;
      msg = 'Category Invalid';
      validCategory = false;
    } else {
      code = 200;
      msg = 'Category exist';
      validCategory = true;
    }
    resolve({
      validCategory,
      results: results[0],
      code,
      msg,
    });
  });
});

// Funcion para crear la categoria en la base de datos
const createCategory = (name) => new Promise((resolve, reject) => {
  const fields = 'name';

  configdb.query(`INSERT INTO categories (${fields}) VALUES (?)`, [name], (error, results) => {
    if (error) {
      reject(error);
    }

    console.log(results, 'CREATE CATEGORY');
    const msg = 'Category of Product created successfully';
    resolve({ msg });
  });
});

module.exports = { validateCategory, createCategory };
