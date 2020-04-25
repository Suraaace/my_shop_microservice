const express = require("express");
const routes = express.Router();
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");
let Order = require('../../models/order.model');

//routes.route('/').get( async (req, res) => {
routes.get('/', frontendAuthMiddleware, async (req, res) => {
    try{
        let search = {};
        if (req.query.product){
            search["product"] = {
                $regex: '.*' + req.query.product + '.*',
                $options: 'i'
            }
        } 
        if (req.query.user){
            search["user"] ={
                $regex: '.*'+req.query.user + '.*',
                $options: 'i'   
            }
        }

        let dataCount = await Order.countDocuments(search); // give no of search in case of search

        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset); 

        let order = await Order.find(search)
            .populate('user')  // shows the all the obejct data ie user data
            .populate('product')
            .skip(offset)
            .limit(limit);

        let response = {
            success: true,
            message: "Order Listing",
            data: order,
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

// routes.route('/create').post((req, res) => {
routes.post('/create', frontendAuthMiddleware, (req, res) => {
    let obj ={
        product: req.body.product,
        user: req.body.user,
        status: req.body.status
    };

    let order = new Order(obj);

    order.save().then( (order) => {
        let response = {
            success: true,
            message: "Order successfully created.",
            data: order
        };
        res.status(200).json(response);
    })
});

// routes.route('/update/:id').post((req, res) => {
routes.post('/update/:id', frontendAuthMiddleware, (req, res) => {
    let id = req.params.id;
    
    Order.findById(id, (err, order) => {

        if(err) return console.error(err);
        
        order.productId = req.body.productId;
        order.userId = req.body.userId;
        order.status = req.body.status;

        order.save().then((order) =>{
          let response = {
            success: true,
            message: "Order is successfully updated.",
            data: order
          };
          res.status(200).json(response);
        });
    });
});

// routes.route('/delete/:id').delete((req, res) => {
routes.delete('/delete/:id', frontendAuthMiddleware, (req,res) => {
    
    let id = req.params.id;

    Order.findByIdAndRemove({_id: id}, (err, order) => {
        
        if (err) return console.error(err);

        let response = {
            success: true,
            message: "Order is successfully deleted",
            data: []
        };
        res.status(200).json(response);
    });
});


module.exports = routes;