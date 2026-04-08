const express = require("express");
const app = express();
require('dotenv').config();
// const multer = require("multer");
const PORT = process.env.port;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static('uploads'));

app.use(express.static("public"));
app.set("view engine" , "ejs");


const userItems = require("./routes/userRoutes");
app.use("/" , userItems);

app.listen(PORT || 3010 , ()=>{
    console.log(`server is runing on http://localhost:${PORT || 3010}`);  
})