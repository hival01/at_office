const express = require("express");
const multer = require("multer");
const path = require("path");
const route = express.Router();
const fs = require("fs");
const e = require("express");
const { json } = require("stream/consumers");
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
  function userId() {
    let idCount = 0;
    const data = fs.readFileSync(databaseFilePath, "utf-8");

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

  res.redirect("/");
});

route.get("/allUser", (req, res) => {
  fs.readFile(databaseFilePath, "utf-8", (err, data) => {
    if (err) throw err;

    let rowByrowData = data.split("\n");
    console.log(rowByrowData);
    console.log(rowByrowData.length);

    res.render("allUser", { rowByrowData });
  });
});

route.get("/delete/:id", (req, res) => {
  try {
    let rowToDelete = req.params.id;

    let newdata = "";
    let filename = "";
    fs.readFile(databaseFilePath, "utf-8", (err, data) => {
      if (err) throw err;
      let rowByrowData = data;
      console.log(rowByrowData.length);
      let lineCounter = 0;
      let filenameFlag = false;
      for (let i = 0; i < rowByrowData.length; i++) {
        if (rowByrowData[i] == "\n") {
          lineCounter++;
          filenameFlag = false;
        }
        if (rowToDelete - 1 == lineCounter) {
          if (rowByrowData[i] == "/") filenameFlag = true;
          if (filenameFlag) {
            filename += rowByrowData[i];
          }
          continue;
        }
        //  console.log(rowByrowData[i]);
        newdata += rowByrowData[i];
      }

      fs.writeFile(databaseFilePath, newdata, (err, data) => {
        if (err) throw err;
        fs.unlink(`.${filename}`, (err) => {  //.filename means ./upload/timeStamp.txt
          if (err) throw err;
          console.log("file is deleted : " + filename);
        });
      });
    });
    res.redirect("/allUser");
  } catch (err) {
    console.log(err);
    throw err;
  }
});

route.get("/update/:id", async (req, res) => {
  let updateRow = req.params.id;

  try {
    const data = fs.readFileSync(databaseFilePath, "utf-8");

    let rowsArr = data.split("\n");

    console.log(rowsArr);

    for (let i = 0; i < rowsArr.length; i++) {
      if (i == updateRow) {
        //logic for update form
        let rowData = rowsArr[i].split(",");
        console.log("rowData" + rowData[0]);
        const id = rowData[0];
        const userName = rowData[1];
        const userFile = rowData[2];
        console.log(userFile);
        const filePath = rowData[3];

        res.render("update", { id, userName, userFile, filePath });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

route.post("/update", upload.single("inputFile"), async (req, res) => {
  try {
    const data = await fetch(`/delete/${req.body.id}`);
    console.log(data);
    console.log(await data.json());
  } catch (err) {
    console.log(err);
  }

  let userId = req.body.id;
  console.log("user ID:" + userId);

  let userData = `${userId},${req.body.userName},${req.file.filename},/uploads/${req.file.filename}\n`;
  fs.appendFile(databaseFilePath, userData, (err) => {
    if (err) throw err;
    console.log("enter data into csv file");
  });

  res.redirect("/allUser");
});
module.exports = route;
