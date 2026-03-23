const express = require("express");
const fs = require("fs");

const app = express();
fs.readFile("temp.txt", "utf8", (err, data) => {
    if (err) {
      console.log("error occure " + err);
      return;
    }
    console.log("file content :" + data+"this is end of file=======");

});
app.get("/", (req, res) => {
    
    res.send("hello world in node");
});

app.listen(8080);
