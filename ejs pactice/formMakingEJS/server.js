const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("htmlform");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
