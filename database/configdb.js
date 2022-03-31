/* eslint-disable no-console */
const mysql = require('mysql');

// Creando la conexion con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'burger_queen',
});

// Para confirmar conexion con la base de datos
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('CONEXION EXITOSA');
  }
});

module.exports = connection;
