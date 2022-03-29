-- Creando la base de datos
CREATE DATABASE burger_queen;

-- Usando la base de datos
use burger_queen;

-- Creando la tabla usuarios
CREATE TABLE usuarios (
 id INT NOT NULL AUTO_INCREMENT,
 nombre VARCHAR(100) NOT NULL,
 email  VARCHAR(100) NOT NULL,
 clave VARCHAR(200) NOT NULL,
 roles VARCHAR(20) NOT NULL,
 photo VARCHAR(100),
 data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Mostrar todas las tablas
SHOW TABLES;

-- Describir la tabla
describe usuarios;

-- Para eliminar una base de datos
DROP TABLE burger_queen;