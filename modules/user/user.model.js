const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    token: {
        type: String
    },
}, {
    collection: 'users'
});

// Password Encrypt
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

// Authentication Related
//for model
userSchema.methods.generateAuthToken = async function() {

    const user = this;
    let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.token = token;
    await user.save();

    return token;
};

//for schema
userSchema.statics.verifyCredentials = async (email, password) => {

    const user = await User.findOne({email: email});
    if(!user) {
        throw new Error({error: "Invalid credentials"});
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error({error: "Invalid credentials"});
    }
    return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;