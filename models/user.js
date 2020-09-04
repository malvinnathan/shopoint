var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    bcryptpassword: String,
    first_name: String,
    last_name: String,
    email: String,
    phonenumber: Number,
    birthday: Date,
    uni: String,
    studentid: Number
});

userSchema.plugin(passportLocalMongoose); 
var User = mongoose.model("user",userSchema,"user");

module.exports = User;