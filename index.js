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
const adminRoutes = require('./routes/admin.routes');
const frontendRoutes = require('./routes/frontend.routes');

const routes = [...adminRoutes, ...frontendRoutes];

for( let route of routes) {
  app.use(route.url, route.module)
}

let port = process.env.PORT;
app.listen(port);

console.log('Server is started at http://localhost:'+port);