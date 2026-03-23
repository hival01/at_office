const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database  
});

// db.connect((err)=>{
//     if(err) throw err;
//     console.log("database connected !");
// })

module.exports = db;