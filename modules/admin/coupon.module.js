const express = require('express');
const routes = express.Router();
const helper = require('../../helper/helper');

let Coupon = require('../../models/coupon.model');

routes.route('/create').post((req, res)=> {
   
    try {
        let obj= {
            couponCode: helper.generateCoupon(),
            usage: req.body.usage,
            limit: req.body.limit,
            expiry: req.body.expiry
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
        
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            messsage: error
        })        
    }   
    
});

routes.route('/').get(async (req, res) => {
    
    try {
       let dataCount = await Coupon.countDocuments();

        let coupon = await Coupon.find({});

        let response = {
            success : true,
            messsage : "List of Coupon",
            data: coupon,
            count : dataCount
        };
                   
        res.status(200).json(response);

    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success:false,
            messsage:error
        })
    }
    
})

routes.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;

    Coupon.findByIdAndRemove({_id: id}, (err, coupon) => {
        if (err) return console.error(err);

        let response= {
            success: true,
            messsage: "Coupon deleted.",
            data: []
        };
        res.status(200).json(response);
    });
});

module.exports = routes;