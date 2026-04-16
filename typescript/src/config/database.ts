import mysql, {Pool}  from "mysql2/promise";
import dotenv from "dotenv";
import { AppError } from "../middleware/errorHandler";

dotenv.config();
const requireEnv = ["host" ,"user" ,"password" ,"database"];
for(const env of requireEnv){
    if(!process.env[env]){
        throw new AppError(`${env} is not set` , 500);
    }
}

const db:Pool = mysql.createPool({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    dateStrings: true ,
});


export default db;
