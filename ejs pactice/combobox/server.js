const express = require("express");
require('dotenv').config();

const app= express();

app.set("view engine" , "ejs");

app.use(express.static("public"))

const itemInsert = require("./routes/index")
app.use("/insert" , itemInsert);

app.listen(process.env.port || 3000 , ()=>{
    console.log(`server is runnig on http://localhost:${process.env.port ||3000}`);   
})