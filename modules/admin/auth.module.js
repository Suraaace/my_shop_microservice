const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../models/user.model");

// api/auth/login
routes.post('/login', async ( req, res) => {
    try {

        const {email, password} = req.body;

        const user = await User.verifyCredentials(email, password);

        if(!user) {

            return res.status(401).send("Login failed")
        }

        if(user.role === 7) {
            throw new Error('erro');
        }

        const token = await user.generateAuthToken();

        let response = {
            success: true,
            message: "Auth token",
            data: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: token
            }
        };

        res.status(200).send( response)

    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Cant login at the moment"
        });
    }

    //es5 => node
    //es6 => react

});

// validate token
routes.get('/validate/jwt', async ( req, res) => {

    try {

        let token = req.query.token;
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: data._id, token: token});
        if(!user) {
            throw new Error('erro');
        }

        res.status(200).send({
            success: true,
            message: "Valid Token"
        })

    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Token Expired"
        })
    }
});

module.exports = routes;