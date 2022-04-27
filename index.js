const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");

const PORT = process.env.PORT || 5000;

//Middleware
//Telling the server that the communication between server-client is json based & it has object and/or array of objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.use(`/api/products`,productsRoute);
app.use(`/api/categories`,categoriesRoute);

//Start Mongodb connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log(`MongoDB Atlas is connected successfully`);
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
})