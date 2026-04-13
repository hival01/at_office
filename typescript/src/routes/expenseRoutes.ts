import express from "express";
import {createExpenseController, homepage , getAllExpensesController , getExpenseByIdController, deleteExpenseController, updateExpenseController} from "../controllers/expenseController";
const router = express.Router();

router.post("/" , createExpenseController);
router.get("/", homepage)
router.get("/allexpense" , getAllExpensesController);
router.get("/:id" ,getExpenseByIdController)
router.delete("/:id" , deleteExpenseController);
router.put("/:id", updateExpenseController);



// module.exports = route;  
export default router;