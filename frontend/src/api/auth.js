import api from "./api";

export const login = async (userData) => {
  try {
    const { data } = await api.post("/users/login", userData);
    return data;
  } catch (error) {
    console.log("ERROR:: ", error);
  }
};

export const signup = async (userData) => {
  try {
    const { data } = await api.post("/users/signup", userData);
    return data;
  } catch (error) {
    console.log("ERROR:: ", error);
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post("/users/logout");
    return data;
  } catch (error) {
    console.log("ERROR:: ", error);
  }
};
