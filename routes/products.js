const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const {
  postCategories,
  postProductType,
  postProduct,
} = require('../controller/products');

/** @module products */
module.exports = (app, nextMain) => {
  /**
   * @name GET /products
   * @description Lista productos
   * @path {GET} /products
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación
   * @response {Array} products
   * @response {String} products[]._id Id
   * @response {String} products[].name Nombre
   * @response {Number} products[].price Precio
   * @response {URL} products[].image URL a la imagen
   * @response {String} products[].type Tipo/Categoría
   * @response {Date} products[].dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   */
  app.get('/products', requireAuth, (req, resp, next) => {
  });

  /**
   * @name GET /products/:productId
   * @description Obtiene los datos de un producto especifico
   * @path {GET} /products/:productId
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.get('/products/:productId', requireAuth, (req, resp, next) => {
  });

  /**
   * @name POST /products
   * @description Crea un nuevo producto
   * @path {POST} /products
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {Number} price Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} products._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name` o `price`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.post('/products', requireAdmin, postProduct);

  /**
   * @name POST /category
   * @description Crea una nueva categoria
   * @path {POST} /category
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @response {Object} category
   * @response {String} category._id Id
   * @response {String} category.name Nombre
   * @response {Date} category.dateEntry Fecha de creación
   * @response {Date} category.dateEntry Fecha de modificación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si la category con `categoryId` indicado no existe
   */
  app.post('/category', requireAdmin, postCategories);

  /**
   * @name POST /product/type
   * @description Crea un nuevo tipo de producto
   * @path {POST} /products/type
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {String} [type] Tipo/Categoría
   * @response {Object} productType
   * @response {String} productstype._id Id
   * @response {String} producttype.name Nombre
   * @response {String} producttype.type Tipo/Categoría
   * @response {Date} producttype.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productTypeId` indicado no existe
   */
  app.post('/products/type', requireAdmin, postProductType);

  /**
   * @name PUT /products
   * @description Modifica un producto
   * @path {PUT} /products
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @body {String} [name] Nombre
   * @body {Number} [price] Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican ninguna propiedad a modificar
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.put('/products/:productId', requireAdmin, (req, resp, next) => {
  });

  /**
   * @name DELETE /products
   * @description Elimina un producto
   * @path {DELETE} /products
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.delete('/products/:productId', requireAdmin, (req, resp, next) => {
  });

  nextMain();
};
