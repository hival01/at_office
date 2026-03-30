const mysql = require("mysql2/promise");
require("dotenv").config();

try{
    const db = mysql.createPool({
        user: process.env.user,
        host: process.env.host,
        password:process.env.password,
        database:process.env.database 
    })

    if(db){
        console.log("db is connected");
    }

    module.exports = db;
}catch(err){
    console.log("error into connecting database");
    console.log(err);
}