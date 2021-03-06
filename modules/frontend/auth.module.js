const express = require('express');
const routes = express.Router();
const User = require("../../models/user.model");

// api/auth/login
routes.post('/login', async ( req, res) => {
    try {

        const {email, password} = req.body;

        const user = await User.verifyCredentials(email, password);

        if(!user) {
            return res.status(401).send("Login failed")
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
            message: "invalid credentials"
        });
    }
});

module.exports = routes;