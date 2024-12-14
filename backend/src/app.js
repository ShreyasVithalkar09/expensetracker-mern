import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// basic middlewares
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

// cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// route imports
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

// route declarations
app.use(`/api/v1/users`, userRoutes);
app.use(`/api/v1/categories`, categoryRoutes);
app.use(`/api/v1/expenses`, expenseRoutes);

export { app };
