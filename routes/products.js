const express = require("express");
const router = express.Router();
const Product = require("../models/products/product");

router.get(`/`,(req,res)=>{
    res.send("HELLO TO BACK-END");
})
//ADD NEW PRODUCT
router.post(`/add_product`, (request, response) => {
    console.log("Request recieved for add_product");
    const product = new Product({
        name: request.body.product_name,
        price: request.body.product_price,
        brand: request.body.product_brand,
        description: request.body.description,
        product_images: request.body.product_images,
        available: request.body.available,
        discount: request.body.discount,
        category: request.body.category,
        ratings: request.body.ratings,
        qna: request.body.qna,
        product_detail: request.body.product_detail
    });
    product.save().then((savedProduct) => {
        response.send(savedProduct);
    }).catch((error) => {
        console.error("Failed to save product", error);
        response.status(500).send("Failed to save product to the database")
    });
});

//GET ALL PRODUCTS
router.get(`/all_products`, (request, response) => {
    //Fetching from the query-params
    if (request.query.hasOwnProperty(`category_name`)) {
        const category_to_find = request.query.category_name;
        const queryToMongoDb = { category: category_to_find };
        Product.find(queryToMongoDb).then((filteredProducts) => {
            response.send(filteredProducts);
        }).catch((error) => {
            console.error("Failed to get specific product", error);
            response.status(500).send("Something went wrong");
        });
    } else {
        Product.find().then((products) => {
            response.send(products);
        }).catch((error) => {
            console.error("Failed to get all product", error);
            response.status(500).send("Something went wrong");
        });
    }
});

router.get(`/:product_id`, async (request, response) => {
    //fetching from the params
    try {
        const product = await Product.findById(request.params.product_id);
        if(product){
            response.send(product);
        }else{
            response.status.apply(404).send("Object not found in database");
        }
    } catch (error) {
        response.status(500).send("Something went wrong "+error.message);
    }
    // Product.findById(request.params.product_id).then((singleProduct) => {
    //     response.send(singleProduct);
    // }).catch((error) => {
    //     response.status(500).send("Something went wrong "+error.message);
    // })
})

router.put(`/:product_id`, async (request, response) => {
    const product={};
    if(request.body.hasOwnProperty(`product_images`)){
        product.product_images = request.body.product_images
    }
    const isEmpty = Object.keys(product).length === 0;
    if(isEmpty){
        response.status(404).send("Please enter valid product keys to update");
    }else{
        const updatedProduct = await Product.findByIdAndUpdate(request.params.product_id, {
            ...product
        }, { new: true });
        if (updatedProduct) {
            response.send(updatedProduct);
        }else{
            response.status(404).send("Object not found");
        }
    }
});

module.exports = router;