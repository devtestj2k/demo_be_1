const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
},{collection:`categories`});

module.exports = new mongoose.model(`Categories`,CategorySchema);