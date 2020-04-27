const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String
    }
},
    {
        timestamps: true,
        collection: 'çategories' 
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;