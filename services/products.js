
const configdb = require('../database/configdb');

const createProducts = (req) => new Promise((resolve, reject) => {
    const {
      name,
      description,
      image,
      type,
      subtype,
      value,
    } = req;
  
    console.log(req, 'req.body');
    let msg = '';

    const fields = 'nombre, descripcion, imagen, tipo, subtipo, valor';
    console.log(req, 'Parametros');
    // Creando usuario en la base de datos com mysql
    configdb.query(`INSERT INTO products (${fields}) VALUES (?,?,?,?,?,?)`, [
      name,
      description,
      image,
      type,
      subtype,
      value,
    ], (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results, 'RESULT DE CREATE');
      msg = 'Product created successfully';
      resolve({ msg });
    });
  });

  module.exports = { createProducts };