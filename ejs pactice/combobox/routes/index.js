const express = require("express");
const db = require("../config/database");

const router = express.Router();
const country = ["Kano"];

router.get("/", async (req, res) => {
  for (let i = 0; i < country.length; i++) {
    let dbquery = `insert into city (state_id ,city_name) values ((select state_id from state where state_name="Kano") ,"${country[i]}")`;
    const [data] = await db.execute(dbquery);
  }
  res.send("no");
});

module.exports = router;
