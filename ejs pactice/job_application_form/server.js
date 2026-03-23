const express = require("express");
const mysql = require("mysql2");
const router=express.Router();
const bodyParser= require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.set("view engine" , "ejs");
app.use(express.static("public"));
//route
const itemRoutes = require("./routes/users");
app.use("/user", itemRoutes);

const itemUpdateRoute = require("./routes/updateUser");
app.use("/user/update", itemUpdateRoute);

app.listen(process.env.PORT ||3000, ()=>{
    console.log(`server is running on  ${process.env.PORT ||3000}`);
});