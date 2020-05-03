const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    couponCode:{
        type: String
    },
    usage: {
        type: String
    },
    limit: {
        type: String
    },
    expiry: {
        type: Date
    },
}, 
    {
        timestamps: true,
        collection: 'coupons'    
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon; 