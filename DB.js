const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);