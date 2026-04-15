import mysql  from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    dateStrings: true ,
});


export default db;
