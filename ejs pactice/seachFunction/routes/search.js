const express = require("express");
const db = require("../config/database");

const router = express.Router();

let first_name = "",
  last_name = "",
  phone_number = "",
  email = "",
  city = "";
let dbdata;

let sqlQuery = "";
let queryPara = [];

router.post("/", async (req, res) => {
  //first remove old data

   first_name = "",
    last_name = "",
    phone_number = "",
    email = "",
    city = "";
  

   sqlQuery = "";
   queryPara = [];

  console.log(req.body);
  let andor = req.body.andor ? "and" : "or";
  let queryString = req.body.queryString;
  console.log(queryString);

  if (queryString) {
    queryString = queryString.trim();
    if (queryString === "") {
      console.log("search is empty!");
    }
  } else {
    console.log("query string is null");
  }

  let str = queryString;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "$") {
      if (i === str.length) continue;
      for (i = i + 1; i < str.length; i++) {
        if (
          str[i] != "^" &&
          str[i] != "_" &&
          str[i] != "[" &&
          str[i] != "]" &&
          str[i] != "$"
        ) {
          first_name += str[i];
        } else {
          break;
        }
      }
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "^") {
      if (i === str.length) continue;
      for (i = i + 1; i < str.length; i++) {
        if (
          str[i] != "^" &&
          str[i] != "_" &&
          str[i] != "[" &&
          str[i] != "]" &&
          str[i] != "$"
        ) {
          last_name += str[i];
        } else {
          break;
        }
      }
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "_") {
      if (i === str.length) continue;
      for (i = i + 1; i < str.length; i++) {
        if (
          str[i] != "^" &&
          str[i] != "_" &&
          str[i] != "[" &&
          str[i] != "]" &&
          str[i] != "$"
        ) {
          phone_number += str[i];
        } else {
          break;
        }
      }
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[") {
      if (i === str.length) continue;
      for (i = i + 1; i < str.length; i++) {
        if (
          str[i] != "^" &&
          str[i] != "_" &&
          str[i] != "[" &&
          str[i] != "]" &&
          str[i] != "$"
        ) {
          email += str[i];
        } else {
          break;
        }
      }
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "]") {
      if (i === str.length) continue;
      for (i = i + 1; i < str.length; i++) {
        if (
          str[i] != "^" &&
          str[i] != "_" &&
          str[i] != "[" &&
          str[i] != "]" &&
          str[i] != "$"
        ) {
          city += str[i];
        } else {
          break;
        }
      }
    }
  }
  console.log(`first name :${first_name}`);
  console.log(`last name :${last_name}`);
  console.log(`phone number :${phone_number}`);
  console.log(`email :${email}`);
  console.log(`city :${city}`);

  let counter = 0;
  if (first_name) counter++;
  if (last_name) counter++;
  if (phone_number) counter++;
  if (email) counter++;
  if (city) counter++;

  sqlQuery = "select * from users where ";
  if (first_name) {
    sqlQuery += "first_name like ?";
    queryPara.push(`%${first_name}%`);
  }
  if (last_name) {
    if (counter > 1) {
      sqlQuery += ` ${andor} last_name like ?`;
      queryPara.push(`%${last_name}%`);
      counter--;
    } else {
      queryPara.push(`%${last_name}%`);
      sqlQuery += "last_name like ?";
    }
  }
  if (phone_number) {
    if (counter > 1) {
      queryPara.push(`%${phone_number}%`);
      sqlQuery += ` ${andor} phone_no like ?`;
      counter--;
    } else {
      queryPara.push(`%${phone_number}%`);

      sqlQuery += "phone_no like ?";
    }
  }

  if (email) {
    if (counter > 1) {
      queryPara.push(`%${email}%`);

      sqlQuery += ` ${andor} email like ?`;
      counter--;
    } else {
      queryPara.push(`%${email}%`);

      sqlQuery += "email like ?";
    }
  }

  if (city) {
    if (counter > 1) {
      queryPara.push(`%${city}%`);

      sqlQuery += ` ${andor} city like ?`;
      counter--;
    } else {
      queryPara.push(`%${city}%`);

      sqlQuery += "city like ?";
    }
  }
  //   sqlQuery += ";";
  console.log(sqlQuery);
  [dbdata] = await db.execute(sqlQuery, queryPara);
  console.log(dbdata);

  res.render("filteredform", {
    dbdata,
    //   currentPage: page,
    //   totalPages,
    //   pages,
    //   sortField: finalSortField,
    //   order,
  });
});

router.get("/", async (req, res) => {
  let sortField = req.query.sort || "user_id";
  let order = req.query.order === "desc" ? "desc" : "asc";

  const allowedSortField = [
    "user_id",
    "first_name",
    "last_name",
    "city",
    "gender",
  ];

  const finalSortField = allowedSortField.includes(sortField)
    ? sortField
    : "user_id";
  let tempquery = sqlQuery;
  tempquery += ` order by \`${finalSortField}\` ${order}`;

  console.log(sqlQuery);
  console.log(queryPara);

  if (queryPara.length) {
    //queryPara.push(finalSortField);
    // queryPara.push(order);
    console.log(queryPara);

    [dbdata] = await db.execute(tempquery, queryPara);
    console.log(dbdata);

    res.render("filteredform", { dbdata });
  } else {
    res.send("enter the data in serach box first");
  }
});

module.exports = router;