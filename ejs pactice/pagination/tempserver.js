const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

let limit = 100;

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

app.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const sortField = req.query.sort || "user_id";

  const allowedSortField = [
    "user_id",
    "first_name",
    "last_name",
    "city",
    "gender",
  ];
  const finalSortingField = allowedSortField.includes(sortField)
    ? sortField
    : "user_id";

  const order = req.query.order === "desc" ? "desc" : "asc";

  const countQuery = "select count(*) as total_user from users";

  db.query(countQuery, (err, countResult) => {
    if (err) throw err;
    console.log(countResult);

    const totalRows = countResult[0].total_user;
    const totalPages = Math.ceil(totalRows / limit);

    const dataQuery = `
       select * 
       from users
       order by ${finalSortingField} ${order}
       limit ${limit} offset ${offset};
       `;

    db.query(dataQuery, (err, users) => {
      if (err) throw err;

      const pages = getPagination(page, totalPages);
      res.render("index", {
        users,
        pages,
        currentPage: page,
        totalPages,
        sortField: finalSortingField,
        order: order,
      });
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on prot ${process.env.PORT}`);
});
