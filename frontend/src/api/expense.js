import api, { authErrorHandler } from "./api";

export const getExpenses = async (token) => {
  try {
    const { data } = await api.get("/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    await authErrorHandler(error)
    console.log("ERROR:: ", error);
  }
};

export const createExpense = async (expense, token) => {
  try {
    const { data } = await api.post("/expenses", expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    await authErrorHandler(error)
    console.log("ERROR:: ", error);
  }
};

export const updateExpense = async (expenseId, expense, token) => {
  try {
    const { data } = await api.patch(`/expenses/${expenseId}`, expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    await authErrorHandler(error)
    console.log("ERROR:: ", error);
  }
};

export const removeExpense = async (expenseId) => {
  try {
    return await api.delete(`/expenses/${expenseId}`);    
  } catch (error) {
    await authErrorHandler(error)
  }
};
