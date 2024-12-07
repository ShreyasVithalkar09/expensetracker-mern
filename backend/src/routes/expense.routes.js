import { Router } from "express";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = Router();

router.use(verifyJwtToken);

router.route("/").get(getExpenses).post(createExpense);
router.route("/:expenseId").patch(updateExpense).delete(deleteExpense);

export default router;
