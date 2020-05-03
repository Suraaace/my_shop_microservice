const routes = [
    {
        url: '/api/admin/auth',
        module: require('../modules/admin/auth.module')
    },
    {
        url: '/api/admin/user',
        module: require('../modules/admin/user.module')
    },
    {
        url: '/api/admin/product',
        module: require('../modules/admin/product.module')
    },
    {
        url: '/api/admin/category',
        module: require('../modules/admin/category.module')
    },
    {
        url: '/api/admin/order',
        module: require('../modules/admin/order.module')
    },
    {
        url: '/api/admin/coupon',
        module: require('../modules/admin/coupon.module')
    },
    {
        url: '/api/admin/subscription',
        module: require('../modules/admin/subscription.module')
    }
];

module.exports = routes;