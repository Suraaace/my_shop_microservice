const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const frontendAuthMiddleware = async (req, res, next) => {
    try {

        next();

    } catch (err) {
        res.status(401).send({
            success: false,
            message: "No authorization"
        })
    }
};

module.exports = frontendAuthMiddleware;