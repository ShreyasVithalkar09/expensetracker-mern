import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwtToken);

router.route("/").get(getCategories).post(createCategory);

export default router;
