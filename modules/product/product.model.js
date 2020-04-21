const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: String
        },
        category: {
            type: Schema.Types.ObjectId,
            ref:'Category'
        },
        isFeatured: {
            type: Number,
            enum: [0, 1],
            default: 0
        },
        isPopular: {
            type: Number,
            enum: [0, 1],
            default: 0
        }
    },   
    {
        collection : 'products'
    });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;