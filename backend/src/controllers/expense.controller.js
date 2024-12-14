import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
import { Expense } from "../models/expense.model.js";
import mongoose from "mongoose";

const commonAggregation = () => {
  return [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $addFields: {
        category: {
          $arrayElemAt: ["$category", 0],
        },
      },
    },
    {
      $project: {
        _id: 1,
        amount: 1,
        description: 1,
        "category.categoryName": 1,
        "category._id": 1,
        date: 1,
      },
    },
  ];
};

const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  if ([amount, category, date, description].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // check if category is valid
  const isValidCategory = await Category.findById(category);

  if (!isValidCategory) {
    throw new ApiError(404, "Category does not exist!");
  }

  const expense = await Expense.create({
    amount: Number(amount),
    category,
    description,
    date,
    owner: req.user?._id,
  });

  if (!expense) {
    throw new ApiError(500, "Something went wrong while creating expense!");
  }

  const expenseData = await Expense.aggregate([
    {
      $match: {
        owner: req.user?._id,
        _id: expense._id,
      },
    },
    ...commonAggregation(),
  ]);

  return res
    .status(201)
    .json(new ApiResponse(201, expenseData[0], "Expense added successfully!"));
});

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.aggregate([
    {
      $match: {
        owner: req.user?._id,
      },
    },
    ...commonAggregation(),
  ]);

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

  const { amount, category, date, description } = req.body;

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
        description,
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
