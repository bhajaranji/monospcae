import React, { useState, useEffect} from 'react';
import './LeadEdit.css';
import { Route, Routes } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
// import ConvertClient from '../ConvertClient/ConvertClient'
import EditPre from '../EditPre/EditPre';
import { API_BASE_URL } from '../../../../frontend/src/config';

function LeadEdit(){

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { leadId } = location.state || {}; // Access lead details from props

  const handleRowClick = (id) => {
    navigate('/edit-pre', { state : { leadId: id}}); 
  };
  const handleConvertClient = () => {
    navigate('/convert-client'); // Navigate to ConvertClient.jsx
  };


  // Fetch lead details when the component mounts
  useEffect(() => {
    if (!leadId) {
      setError('No lead ID provided!');
      setLoading(false);
      return;
    }

    const fetchLeadDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/leads/${leadId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLead(response.data); // Store fetched lead data

        
        // Fetch preferences for the lead
        const preferencesResponse = await axios.get(
          `${API_BASE_URL}/api/preferences/${leadId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPreferences(preferencesResponse.data); // Store fetched preferences


      } catch (err) {
        console.error('Error fetching lead details:', err);
        setError('Failed to load lead details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [leadId]);
  

  if (loading) {
    return <p>Loading lead details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!lead) {
    return <p>No lead details available!</p>;
  }

  return (
    <div className='main'>
      <div className="left-cont">
        <h1 className="LN">{lead.name || 'Lead Name'}</h1>
        <div className="sp"></div>
        <div className="first">
            <ul>
                <li><span class="rt">Status :</span><span id="uu">&ensp;&ensp;{lead.status}</span></li>
                <li><span class="rt">Lead Generated :</span><span>&ensp;&ensp;{new Date(lead.createdAt).toLocaleDateString()}</span></li>
                <li><span class="rt">Source :</span><span>&ensp;&ensp;{lead.source || 'N/A'}</span></li>
                <li>You can now prepare a folow up pitch</li>
            </ul>
        </div>
        <div className="second">
            <h2 id="ui">SUMMARY</h2>
            <ul>
                <li><span class="rt">Event Date :</span><span>&ensp;&ensp;{new Date(lead.date).toLocaleDateString()}</span></li>
                <li><span class="rt">Category :</span><span>&ensp;&ensp;{lead.category}</span></li>
                <li><span class="rt">Budget :</span><span>&ensp;&ensp;{Array.isArray(lead.budget) && lead.budget.length === 2 ? `${lead.budget[0]}L - ${lead.budget[1]}L` : 'N/A'}</span></li>
                {/* <li><span class="rt">Guests :</span><span>&ensp;&ensp;150</span></li> */}
                <li><span class="rt">Contact No. :</span><span>&ensp;&ensp;{lead.contact ? '+91 ' + lead.contact : 'N/A'}</span></li>
                <li><span class="rt">Email :</span><span>&ensp;&ensp;{lead.email}</span></li>
            </ul>
        </div>
        <h2 id="uk">Events to Plan</h2>
        <div id="lk">
          {preferences.length > 0 ? (
            preferences.map((preference) => (
              <span key={preference._id} style={{ marginRight: "20px" }}>
                {preference.eventTitle}
              </span>
            ))
          ) : (
            <p>No events planned.</p>
          )}
        </div>
        <br />
        <button id="ED">Edit Details</button>
        <button id="CC" onClick={handleConvertClient}>Convert to Client</button>
      </div>
      <div className="middle">
        <h1 id="pre">Preferences</h1>
        {preferences.length > 0 ? (
          preferences.map((preference) => (
            <div key={preference._id}>
              <h2 id="wed">{preference.eventTitle}</h2>
              <ul>
                <li>
                  <span className="rt">Event Date :</span>
                  <span>
                    &ensp;&ensp;{new Date(preference.eventDate).toLocaleDateString()}
                  </span>
                </li>
                <li>
                  <span className="rt">Guest Count :</span>
                  <span>&ensp;&ensp;{preference.guestCount}</span>
                </li>
                <li>
                  <span className="rt">Desired Location :</span>
                  <span className="rw re">&ensp;&ensp;{preference.location}</span>
                </li>
                <li>
                  <span className="rt">Theme :</span>
                  <span className="rw">&ensp;&ensp;{preference.theme}</span>
                </li>
                <li>
                  <span className="rt">Image References :</span>
                  <span>&ensp;&ensp;{preference.imgReferences?.join(", ") || "N/A"}</span>
                </li>
                <li>
                  <span className="rt">Additional Notes & Requirements</span>
                  <span className="rw">
                    &ensp;&ensp;{preference.additionalNotes || "N/A"}
                  </span>
                </li>
              </ul>
              <div className="sp pp"></div>
            </div>
          ))
        ) : (
          <p>No preferences available for this lead.</p>
        )}
      </div>
      <div className="right">
        <button id="b1">Create Mood Board</button>
        <button id="b2">Whatsapp</button>
        <button id="b2">Email</button>
        <button id="b2" onClick={() => handleRowClick(lead._id)}>Edit Preferences</button>
        <button id="b5">Delete Lead</button>
      </div>
    </div>
  )
}

export default LeadEdit
