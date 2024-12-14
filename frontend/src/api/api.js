import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

export const authErrorHandler = async (error) => {
  if(error.status && (error.status === 401 || error.status === 403)) {
    localStorage.clear()
    if(isBrowser) window.location.href("/login")
  }
}

export default api;
