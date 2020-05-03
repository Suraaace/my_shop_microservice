// get by id(validating coupon)
//if valid compare limit and usage and throw ture false.

// apply couponCode api (post / query / increase usage by 1 and save)


const express = require("express");
const routes = express.Router();

let Coupon = require('../../models/coupon.model');

routes.route('/validate/:id').post((req, res) => {
    let id = req.params.id;
    Coupon.findById(id, (err, coupon) => {
        if (err) return console.error(err);

        let usage = coupon.usage; 

        if(usage==10) return console.error(err);

        coupon.couponCode=req.body.couponCode;
        coupon.usage = parseInt(coupon.usage) + 1 ;

        coupon.save().then((coupon) => {
            let response = {
                succes: true,
                message: "Coupon is Valid." ,
                data: coupon
            };
            res.status(200).json(response);
        });   
    });
});

module.exports = routes;