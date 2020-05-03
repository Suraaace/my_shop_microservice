const routes = [
    {
        url: '/api/auth',
        module: require('../modules/frontend/auth.module')
    },
    {
        url: '/api/user',
        module: require('../modules/frontend/user.module')
    },
    {
        url: '/api/product',
        module: require('../modules/frontend/product.module')
    },
    {
        url: '/api/category',
        module: require('../modules/frontend/category.module')
    },
    {
        url: '/api/order',
        module: require('../modules/frontend/order.module')
    },
    {
        url: '/api/coupon',
        module: require('../modules/frontend/coupon.module')
    },
    {
        url: '/api/subscription',
        module: require('../modules/frontend/subscription.module')
    },
];

module.exports = routes;