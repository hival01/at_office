import express from "express";
import {createExpenseController, homepage , getAllExpensesController , getExpenseByIdController, deleteExpenseController} from "../controllers/expenseController";
const router = express.Router();

router.post("/" , createExpenseController);
router.get("/", homepage)
router.get("/allexpense" , getAllExpensesController);
router.get("/:id" ,getExpenseByIdController)
router.delete("/:id" , deleteExpenseController);


// module.exports = route;  
export default router;