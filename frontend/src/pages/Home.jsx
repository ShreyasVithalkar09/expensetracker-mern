import React, { useState } from "react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import { useExpense } from "../context/ExpenseContext";
import ExpenseChart from "../components/ExpenseChart";

const Home = () => {
  const [showChart, setShowChart] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const { totalExpense } = useExpense();

  const openAddExpense = () => {
    setSelectedExpense(null); // Clear the form for adding a new expense
    setIsModalOpen(true);
  };

  const openEditExpense = (expense) => {
    setSelectedExpense(expense); // Load the expense data into the form
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    // Refresh the expense list or perform any other actions after saving
    alert("Expense saved!")
  };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section: Cards and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Left Side: Income and Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-green-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-green-600">Income Total</h2>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </div>
          <div className="card bg-red-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-red-600">Expense Total</h2>
              <p className="text-2xl font-bold text-gray-800">
                Rs. {totalExpense}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Expense Chart */}
        <div
          className={`card bg-base-100 shadow-md ${
            !showChart && "hidden lg:block"
          }`}
        >
          <div className="card-body">
            <h2 className="card-title">Expense Chart</h2>
            <div className="h-1/3  flex justify-center items-center">
               <ExpenseChart />
            </div>
          </div>
        </div>
      </div>

      {/* Button to Show/Hide Chart for Small Screens */}
      <div className="text-center lg:hidden mb-4">
        <button
          onClick={() => setShowChart(!showChart)}
          className="btn btn-outline"
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>

      {/* CTA to Add Expense */}
      <div className="text-center mb-8">
        <button onClick={openAddExpense} className="btn btn-primary">
          Add Expense
        </button>
      </div>

      {/* Expense Table */}
      <ExpenseTable openEditExpense={openEditExpense} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          {/* <div className="bg-white p-4 rounded-lg"> */}
          <ExpenseForm
            onClose={closeModal}
            onSave={handleSave}
            expense={selectedExpense}
          />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default Home;
