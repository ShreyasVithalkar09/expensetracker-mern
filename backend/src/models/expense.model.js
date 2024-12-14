import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required!"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", expenseSchema);
