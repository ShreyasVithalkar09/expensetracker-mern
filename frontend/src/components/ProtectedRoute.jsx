import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true }); // Redirect to login if not authenticated
    }
  }, [token, navigate]);
  return children;
}

export default ProtectedRoute;
