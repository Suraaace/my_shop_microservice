const express = require("express");
const routes = express.Router();
const adminAuthMiddleware = require("../../middleware/admin.auth.middleware");


let Product = require('../../models/product.model');

routes.get('/', adminAuthMiddleware, async (req, res) => {

    try {
        let search = {};
        if(req.query.name) {
            search["name"] = {
                $regex: '.*'+ req.query.name + '.*',
                $options: 'i'
            }
        }
        if(req.query.isFeatured) search['isFeatured'] = req.query.isFeatured;
        if(req.query.isPopular) search['isPopular'] = req.query.isPopular;
        if(req.query.price) search['isPopular'] = req.query.price;

        let dataCount = await Product.countDocuments(search);

        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);

        let product = await Product.find(search)
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

    } catch (err) {
        res.status(400).send({
            success: false,
            message: err
        });
    };
});

routes.get('/:id', adminAuthMiddleware, (req, res) => {

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

routes.post('/create', adminAuthMiddleware, (req, res) => {
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

routes.post('/update/:id', adminAuthMiddleware, (req, res) => {
    
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

routes.delete('/delete/:id', adminAuthMiddleware, (req, res) => {
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