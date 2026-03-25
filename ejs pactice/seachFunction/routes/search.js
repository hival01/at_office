const express = require("express");
const db = require("../config/database");
const router = express.Router();

const user_per_page = 10;
let first_name = "",
  last_name = "",
  phone_number = "",
  email = "",
  city = "";
let dbdata;

let sqlQuery = "";
let queryPara = [];
let totalPages;
let pages=[];

function getPagination(currentPage, totalPages) {
  let pages = [];
  let start = Math.max(1, currentPage - 4);
  let end = Math.min(totalPages, currentPage + 4);

  if (currentPage <= 6) {
    start = 1;
    end = Math.min(10, totalPages);
  }
  if (currentPage >= totalPages - 5) {
    start = Math.max(1, totalPages - 9);
    end = totalPages;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}

router.post("/", async (req, res) => {
  //first remove old data

  ((first_name = ""),
    (last_name = ""),
    (phone_number = ""),
    (email = ""),
    (city = ""));

  sqlQuery = "";
  queryPara = [];
   pages=[];

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
  
  console.log(sqlQuery);
  [dbdata] = await db.execute(sqlQuery, queryPara);
  const totalRows = dbdata.length;
  console.log("total rows");

  console.log(totalRows);

  totalPages = Math.ceil(totalRows / user_per_page);

  pages = getPagination(1, totalPages);
  let queryFor10 = sqlQuery;
  queryFor10 += " order by user_id limit 10 offset 0";
const isget=0;
  const [data10]= await db.execute(queryFor10,queryPara);
  res.render("filteredform", {
    isget,
    data10,
    dbdata,
    currentPage: 1,
    totalPages,
    pages,
    sortField: "user_id",
    order: "asc",
  });
});


const getData =  async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * user_per_page;
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
    console.log(`tempsql when /get ${tempquery}`);

    tempquery += ` order by \`${finalSortField}\` ${order} limit ${user_per_page} offset ${offset}`;
    console.log(`tempsql after += when /get :::${tempquery}`);
    if (queryPara.length) {
      // queryPara.push(10);
      // queryPara.push(offset);
      //queryPara.push(finalSortField);
      // queryPara.push(order);
      console.log(queryPara);
  

      const [data10] = await db.execute(tempquery, queryPara);  ///here 10 will be fetched
      // const totalRows = dbdata.length;
      // const totalPages = Math.ceil(totalRows / user_per_page);

      // const pages = getPagination(page, totalPages);
      // console.log(dbdata);
      const isget=1;
      pages = getPagination(page, totalPages);
      console.log(pages);
      

      res.render("filteredform", {
        data10,
        isget,
        dbdata,
        currentPage: page,
        totalPages,
        pages,
        sortField: finalSortField,
        order,
      });
    } else {
      res.send("enter the data in serach box first");
    }
  } catch {
    console.error("error");
  }
}
router.get("/", getData);

module.exports = router;
