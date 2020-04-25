const express = require('express');
const routes = express.Router();
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");

let Category = require('../../models/category.model');

routes.get('/', frontendAuthMiddleware, async (req, res) => {

    try {
        let categories = await Category.find({})
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));

        let response = {
            success: true,
            message: "Category List",
            data: categories
        };

        res.status(200).json(response);

    } catch (err) {
        res.status(200).send({
            success: false,
            message: err
        })
    }
});

routes.get('/:id', frontendAuthMiddleware, (req, res) => {
    let id = req.params.id;
    Category.findById(id,(err, category) =>{
        if(err) return console.error(err);

        let response={
            success:true,
            message:"Category list",
            data: category
        };
        res.status(200).json(response);
    });
});

module.exports = routes;
