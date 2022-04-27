const express = require('express');
const router = express.Router();
const Category = require('../models/category/categories');

router.post(`/add_category`, (req, res) => {
    const category = new Category({
        name: req.body.category_name,
        image: req.body.category_image
    });
    category.save().then((savedCategory) => {
        res.send(savedCategory);
    }).catch((error) => {
        res.status(500).send("Something went wrong");
    });
});

router.get(`/all_category`, (req, res) => {
    Category.find().then((allCategories) => {
        res.send(allCategories);
    }).catch((err) => {
        res.status(500).send("Something went wrong");
    });
});

router.put(`/:category_id`,async (req,res)=>{
    const updatedCategory={};
    if(req.body.hasOwnProperty(`category_image`)){
        updatedCategory.image = req.body.category_image
    }
    if(req.body.hasOwnProperty(`category_name`)){
        updatedCategory.name = req.body.category_name
    }
    const isEmpty = Object.keys(updatedCategory).length === 0;
    if(isEmpty){
        res.status(404).send("Please enter valid categories key to update");
    }else{
        const updatedCat = await Category.findByIdAndUpdate(req.params.category_id, {
            ...updatedCategory
        }, { new: true });
        if (updatedCat) {
            res.send(updatedCat);
        }else{
            res.status(404).send("Object not found");
        }
    }
})

module.exports = router;