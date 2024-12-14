import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// import { addExpense, updateExpense } from "../api/expense";
import { useExpense } from "../context/ExpenseContext";

const ExpenseForm = ({ onClose, onSave, expense }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    description: "",
    category: "",
    date: "",
  });

  const { fetchCategories, categories } = useExpense();
  const { token } = useAuth();
  const { addExpense, editExpense } = useExpense();

  // Populate form data when editing an expense
  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount || "",
        description: expense.description || "",
        category: expense.category?._id || "",
        date: expense.date?.split("T")[0] || "",
      });
    }
  }, [expense]);

  useEffect(() => {
    // fetch the categories
    fetchCategories();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (expense) {
      // Edit mode
      editExpense(expense._id, formData);
    } else {
      // Add mode
      addExpense(formData);
    }

    onSave(); // Callback to refresh the list or close the modal
    onClose();
  };

  return (
    <div className="p-6 bg-base-200 rounded-lg">
      <h2 className="text-lg font-bold mb-4">
        {expense ? "Edit Expense" : "Add Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="form-control gap-4">
        {/* Amount */}
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="input input-bordered"
          required
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input input-bordered"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories &&
            categories.map((category, index) => (
              <option
                className="capitalize"
                key={category._id}
                value={category._id}
              >
                {category.categoryName}
              </option>
            ))}
        </select>

        {/* Date Picker */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered"
          required
        />

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {expense ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
