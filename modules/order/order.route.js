const express = require("express");
const routes = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
let Order = require('./order.model');

//routes.route('/').get( async (req, res) => {
routes.get('/', authMiddleware, async (req, res) => {
    let search = {};
    if (req.query.search)  search = JSON.parse(req.query.search);

    let dataCount = await Order.countDocuments();

    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);


    let filter = {};
    // if(req.query.user) {
    //     filter['user'] = req.query.user;
    // }


    if(search.product) {
        filter["product"] = {
            $regex: '.*' + search.product + '.*',
            $options: 'i'
        }
    }

    if(search.user) {
        filter["user"] = {
            $regex : '.*' + search.user + '.*',
            $options: 'i'
        }
    }

    

    let order = await Order.find(filter)
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
});

// routes.route('/create').post((req, res) => {
routes.post('/create', authMiddleware, (req, res) => {
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
routes.post('/update/:id', authMiddleware, (req, res) => {
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
routes.delete('/delete/:id', authMiddleware, (req,res) => {
    
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