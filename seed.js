let User = require('./models/user.model');

let user = new User({
    firstName: "Super",
    lastName: "Admin",
    email: "super.admin@domain.com",
    password: "kiran",
    phone: "67623467324"
});
console.log("Db seeding ...");
user.save().then( (user) => {
    console.log("Super admin created");
    console.log("Email: " + user.email);
    console.log("Password: kiran");
}).catch(err => console.log(err));

