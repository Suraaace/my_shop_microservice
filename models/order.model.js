const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    },
},
{   
        timestamps: true,
        collection: 'orders'
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;