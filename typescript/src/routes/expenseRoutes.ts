import {Router} from "express";
import {
  createExpenseController,
  homepage,
  getAllExpensesController,
  getExpenseByIdController,
  deleteExpenseController,
  updateExpenseController,
  searchExpenseController
} from "../controllers/expenseController";
const router :Router = Router();

router.post("/" , createExpenseController);
router.get("/", homepage)
router.get("/allexpense" , getAllExpensesController);
router.get("/search" , searchExpenseController);


router.get("/:id" ,getExpenseByIdController)
router.put("/:id", updateExpenseController);
router.delete("/:id" , deleteExpenseController);

export default router;