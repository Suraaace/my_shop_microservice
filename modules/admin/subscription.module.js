const express = require("express");
const routes = express.Router();

let Subscription = require('../../models/subscription.model');

routes.route('/').get(async (req, res) => {
    
    try {
        let subscription = await Subscription.find();

        let response = {
            success: true,
            message: 'Subscription lsit',
            data: subscription
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        });
    };    
});


routes.route('/delte/:id').delete((req, res)=> {
    let id = req.params.id;

    Subscription.findByIdAndRemove({_id: id}, (err, subscription)=>{
        if(err) return console.error(err);
        
        let response = {
            success: true,
            message: "Subscription removed",
            data: []
        };
        res.status(200).json(response);
    });
});

module.exports = routes;