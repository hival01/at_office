const express = require("express");
const router = express.Router();
const db = require("../config/database");

const user_per_page = 100;

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

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * user_per_page;

    const sortField = req.query.sort || "user_id";
    const order = req.query.order === "desc" ? "desc" : "asc";

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

    // Count total rows
    const [countResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM users",
    );
    const totalRows = countResult[0].total;
    const totalPages = Math.ceil(totalRows / user_per_page);

    // Fetch paginated data
    const dataQuery = `
      SELECT * 
      FROM users
      ORDER BY \`${finalSortField}\` ${order}
      LIMIT ? OFFSET ?
    `;

    const [users] = await db.query(dataQuery, [user_per_page, offset]);
    const pages = getPagination(page, totalPages);

    res.render("form", {
      users,
      currentPage: page,
      totalPages,
      pages,
      sortField: finalSortField,
      order,
    });
  } catch (err) {
    console.error(err);
    // res.status(500).render("error", { message: "Database query failed" });
  }
});

router.post("/search", async (req, res) => {
  console.log(req.body);
    let andor = req.body.andor ? "and":"or";
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

  let first_name = "",
    last_name = "",
    phone_number = "",
    email = "",
    city = "";
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

  let sqlQuery = "select * from users where ";
  let queryPara = [];

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
  sqlQuery += ";";
  console.log(sqlQuery);
  const [dbdata] = await db.execute(sqlQuery, queryPara);
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

module.exports = router;
