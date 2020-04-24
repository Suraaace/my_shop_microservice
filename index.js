var express = require('express');
var es6Renderer = require('express-es6-template-engine');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
var randomstring = require("randomstring");

var app = express();
app.use(cors());
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./DB');

// ====================== Frontend Routes ======================
//require('./routes/admin.routes');
//require('./routes/frontend.routes');

const authFrontendModule = require('./modules/frontend/auth.module');
app.use('/api/auth', authFrontendModule);

const userFrontendModule = require('./modules/frontend/user.module');
app.use('/api/user', userFrontendModule);

const productFrontendModule = require('./modules/frontend/product.module');
app.use('/api/product', productFrontendModule);

const categoryFrontendModule = require('./modules/frontend/category.module');
app.use('/api/category', categoryFrontendModule);

const orderFrontendModule = require('./modules/frontend/order.module');
app.use('/api/order', orderFrontendModule);

//====================== Backend Routes ======================
const authAdminModule = require('./modules/admin/auth.module');
app.use('/api/admin/auth', authAdminModule);

const userAdminModule = require('./modules/admin/user.module');
app.use('/api/admin/user', userAdminModule);

const productAdminModule = require('./modules/admin/product.module');
app.use('/api/admin/product', productAdminModule);

const categoryAdminModule = require('./modules/admin/category.module');
app.use('/api/admin/category', categoryAdminModule);

const orderAdminModule = require('./modules/admin/order.module');
app.use('/api/admin/order', orderAdminModule);

let port = process.env.PORT;
app.listen(port);

console.log('Server is started at http://localhost:'+port);