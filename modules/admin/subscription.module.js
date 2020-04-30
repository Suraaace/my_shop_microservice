const express = require("express");
const route = express.Router();

let Subscription = require('../../models/subscription.model');

routes.route('/').get(async (req, res) => {
    let subscription = await Subscription.find();

    let response = {
        success: true,
        message: 'Subscription lsit',
        data: subscription
    };
    res.status(200).json(response);
    
})

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