const express = require("express");
require('dotenv').config();
const app = express();
app.set("view engine" , "ejs");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static("public"));
const userItems = require("./routes/user");
app.use("/" , userItems);

const userSearch=require("./routes/search");
app.use("/search",userSearch);

app.listen(process.env.PORT ||3000,()=>{
    console.log(`server is runnig on http://localhost:${process.env.PORT ||3000}`);
})