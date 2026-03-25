const express = require("express");
const db = require("../config/database");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("form");
});

router.get("/api/country", async (req, res) => {
  try {
    const data = await db.execute("select * from country order by country_id");
    res.json(data[0]);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.get("/api/state/:country_id", async (req, res) => {
  const country_id = req.params.country_id;
  try {
    const data = await db.execute(
      `select * from state where country_id=${country_id} order by state_id`,
    );
    res.json(data[0]);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.get("/api/city/:state_id", async (req, res) => {
  const state_id = req.params.state_id;
  try {
    if (!state_id) {
      console.log("select the state first");
    } else {
      const data = await db.execute(
        `select * from city where state_id=${state_id} order by city_id`,
      );
      res.json(data[0]);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;
