const express = require('express');
const routes = express.Router();
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");

let Category = require('../../models/category.model');

// routes.route('/create').post((req,res) => {
routes.post('/create', frontendAuthMiddleware, (req, res) => {
    let obj ={
        name: req.body.name
    };

    let category = new Category(obj);

    category.save().then( (category) => {
        let response = {
            success: true,
            message: "Category is successfully created",
            data: category
        };
        res.status(200).json(response);
    });

});

// routes.route('/').get( async (req, res)=> {
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

// routes.route('/:id').get((req,res)=>{
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

// routes.route('/update/:id').post((req,res)=>{
routes.post('/update/:id', frontendAuthMiddleware,  (req, res) => {
    let id = req.params.id;
    
    Category.findById(id, (err, category)=>{
        category.name=req.body.name;
        
        category.save().then((category)=>{
            let response ={
                success: true,
                message: "Category Updated",
                data: category
            }

            res.status(200).json(response);
        });
    });
});

// routes.route('/delete/:id').delete((req,res)=>{
routes.delete('/delete/:id', frontendAuthMiddleware, (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove({_id: id}, (err,category)=>{
        if (err) return console.error(err);

        let response={
            success: true,
            message: "Category Deleted.",
            data: []
        };

        res.status(200).json(response);
    });
});

module.exports = routes;
