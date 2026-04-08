const express = require("express");
const multer = require("multer");
const path = require("path");
const route = express.Router();
const fs = require("fs");
let databaseFilePath = "./database.csv";

route.get("/", (req, res) => {
  res.render("htmlfile");
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// const upload = multer({dest:'uploads/'})
// can choose one of this 2.

route.post("/", upload.single("inputFile"), (req, res) => {
  res.send(`file uploaded :` + req.file.filename);

  function userId() {
    let idCount = 0;
   const data =  fs.readFileSync(databaseFilePath, "utf-8");

      for (let i = 0; i < data.length; i++) {
        if (data[i] == "\n") {
          idCount++;
        }
      }
      return idCount;

  }

  let userData = `${userId() + 1},${req.body.userName},${req.file.filename},/uploads/${req.file.filename}\n`;
  fs.appendFile(databaseFilePath, userData, (err) => {
    if (err) throw err;
    console.log("enter data into csv file");
  });
});

route.get("/allUser", (req, res) => {
  fs.readFile(databaseFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    
    let rowByrowData = data.split("\n")

    res.render('allUser',{rowByrowData})
    
  });
});

module.exports = route;
