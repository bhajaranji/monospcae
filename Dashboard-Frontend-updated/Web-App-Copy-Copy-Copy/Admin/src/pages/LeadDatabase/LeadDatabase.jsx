import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeadDatabase.css';
import '../../components/TableComponent/TableComponent.css';
import { useNavigate } from 'react-router-dom';
import LeadEdit from '../LeadEdit/LeadEdit';
import { API_BASE_URL } from '../../../../frontend/src/config';

function LeadDatabase() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    date: '',
    status: 'new',
  });
  const [leads, setLeads] = useState([]); 
  const [checkedRows, setCheckedRows] = useState([]); 
  const [selectAll, setSelectAll] = useState(false); 
  const [popupData, setPopupData] = useState(null);
  const navigate = useNavigate();

  // const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleRowClick = (id) => {
    navigate('/lead-edit', { state : { leadId: id}});
  };

  // Fetch leads data from the backend API on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/leads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming the JWT token is stored in localStorage
          },
        });
        setLeads(response.data); 
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to add the new lead to the backend and update the frontend
  const handleAddLead = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/leads`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      
      const newLead = response.data;

      setLeads((prevLeads) => [...prevLeads, newLead]);

     
      togglePopup();
      setFormData({
        name: '',
        email: '',
        category: '',
        date: '',
        status: 'new',
        contact: '',
        budget: [],
      });
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  
  const toggleCheck = (index) => {
    const updatedChecks = [...checkedRows];
    updatedChecks[index] = !updatedChecks[index];
    setCheckedRows(updatedChecks);
    setSelectAll(updatedChecks.every((check) => check));
  };

  
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedRows(leads.map(() => newSelectAll));
  };

  
  const deleteRow = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeads(leads.filter((lead) => lead._id !== id)); 
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };


  const handleStatusClick = (lead) => {
    setPopupData(lead); 
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/leads/${leadId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const updatedLead = response.data;

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === leadId ? { ...lead, status: updatedLead.status } : lead
        )
      );

      setPopupData(null); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>All Leads</h1>
        <span className="sub-tag">A Directory for all leads</span>
        <div className="Button">
          <button className="add-lead-btn" onClick={togglePopup}>
            Add Lead Manually
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="stats-cards">
        <div className="card">
          <h2>Total Leads</h2>
          <p>{leads.length}</p>
        </div>
        <div className="card">
          <h2>New Leads</h2>
          <p>{leads.filter((lead) => lead.status === 'new').length}</p>
        </div>
        <div className="card">
          <h2>Pending Leads</h2>
          <p>{leads.filter((lead) => lead.status === 'pending').length}</p>
        </div>
      </div>

      {/* Leads Database Section */}
      <div className="leads-database-container">
        <h2 className="section-title">Leads Database</h2>
        <div className="table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th onClick={toggleSelectAll} style={{ cursor: 'pointer' }}>
                  {selectAll ? (
                    <img src="/src/assets/Tick-check.svg" alt="Checked" />
                  ) : (
                    <img src="/src/assets/Checkbox.svg" alt="Unchecked" />
                  )}
                </th>
                <th>Name</th>
                <th>Category</th>
                <th>Event Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead._id}>
                  <td onClick={() => toggleCheck(index)} style={{ cursor: 'pointer' }}>
                    {checkedRows[index] ? (
                      <img src="/src/assets/Tick-check.svg" alt="Checked" />
                    ) : (
                      <img src="/src/assets/Checkbox.svg" alt="Unchecked" />
                    )}
                  </td>
                  <td 
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                    onClick={() => handleRowClick(lead._id)}
                  >
                    {lead.name}
                  </td>
                  <td>{lead.category}</td>
                  <td>{new Date(lead.date).toLocaleDateString()}</td>
                  <td>{lead.contact ? lead.contact : 'N/A'}</td>
                  <td>{lead.email}</td>
                  <td>
                    <img src="/src/assets/whatsapp.svg" alt="WhatsApp Icon" />
                    <img src="/src/assets/Calendar.svg" alt="Calendar" />
                    <img
                      src="/src/assets/delete.svg"
                      alt="Trash Icon"
                      onClick={() => deleteRow(lead._id)}
                    />
                  </td>
                  <td className={`status ${lead.status}`}
                      onClick={() => handleStatusClick(lead._id)}
                      style={{ cursor: 'pointer' }}
                  >
                    {lead.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Status Popup */}
      {popupData && (
        <div className="status-popup">
          <div className="status-popup-content">
            <div className="status-options">
              {['new', 'filled', 'reminder', 'dropped'].map((status) => (
                <button
                  key={status}
                  className={`status-btn ${popupData.status === status ? 'active' : ''}`}
                  onClick={() => handleStatusChange(popupData, status)}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="close-popup-btn" onClick={() => setPopupData(null)}>
              Close
            </button>
          </div>
        </div>
      )}


      {/* Popup Form */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Lead</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Event Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="new">New</option>
                  <option value="filled">Filled</option>
                  <option value="reminder">Reminder</option>
                  <option value="dropped">Dropped</option>
                </select>
              </label>
              <button type="button" className="add-btn" onClick={handleAddLead}>
                Add
              </button>
              <button type="button" className="cancel-btn" onClick={togglePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadDatabase;
