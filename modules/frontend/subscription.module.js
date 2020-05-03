const express = require("express");
const routes = express.Router();

let Subscription = require('../../models/subscription.model');

routes.route('/create').post((req, res)=> {
    try {
        // let obj ={
        //     email: req.body.email   
        // }

        let subscription = new Subscription({
            email: req.body.email
        });
        
        subscription.save().then((subscription)=>{
            let response = {
                success: true,
                message: "Subscription added successfully.",
                data: subscription
            };
            res.status(200).json(response);
        }); 
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        });
    };
});

routes.route('/delete/:id').delete((req, res) => {
    try {
        let id = req.params.id;

        Subscription.findByIdAndRemove({_id:id}, (err, subscription) => {
            if (err) return console.error(err);

            let response = {
                success: true,
                message: "Subscription removed.",
                data: []
            };
            res.status(200).json(response);
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: err
        });
    };
});

module.exports = routes;