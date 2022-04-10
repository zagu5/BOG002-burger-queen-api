const express = require('express');
const cors = require('cors');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const initDb = require('./database/initDb');
const dbcategories = require('./database/dbcategories');
const dbProductType = require('./database/dbProductType');
const dbaditional = require('./database/dbaditional');
const dbproducts = require('./database/dbproducts');
const dbclients = require('./database/dbclients');
const dbtables = require('./database/dbtables');
const dborders = require('./database/dborders');
const dbdetailProducts = require('./database/dbdetailProducts');

const { port, secret } = config;
const app = express();

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)
app.set('config', config);
app.set('pkg', pkg);
// app.set('configdb', configdb);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(authMiddleware(secret));

initDb();
dbcategories();
dbProductType();
dbaditional();
dbproducts();
dbclients();
dbtables();
dborders();
dbdetailProducts();

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
