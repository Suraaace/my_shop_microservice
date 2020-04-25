const express = require("express");
const routes = express.Router();
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");


let Product = require('../../models/product.model');

routes.get('/', frontendAuthMiddleware, async (req, res) => {

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
    }
});

routes.get('/:id', frontendAuthMiddleware, (req, res) => {

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

module.exports = routes;