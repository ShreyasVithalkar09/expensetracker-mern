import { Router } from "express";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  getExpenses,
} from "../controllers/expense.controller.js";

const router = Router();

router.use(verifyJwtToken);

router.route("/").get(getExpenses).post(createExpense);

export default router;
