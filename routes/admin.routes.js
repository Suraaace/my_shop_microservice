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