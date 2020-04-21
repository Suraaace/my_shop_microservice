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

// Routes
const authRoutes = require('./modules/auth/auth.route');
app.use('/api/auth', authRoutes);

const userRoutes = require('./modules/user/user.route');
app.use('/api/user', userRoutes);

const productRoutes = require('./modules/product/product.route');
app.use('/api/product', productRoutes);

const categoryRoutes = require('./modules/category/category.route');
app.use('/api/category', categoryRoutes);

const orderRoutes = require('./modules/order/order.route');
app.use('/api/order', orderRoutes);

let port = process.env.PORT;
app.listen(port);

console.log('Server is started at http://localhost:'+port);