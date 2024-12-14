import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    throw new ApiError(400, "Category is required!");
  }

  // check if category already exists
  const existingCategory = await Category.findOne({
    $and: [{ _id: req.user?._id }, { categoryName }]
  });

  if (existingCategory) {
    throw new ApiError(400, "Category already exists!");
  }

  const category = await Category.create({
    categoryName,
    owner: req.user?._id,
  });

  if (!category) {
    throw new ApiError(500, "Something went wrong while creating category!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category added successfully!"));
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    $or: [{ owner: req.user?._id }, { isDefault: true }],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully!"));
});

export { createCategory, getCategories };
