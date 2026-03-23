const express = require("express");
const router = express.Router();

router.get("/",(req, res)=>{
     res.render("form")
    //res.send("helo");
});

router.post("/", (req, res)=>{
    
});


module.exports=router;