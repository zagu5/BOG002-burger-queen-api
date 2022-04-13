/* eslint-disable no-console */
// const { createProducts } = require('../services/products');
const { validateCategory, createCategory } = require('../services/category');
const { validateProductType, createProductType } = require('../services/productType');

module.exports = {

  // CREAR CATEGORIA
  postCategories: (req, res) => {
    const { name } = req.body;

    // Verifica si la categoria existe en la base de datos
    validateCategory(name).then((resp) => {
      if (!resp.validCategory) {
        // Funcion para crear la categoria en la base de datos
        createCategory(name).then((resp) => {
          const { msg } = resp;
          console.log('createCategory', resp);
          res.status(200).json({ msg });
        }).catch((error) => {
          console.error('error', error);
        });
      } else {
        console.log('Ya fue creada la categoria', resp);
        const { msg, code } = resp;
        res.status(code).json({ msg });
      }
    }).catch((error) => {
      console.error('error', error);
    });
  },

  // EDITH CATEGORIA
  // DELETE CATEGORIA

  // CREAR PRODUCT TYPE
  postProductType: (req, res) => {
    const { name, categoriesId } = req.body;

    // Verifica si el tipo de producto existe en la base de datos
    validateProductType(name).then((resp) => {
      if (!resp.validateProductType) {
        // Funcion para crear el tipo de producto en la base de datos
        createProductType(name, categoriesId).then((resp) => {
          const { msg } = resp;
          console.log('create ProductType', resp);
          res.status(200).json({ msg });
        });
      } else {
        console.log('Ya fue creado el Tipo producto', resp);
        const { msg, code } = resp;
        res.status(code).json({ msg });
      }
    }).catch((error) => {
      console.error('error', error);
    });
  },

  // CREAR PRODUCT
  postProduct: (req, resp, next) => {
    console.log('productos', req.body);
  },
};
