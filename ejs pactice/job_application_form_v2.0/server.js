const express = require("express");
require('dotenv').config();
const PORT = process.env.port || 3005;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine" , "ejs");

const jobForm = require("./routes/jobForm");
// app.use("/", jobForm)

app.use("/form", jobForm);

app.use("/", (req, res)=>{  
    // res.send(`<a href="/form"> go home</a>`);
    // res.send("hello")    
    res.redirect("/form")
    
})
app.use((req, res)=>{
    res.render(`404`)
});
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});