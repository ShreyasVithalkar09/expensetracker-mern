import React, { createContext, useContext, useEffect, useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Login function
  const loginUser = async (userData) => {
    const { data } = await login(userData);
    setToken(data.accessToken);
    setUser(data.loggedInUser);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.loggedInUser));

    if (data.accessToken) {
      navigate("/");
    }
  };

  // Logout function
    const logoutUser = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user")
    };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    const _token = localStorage.getItem("token");

    if (_token && _user) {
      setUser(_user);
      setToken(_token);
    } else {
      localStorage.clear();
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return <p className="my-4 text-center ">Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
