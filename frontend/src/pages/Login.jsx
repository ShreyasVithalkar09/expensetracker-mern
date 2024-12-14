import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "", // Username or email
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData);

    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 form-control gap-4 max-w-md mx-auto"
    >
      <div className="my-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
      </div>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="input input-bordered"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="input input-bordered"
        required
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>

      <div className="my-4 text-center">
        Not yet registered? <Link to="/signup">Signup Here!</Link>
      </div>
    </form>
  );
};

export default Login;
