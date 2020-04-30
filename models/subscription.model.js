const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    email:{
        type : String
    }
},
    {
        timestamps: true,
        collection: 'subscriptions'
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;