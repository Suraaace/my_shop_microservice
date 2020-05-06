const express = require('express');
const routes = express.Router();
let User = require('../../models/user.model');
const frontendAuthMiddleware = require("../../middleware/frontend.auth.middleware");

routes.post('/create', frontendAuthMiddleware, (req, res) => {

    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });

    user.save().then( (user) => {
        let response = {
            success: true,
            message: "User is successfully created",
            data:user
        };
        res.status(200).json(response);
    })

});

routes.get('/:id', frontendAuthMiddleware, (req, res) => {
    try {
        let id = req.params.id;

        User.findOne({_id: id}, (err, user) => {
            if (err) return console.error(err);
            let response = {
                success: true,
                message: "User details",
                data: user
            };

            res.status(200).json(response);
        });
    } catch (err) {
        res.status(500).json(err)
    }

});

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

routes.delete('/delete/:id', frontendAuthMiddleware, (req, res) =>{
   
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