import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Leads.css'
import Barchart from '../../components/Barchart/Barchart';
import { LineChart } from 'recharts';
import Budgetchart from '../../components/Budgetchart/Budgetchart';
import SourceChart from '../../components/SourceChart/SourceChart';
import LeadDatabase from "../LeadDatabase/LeadDatabase.jsx";

function Leads() {
  const navigate = useNavigate(); 

  const handleViewDatabase = () => {
    navigate('/lead-database');
  };

  return (
    
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Leads Dashboard</h1>
        <div className="Button">
        <button className="view-database-btn" onClick={handleViewDatabase}>
          View Database
        </button>
        <button className="moodboard">Moodboard</button>

        </div>
      </header>

      {/* Stats Section */}
      <div className="stats-cards">
        <div className="card">
          <h2>Total Leads</h2>
          <p>100</p>
        </div>
        <div className="card">
          <h2>Leads Converted</h2>
          <p>50</p>
        </div>
        <div className="card">
          <h2>Leads Converted</h2>
          <p>40%</p>
        </div>
        <div className="card">
          <h2>New Leads</h2>
          <p>50</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Total Leads</h3>
          <div className="bar-chart-placeholder">
            <Barchart/>
          </div>
        </div>
        <div className="chart-container">
          <h3>Leads By Budget</h3>
          <div className="bar-chart-placeholder">
            <Budgetchart/>
          </div>
        </div>
      </div>

      {/* Leads Source and New Leads Section */}
      <div className="source-and-new-leads">
        <div className="leads-source">
          <h3>Leads Source</h3>
          <div className="pie-chart-placeholder">
            <SourceChart/>
          </div>
        </div>

        <div className="new-leads">
          <h3>New Leads</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Event Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frame Lname</td>
                <td>Wedding/Sangeet</td>
                <td>12-Jul-2024</td>
              </tr>
              <tr>
                <td>Frame Lname</td>
                <td>Wedding</td>
                <td>12-Jul-2024</td>
              </tr>
              <tr>
                <td>Frame Lname</td>
                <td>Sangeet/Haldi</td>
                <td>12-Jul-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default Leads
