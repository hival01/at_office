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

app.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * user_per_page;

  const sortField = req.query.sort || "user_id";
  const order = req.query.order === "desc" ? "desc" : "asc";
 
  const allowedSortField = ["user_id" , "first_name" , "last_name" , "city" , "gender"];
  let finalSortField = allowedSortField.includes(sortField) ? sortField : "user_id";

  const countQuery = "select count(*) as total from users";

  db.query(countQuery, (err, countResult) => {
    if (err) throw err;

    const totalRows = countResult[0].total;
    const totalPages = Math.ceil(totalRows / user_per_page);

    const dataQuery = `
    select * 
    from users
    order by ${finalSortField} ${order}
    limit ? offset ? 
    `;

    db.query(dataQuery, [user_per_page, offset], (err, users) => {
      if (err) throw err;

      const pages = getPagination(page, totalPages);

      res.render("index", {
        users,
        currentPage: page,
        totalPages,
        pages,
        sortField : finalSortField,
        order : order
      });
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});





