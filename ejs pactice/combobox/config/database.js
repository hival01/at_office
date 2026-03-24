const mysql= require("mysql2/promise");

const db= mysql.createPool({
    user:process.env.user,
    host:process.env.host,
    password:process.env.password,
    database:process.env.database
});

if(!db){
    console.log("error to connecting database");
}else{
    module.exports = db;
}