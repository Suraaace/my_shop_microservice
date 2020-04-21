const express = require('express');
const routes = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");

let Category = require('./category.model');

// routes.route('/create').post((req,res) => {
routes.post('/create', authMiddleware, (req, res) => {
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
routes.get('/', authMiddleware, async (req, res) => {

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
});

// routes.route('/:id').get((req,res)=>{
routes.get('/:id', authMiddleware, (req, res) => {
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
routes.post('/update/:id', authMiddleware,  (req, res) => {
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
routes.delete('/delte/:id', authMiddleware, (req, res) => {
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
