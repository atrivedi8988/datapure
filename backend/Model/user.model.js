const mongoose = require("mongoose")

const  UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken : String,
    resetPasswordTokenExpiry : Number
})

module.exports = mongoose.model("user",UserSchema)