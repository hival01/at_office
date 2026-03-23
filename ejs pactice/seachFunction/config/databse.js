const mysql = require("mysql2/promise");
require('dotenv').config();
const db = mysql.createPool({
    user:process.env.user,
    host:process.env.host,
    password:process.env.password,
    database:process.env.database
});

module.exports = db;