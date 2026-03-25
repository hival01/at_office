const express = require("express");
const router = express.Router();
const db = require("../config/database");

const user_per_page = 10;

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



module.exports = router;
