import React, { useState }  from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const SignUp = () => {
  // const handleAdmin = () => {
  //   navigate("/leads"); 
  // };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
      const response = await axios.post(`${API_BASE_URL}/api/users/signup`, formData);
      console.log(response.data); // Optional: Debug response
      alert("Sign-up successful!"); // Optional success message
      navigate("/leads"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <label className="signup-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="signup-input"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-group">
            <label className="signup-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="signup-input"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-group">
            <label className="signup-label">Email</label>
            <input
              type="email"
              name="email"
              className="signup-input"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-group">
            <label className="signup-label">Password</label>
            <input
              type="password"
              name="password"
              className="signup-input"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small className="signup-helper-text">8 Characters / Numbers</small>
          </div>
          <button  type="submit" className="signup-btn">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-footer">
          Already a member? <a href="/login" className="signup-link">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
