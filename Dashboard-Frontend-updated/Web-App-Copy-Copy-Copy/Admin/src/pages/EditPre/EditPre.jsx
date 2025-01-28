import React, { useState } from "react";
import "./EditPre.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';


function EditPre() {
  
  const location = useLocation();
  const { leadId } = location.state || {};
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [eventForms, setEventForms] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null); 
  const [activeClass, setActiveClass] = useState("cv"); 
  const [buttonVisibility, setButtonVisibility] = useState({
    wedding: true,
    sangeet: true,
    haldi: true,
    reception: true,
  });
 

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setMaxValue(value);
  };

  const handleAddForm = (eventName) => {
    const existingForm = eventForms.find((form) => form.name === eventName);
    if (!existingForm) {
      setEventForms((prevForms) => [
        ...prevForms,
        { id: Date.now(), name: eventName, budget: "", attendees: "" },
      ]);
    }
    setActiveEvent(eventName); 
    setActiveClass("cvv"); 
    setButtonVisibility((prev) => ({
      ...prev,
      [eventName.toLowerCase()]: false, 
    }));
  };

  const handleFormChange = (id, field, value) => {
    setEventForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      )
    );
  };

  
  const handleSave = async () => {

    
    try {
      // Update the lead's budget using the backend API
      const response = await fetch(`http://localhost:5000/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          budget: [minValue, maxValue], // Update the budget as an array
        }),
      });
  
      if (response.ok) {
        alert("Budget updated successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error updating budget:", errorData);
        alert("Failed to update budget.");
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("An error occurred while saving the budget.");
    }

    if (eventForms.length === 0) {
      alert("No events to save.");
      return;
    }
  
    for (const form of eventForms) {
      try {
        // Check if the preference already exists
        const response = await fetch(
          `http://localhost:5000/api/preferences/${leadId}/${form.name}/id`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        const data = await response.json();
  
        if (response.ok && data.id) {
          // Preference exists, update it
          await fetch(`http://localhost:5000/api/preferences/${data.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              leadId,
              eventTitle: form.name,
              eventDate: form.Date,
              guestCount: form.attendees,
              location: form.venue || "",
              theme: form.theme || "",
              additionalNotes: form.additionalNotes || "",
            }),
          });
        } else if (response.status === 404) {
          // Preference not found, create a new one
          await fetch("http://localhost:5000/api/preferences", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              leadId,
              eventTitle: form.name,
              eventDate: form.Date,
              guestCount: form.attendees,
              location: form.venue || "",
              theme: form.theme || "",
              additionalNotes: form.additionalNotes || "",
            }),
          });
        }
      } catch (error) {
        console.error("Error saving preference:", error);
      }
    }
  
    alert("Preferences saved successfully!");
  };
  

  return (
    <div className="main2">
      <div className={activeClass}>
        <div className="headd">Event Details</div>
        <h1 className="mk">Add the events to organize</h1>
        <input type="text" className="inp" placeholder="Add Custom Event" />
        <br />
        <div className="event-buttons">
          {buttonVisibility.wedding && (
            <button onClick={() => handleAddForm("Wedding")} className="btnn">
              Wedding
            </button>
          )}
          {buttonVisibility.sangeet && (
            <button onClick={() => handleAddForm("Sangeet")} className="btnn2">
              Sangeet
            </button>
          )}
          {buttonVisibility.haldi && (
            <button onClick={() => handleAddForm("Haldi")} className="btnn3">
              Haldi
            </button>
          )}
          {buttonVisibility.reception && (
            <button onClick={() => handleAddForm("Reception")} className="btnn4">
              Reception
            </button>
          )}
        </div>
        <h1 className="mk">Overall Budget :</h1>
        <input
          type="number"
          className="inpu"
          placeholder="min"
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="number"
          className="inpu2"
          placeholder="max"
          value={maxValue}
          onChange={handleMaxChange}
        />
        {/* <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={maxValue}
            onChange={handleMaxChange}
            className="slider thumb thumb-max"
          />
        </div> */}
        {/* Event Tabs */}
        <div className="event-tabs">
          {eventForms.map((form) => (
            <button
              key={form.id}
              id="io"
              className={`tab-button ${
                activeEvent === form.name ? "active-tab" : ""
              }`}
              onClick={() => setActiveEvent(form.name)}
            >
              
              {form.name}
            </button>
          ))}
        </div>
        <div className="forms-container">
          {eventForms.map(
            (form) =>
              activeEvent === form.name && (
                <div key={form.id} className="event-form">
                  <h2>{form.name}</h2>
                  <div className="yu">
                    <label>
                      <input
                        type="date"
                        id="kj"
                        value={form.Date}
                        onChange={(e) =>
                          handleFormChange(form.id, "Date", e.target.value)
                        }
                        placeholder="Event Date"
                      />
                    </label>
                    <br />
                    <label>
                      <input
                        type="number"
                        id="kjj"
                        value={form.attendees}
                        onChange={(e) =>
                          handleFormChange(form.id, "attendees", e.target.value)
                        }
                        placeholder="Guest Count"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    id="inu"
                    value={form.venue || ""}
                    onChange={(e) =>
                      handleFormChange(form.id, "venue", e.target.value)
                    }
                    placeholder="Desired Venue"
                  />
                  <select 
                  name="theme" 
                  id="them" 
                  className="dropdown" 
                  onChange={(e) => handleFormChange(form.id, "theme", e.target.value)}
                  value={form.theme || ""}>
                    <option value="" disabled selected>
                      Select Theme
                    </option>
                    <option value="royal wedding">Royal Wedding</option>
                    <option value="bollywood">Bollywood Theme</option>
                    <option value="rustic">Rustic</option>
                    <option value="classic">Classic</option>
                  </select>
                  <input
                    type="text"
                    id="inu"
                    value={form.additionalNotes || ""}
                    onChange={(e) =>
                      handleFormChange(form.id, "additionalNotes", e.target.value)
                    }
                    placeholder="Add Additional Requests or Information"
                  />
                  <br />
                  <button onClick={handleSave} type="submit" id="subb">
                    Save & Next
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPre;
