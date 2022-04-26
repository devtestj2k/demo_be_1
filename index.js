const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log(`MongoDB Atlas is connected successfully`);
});

app.listen(PORT, () => {
    console.log(`Node-Server Started at Port ${PORT}`);
})