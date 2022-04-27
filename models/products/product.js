const mongoose = require("mongoose");
const ProductDetail = require("./productdetail");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    product_images: {
        type: Array,
        required: true
    },
    product_detail: {
        type: [ProductDetail.schema],
        required: true,
    },
    available: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
        default: 1
    },
    qna: {
        type: [
            {
                question: {
                    type: String
                },
                answer: {
                    type: String
                }
            }
        ],
        required: true,
        default: []
    }
},{collection:'products'});

module.exports = new mongoose.model(`Products`,ProductSchema);
