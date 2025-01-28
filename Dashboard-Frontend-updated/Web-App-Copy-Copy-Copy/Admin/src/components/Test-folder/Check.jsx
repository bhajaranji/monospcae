import React, { useState } from 'react';
import './Check.css';

const Sidebar = () => {
  const [active, setActive] = useState("Leads");

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">m</span>
        <div className="separator"></div>
      </div>

      <div className="sidebar-navigation">
        <div
          className={`nav-item ${active === "Leads" ? "active" : ""}`}
          onClick={() => setActive("Leads")}
        >
          <div className="nav-icon leads-icon"></div>
          <span className="nav-label">Leads</span>
        </div>
        <div
          className={`nav-item ${active === "Clients" ? "active" : ""}`}
          onClick={() => setActive("Clients")}
        >
          <div className="nav-icon clients-icon"></div>
          <span className="nav-label">Clients</span>
        </div>
        <div
          className={`nav-item ${active === "Vendors" ? "active" : ""}`}
          onClick={() => setActive("Vendors")}
        >
          <div className="nav-icon vendors-icon"></div>
          <span className="nav-label">Vendors</span>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <div className="sidebar-footer">
        <div className="search-icon"></div>
        <div className="profile-icon">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
