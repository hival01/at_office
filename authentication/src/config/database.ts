import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
    host:String(process.env.host),
    user:String(process.env.user),
    password:String(process.env.password),
    database:String(process.env.database),


})

if(!db){
    console.log("db is not created");
}

export default db;
