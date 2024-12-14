import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { signup } from "../api/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  // const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await signup(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      fullname: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 form-control gap-4 max-w-md mx-auto"
    >
      <div className="my-4">
        <h1 className="text-2xl font-semibold text-center">Signup</h1>
      </div>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        className="input input-bordered"
        required
      />
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
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
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
        Signup
      </button>

      <div className="my-4 text-center">
        Already registered? <Link to="/login">Login Here!</Link>
      </div>
    </form>
  );
};

export default Signup;
