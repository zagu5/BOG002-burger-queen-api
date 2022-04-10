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

-- Creando la tabla categoria productos
-- CREATE TABLE categorias (
--  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--  nombre_categoria VARCHAR(100) NOT NULL,
--  descripcion  VARCHAR(100) NOT NULL,
--  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- );

-- -- Creando la tabla producto
CREATE TABLE productos (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 descripcion TEXT,
 imagen VARCHAR(100),
 tipo VARCHAR(100) NOT NULL,
 subtipo VARCHAR(100) NOT NULL,
 valor NUMBER,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

alter table productos add foreign key (ID_Categoria) references categoria (id)

alter table productos modify descripcion text;

alter table productos add created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- Mostrar todas las tablas
SHOW TABLES;

-- Describir la tabla
DESCRIBE usuarios;
DESCRIBE categorias;
DESCRIBE productos;

-- Para eliminar una base de datos
DROP TABLE burger_queen;