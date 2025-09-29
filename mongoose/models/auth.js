const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    favourites: [{ type: String }],
    bookings:[{type:String}],
    role:{type:String},

})

const User = mongoose.model("User", userSchema);
module.exports = User;