import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
      console.log(response.data); // Optional: Debug response
      localStorage.setItem("token", response.data.token); // Save token for authentication
      alert("Login successful!");
      navigate("/leads"); // Redirect to the admin page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">
          New to this site? <a href="/signup" className="login-link">Sign up</a>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              name="email"
              className="login-input"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small className="login-helper-text">8 Characters / Numbers</small>
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        
      </div>
    </div>
  );
};

export default Login;
