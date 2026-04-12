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

/** :lineIndex is the 0-based row index in database.csv (same as the "update" link in allUser). */
route.get("/update/:lineIndex", (req, res) => {
  const idx = parseInt(req.params.lineIndex, 10);
  if (Number.isNaN(idx) || idx < 0) {
    return res.status(400).send("Invalid row index");
  }
  try {
    const data = fs.readFileSync(databaseFilePath, "utf-8");
    let rowsArr = data.split("\n");
    if (rowsArr.length && rowsArr[rowsArr.length - 1] === "") {
      rowsArr.pop();
    }
    if (idx >= rowsArr.length || rowsArr[idx] === "") {
      return res.status(404).send("Record not found");
    }
    const rowData = rowsArr[idx].split(",");
    const id = rowData[0];
    const userName = rowData[1];
    const userFile = rowData[2];
    const filePath = rowData[3];
    res.render("update", { id, userName, userFile, filePath, rowIndex: idx });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load record");
  }
});

route.post("/update", upload.single("inputFile"), (req, res) => {
  try {
    const userId = String(req.body.id ?? "").trim();
    const userName = (req.body.userName ?? "").trim();
    const rowIndex = parseInt(String(req.body.rowIndex ?? ""), 10);

    if (!userId) {
      return res.status(400).send("Missing id");
    }
    if (Number.isNaN(rowIndex) || rowIndex < 0) {
      return res.status(400).send("Invalid row index");
    }

    const raw = fs.readFileSync(databaseFilePath, "utf-8");
    let rows = raw.split("\n");
    if (rows.length && rows[rows.length - 1] === "") {
      rows.pop();
    } 

    if (rowIndex >= rows.length || rows[rowIndex] === "") {
      return res.status(404).send("Record not found");
    }

    const cols = rows[rowIndex].split(",");
    if (cols[0] !== userId) {
      return res.status(400).send("Invalid request");
    }

    const oldFileName = cols[2];
    const oldPath = cols[3] || `/uploads/${oldFileName}`;

    let newFileName;
    let newPath;
    if (req.file) {
      newFileName = req.file.filename;
      newPath = `/uploads/${newFileName}`;
      if (oldFileName && oldFileName !== newFileName) {
        const oldAbsPath = path.join(__dirname, "..", "uploads", oldFileName);
        fs.unlink(oldAbsPath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Could not delete old file:", err);
          }
        });
      }
    } else {
      newFileName = oldFileName;
      newPath = oldPath;
    }

    rows[rowIndex] = `${userId},${userName},${newFileName},${newPath}`;
    const output = rows.join("\n") + "\n";
    fs.writeFileSync(databaseFilePath, output);
    res.redirect("/allUser");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
});

module.exports = route;
