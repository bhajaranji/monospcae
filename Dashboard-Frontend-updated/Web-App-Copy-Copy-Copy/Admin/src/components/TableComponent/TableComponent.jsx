import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TableComponent.css';

function TableComponent() {
  const [leads, setLeads] = useState([]); 
  const [checkedRows, setCheckedRows] = useState([]); 
  const [selectAll, setSelectAll] = useState(false); 

  // Fetch leads data from the backend API on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leads', {
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

  // Function to toggle checkbox state for a specific row
  const toggleCheck = (index) => {
    const updatedChecks = [...checkedRows];
    updatedChecks[index] = !updatedChecks[index];
    setCheckedRows(updatedChecks);
    setSelectAll(updatedChecks.every((check) => check));
  };

  // Function to toggle all checkboxes when the header checkbox is clicked
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedRows(leads.map(() => newSelectAll));
  };

  // Function to delete a lead based on its ID
  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeads(leads.filter((lead) => lead._id !== id)); // Remove deleted lead from the state
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
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
            <td>{lead.name}</td>
            <td>{lead.category}</td>
            <td>{new Date(lead.date).toLocaleDateString()}</td>
            <td>{lead.phone ? lead.phone : 'N/A'}</td>
            <td>{lead.email}</td>
            <td>
              <img src="/src/assets/whatsapp.svg" alt="WhatsApp Icon" />
              <img src="/src/assets/Calendar.svg" alt="Calendar" />
              <img
                src="/src/assets/delete.svg"
                alt="Trash Icon"
                onClick={() => deleteRow(lead._id)} // Trigger row deletion
              />
            </td>
            <td className={`status ${lead.status}`}>{lead.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
