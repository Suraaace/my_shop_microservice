const express = require("express");
const routes = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");


let Product = require('./product.model');

// routes.route('/').get( async (req, res) => {
routes.get('/', authMiddleware, async (req, res) => {
    
    let search = {};
    if(req.query.search) search = JSON.parse(req.query.search);
    
    
    let dataCount = await Product.countDocuments(); // awaits stops the threads untill this line executes.

    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    let filter ={};
   
    if(search.name) {
        filter["name"]={
            $regex: '.*'+ search.name + '.*',
            $options: 'i'
        }
    }

    if(search.price) {
        filter["price"] ={
            $regex: '.*' + search.price + '.*',
            $options: 'i'
        }
    }

    let product = await Product.find(filter)
        .populate('category')
        .skip(offset)
        .limit(limit);

    let response={
        success : true,
        message : "List of Products.",
        data : product,
        count : dataCount
    };

    res.status(200).json(response);
});

// routes.route('/:id').get((req, res)=>{
routes.get('/', authMiddleware, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, product) => {
        if (err) return console.error(err);

        let response ={
            succcess: true,
            message: "Product details",
            data: product
        };
        res.status(200).json(response);
    });

});

// routes.route('/create').post((req,res) => {
routes.post('/create', authMiddleware, (req, res) => { 
    let obj = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        isFeatured : req.body.isFeatured,
        isPopular : req.body.isPopular
    };

    let product = new Product(obj);
    product.save().then((product) => {
        let response = {
            success : true,
            message : "Product is created successfully.",
            data : product
        };
        res.status(200).json(response);
    })
});

// routes.route('/update/:id').post((req, res) => {
routes.post('/update/:id', authMiddleware, (req, res) => {
    
    let id = req.params.id;

    Product.findById(id, (err, product) => {
        if (err) return console.error(err);

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.isFeatured = req.body.isFeatured;
        product.isPopular = req.body.isPopular;

        product.save().then((product) => {
            let response ={
                success : true,
                message : "Product updated.",
                data : product
            };
            res.status(200).json(response);
        });
    });

});

// routes.route('/delete/:id').delete((req, res) =>{
routes.delete('/delete/:id', authMiddleware, (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove({_id: id}, (err, product) =>{
        if (err) return console.error(err);

        let response={
            success: true,
            message: "Product deleted.",
            data: []
        };
        res.status(200).json(response);
    });
}); 

module.exports = routes;