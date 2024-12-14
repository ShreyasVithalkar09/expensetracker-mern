import React, { useEffect } from "react";
import { useExpense } from "../context/ExpenseContext";

function ExpenseTable({ openEditExpense }) {
  const { expenses, fetchExpenses, deleteExpense } = useExpense();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = (expenseId) => {
    if (window.confirm("Are you sure to delete this?"))
      deleteExpense(expenseId);

    return;
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center text-xl">Start adding your expenses</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Rs. {expense.amount}</td>
                <td className="capitalize">{expense.category?.categoryName}</td>
                <td>{expense.description}</td>
                <td>{expense.date?.split("T")[0]}</td>
                <td>
                  <div className="flex space-x-2">

                  <button
                    onClick={() => openEditExpense(expense)}
                    className="btn btn-sm btn-info mr-2"
                    >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="btn btn-sm btn-error"
                    >
                    Delete
                  </button>
                    </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
