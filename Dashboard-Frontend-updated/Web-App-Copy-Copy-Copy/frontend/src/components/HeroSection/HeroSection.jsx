import React from 'react'
import { useNavigate } from "react-router-dom";
import './HeroSection.css'
import { assests } from '../../assets/assets'

function HeroSection() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to Login page
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to Signup page
  };

  

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="left-section">
          <div className="text-section">
        <h1>Dreams Rendered in Reality</h1>
        <p>Redefining wedding experience through cutting-edge technology</p>
        </div>
        <div className="hero-buttons">
          
          <button onClick={handleSignupClick} className="btn-primary">Sign Up</button>
          
          <button onClick={handleLoginClick} className="btn-secondary">Log In</button>
        </div>
        </div>
        <div className="right-section">
      <div className="hero-image">
        <img src={assests.headimg} alt="Hero Section"
        />
      </div>
      </div>
      </div>

      <div className="hero-footer">
        <h2>
          Monospace - <span>Planning and Execution In One Space!</span>
        </h2>
      </div>
    </section>
  )
}

export default HeroSection
