const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: data._id, token: token});
        if(!user) {
            throw new Error('erro');
        }

        req.user = user;
        req.token = token;

        next();

    } catch (err) {
       res.status(401).send({
           success: false,
           message: "No authorization"
       })
    }
};

module.exports = authMiddleware;