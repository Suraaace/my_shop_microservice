const express = require('express');
const routes = express.Router();

let Coupon = require('../../models/coupon.model');

routes.route('/create').post((req, res)=> {

    couponGen = ()=> {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 5; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        } 
        return result;
    }

    let obj= {
        coupon: couponGen,
        // usage: '',
        // limit: '',
        // expiry: ''
    };

    let coupon = new Coupon(obj);
    coupon.save().then((coupon)=>{
        let response ={
            success: true,
            messsage: 'Coupon Created',
            data: coupon
        };
        res.status(200).json(response);
    })
});

module.exports = routes;