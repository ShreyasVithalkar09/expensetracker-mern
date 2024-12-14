import api, { authErrorHandler } from "./api";

export const getCategories = async (token) => {
  try {
    const { data } = await api.get("/categories", {
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

export const createCategory = async (categoryName, token) => {
  try {
    const { data } = await api.post("/categories", {
      categoryName
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("ERROR:: ", error);
  }
};
