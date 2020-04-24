const express = require('express');
const routes = express.Router();
let User = require('../../models/user.model');
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");

// routes.route('/create').post((req, res) => {
routes.post('/create', frontendAuthMiddleware, (req, res) => {

    let obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };

    let user = new User(obj);

    user.save().then( (user) => {
        let response = {
            success: true,
            message: "User is successfully created",
            data:user
        };
        res.status(200).json(response);
    })

});

// routes.route('/').get( async (req, res) => {
routes.get('/', frontendAuthMiddleware, async (req, res) => { // for authorization
    
    try{
        
        let search = JSON.parse(req.query.search);
   
        let dataCount = await User.countDocuments();

        let limit = parseInt(req.query.limit); // how many data
        let offset = parseInt(req.query.offset); // starting point

        let filter = {};
        if(search.firstName) {
            //filter["firstName"] = search.firstName; // Exact search
            filter["firstName"] = {
                $regex: '.*' + search.firstName + '.*',
                $options: 'i'
            } // Like Search
        }

        if(search.lastName){
            filter["lastName"] ={
                $regex: '.*' + search.lastName +'.*',
                $options: 'i'
            }
        }

        if(search.email) {
            filter["email"] = {
                $regex: '.*' + search.email + '.*',
                $options: 'i'
            }
        }

        let user = await User.find(filter).skip(offset).limit(limit);

        let response = {
            success: true,
            message: "Users Listing",
            data: user,
            count: dataCount
        };

        res.status(200).json(response);

    } catch (err) {
        res.status(400).send({
            success: false,
            message: err
        })
    }
    
});

// routes.route('/:id').get((req, res) => {
routes.get('/:id', frontendAuthMiddleware, (req, res) => {
    let id = req.params.id;

    //User.findById(id, (err, user) => {
    User.findOne({_id: id}, (err, user) => {
        if (err) return console.error(err);
        let response = {
            success: true,
            message: "User details",
            data: user
        };

        res.status(200).json(response);
    });
});

// routes.route('/update/:id').post((req, res) => {
routes.post('/update/:id', frontendAuthMiddleware, (req, res) => {
    let id = req.params.id;

    User.findById(id, (err, user) => {
        
        if (err) return console.error(err);

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phone = req.body.phone;

        user.save().then( (user) => {
            let response = {
                success: true,
                message: "User is successfully updated",
                data:user
            };
            res.status(200).json(response);
        });

    });
});

// routes.route('/delete/:id').delete((req, res) => {
routes.delete('/delete/:id', frontendAuthMiddleware, (req, res) =>{
    //Fetch Data from Database

    let id = req.params.id;
    
    User.findByIdAndRemove({_id: id}, (err, user) => {
        if (err) return console.error(err);

        let response = {
            success: true,
            message: "User is successfully deleted",
            data:[]
        };
        res.status(200).json(response);
    });

});

module.exports = routes;