const express = require("express");
require('dotenv').config();

const app= express();
app.set("view engine" , "ejs");

// app.use(express.json);
// app.use(express.urlencoded({ extended: true })); 


app.use(express.static("public"))

const itemInsert = require("./routes")
app.use("/" , itemInsert);

app.listen(process.env.port || 3000 , ()=>{
    console.log(`server is runnig on http://localhost:${process.env.port ||3000}`);   
})