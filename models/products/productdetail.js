const mongoose = require("mongoose");

const ProductDetail = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    value:{
        type: String,
        required:true
    }
});

module.exports = new mongoose.model(`ProductDetail`,ProductDetail)