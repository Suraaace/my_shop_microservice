// get by id(validating coupon)
//if valid compare limit and usage and throw ture false.

// apply couponCode api (post / query / increase usage by 1 and save)


const express = require("express");
const routes = express.Router();

let Coupon = require('../../models/coupon.model');

routes.route('/validate/:couponCode').get((req, res) => {
    let code = req.params.couponCode;
    Coupon.findOne({couponCode: code}, (err, coupon) => {
    
        let response = {
            success: true,
            message: "Coupon Status",
            data: {}
        };

        if (!coupon) {
            return res.status(200).json(response);
        }

        if(coupon.usage < coupon.limit) {
            response["data"] = coupon;
        } 
        
        res.status(200).json(response);




        // coupon.couponCode=req.body.couponCode;
        // coupon.usage = parseInt(coupon.usage) + 1 ;

        // coupon.save().then((coupon) => {
        //     let response = {
        //         succes: true,
        //         message: "Coupon is Valid." ,
        //         data: coupon
        //     };
        //     res.status(200).json(response);
        // });   
    });
});

module.exports = routes;