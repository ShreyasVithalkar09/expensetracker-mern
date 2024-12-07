import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
import { Expense } from "../models/expense.model.js";
import mongoose from "mongoose";

const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, date } = req.body;

  if ([amount, category, date].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // check if category is valid
  const isValidCategory = await Category.findById(category);

  if (!isValidCategory) {
    throw new ApiError(404, "Category does not exist!");
  }

  const expense = await Expense.create({
    amount,
    category,
    date,
    owner: req.user?._id,
  });

  if (!expense) {
    throw new ApiError(500, "Something went wrong while creating expense!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense added successfully!"));
});

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({
    owner: req.user?._id,
  });

  if (!expenses) {
    throw new ApiError(404, "No expenses found, Add one!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  const expense = await Expense.findOneAndDelete({
    $and: [
      { _id: new mongoose.Types.ObjectId(expenseId) },
      { owner: req.user?._id },
    ],
  });

  if (!expense) {
    throw new ApiError(404, "Expense does not exist!");
  }

  return res
    .status(204)
    .json(new ApiResponse(204, {}, "Expense deleted successfully!"));
});

const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  const { amount, category, date } = req.body;

  const expense = await Expense.findOneAndUpdate(
    {
      $and: [
        { _id: new mongoose.Types.ObjectId(expenseId) },
        { owner: req.user?._id },
      ],
    },
    {
      $set: {
        amount,
        category,
        date,
      },
    },
    {
      new: true,
    }
  );

  if (!expense) {
    throw new ApiError(404, "Expense does not exist!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully!"));
});

export { createExpense, getExpenses, updateExpense, deleteExpense };
