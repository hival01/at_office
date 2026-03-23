const express = require("express");
require('dotenv').config();
const app = express();
app.set("view engine" , "ejs");

app.use(express.static("public"));
const userItems = require("./routes/user");
app.use("/" , userItems);

app.listen(process.env.PORT ||3000,()=>{
    console.log(`server is runnig on http://localhost:${process.env.PORT ||3000}`);
})