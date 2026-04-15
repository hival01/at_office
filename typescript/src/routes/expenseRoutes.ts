import express from "express";
import {createExpenseController, homepage ,
     getAllExpensesController , getExpenseByIdController,
      deleteExpenseController, updateExpenseController,
    searchExpenseController
    } from "../controllers/expenseController";
const router = express.Router();

router.post("/" , createExpenseController);
router.get("/", homepage)
router.get("/allexpense" , getAllExpensesController);
router.get("/search" , searchExpenseController);


router.get("/:id" ,getExpenseByIdController)
router.put("/:id", updateExpenseController);
router.delete("/:id" , deleteExpenseController);


// module.exports = route;  
export default router;