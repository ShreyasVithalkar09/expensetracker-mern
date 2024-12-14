import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { createCategory, getCategories } from "../api/category";
import {
  createExpense,
  getExpenses,
  removeExpense,
  updateExpense,
} from "../api/expense";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [income, setIncome] = useState(0)


  const { token } = useAuth();

  const fetchExpenses = async () => {
    if(!token) return
    const { data } = await getExpenses(token);
    setExpenses(data);
  };

  const addExpense = async (expense) => {
    const { data } = await createExpense(expense, token);
    setExpenses((prevExp) => [...prevExp, data]);
  };

  const deleteExpense = async (id) => {
    await removeExpense(id, token);
    setExpenses((prevExp) => prevExp.filter((expense) => expense._id !== id));
  };

  const editExpense = async (id, updatedExpense) => {
    const { data } = await updateExpense(id, updatedExpense, token);
    setExpenses(
      expenses.map((expense) => (expense._id === id ? data : expense))
    );
  };

  useEffect(() => {
    let totalExpenseAmt = 0;
    expenses.forEach((exp) => {
      totalExpenseAmt += exp.amount;
    });

    setTotalExpense(totalExpenseAmt);
  }, [expenses]);

// ################### Category #######################################
const fetchCategories = async () => {
  if(!token) return
  
  const { data } = await getCategories(token);
  setCategories(data);
};

const addCategory = async (categoryName) => {
  const { data } = await createCategory(categoryName, token);
  setCategories((prevCat) => [...prevCat, data])
}

// ################### Income #######################################
//  todo

  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        editExpense,
        deleteExpense,
        expenses,
        setExpenses,
        fetchExpenses,
        totalExpense,
        fetchCategories,
        addCategory,
        categories
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpense = () => {
  return useContext(ExpenseContext);
};

export { useExpense, ExpenseProvider };
