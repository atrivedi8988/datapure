const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({
    id:Number,
    name:String,
    brand:String,
    price:Number,
    display:{
        size:String,
        resolution:String,
        type:String
    },
    camera:{
        main:String,
        ultrawide:String,
        telephoto:String
    },
    battery:String,
    storage:String,
    ram:String
})

module.exports = mongoose.model("products",ProductSchema)