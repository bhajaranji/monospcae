const Lead = require("../models/Lead");

// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.user }); 
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};


// Get a specific lead by ID
const getLeadById = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findOne({ _id: leadId, user: req.user });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found or not authorized" });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lead", error });
  }
};


// Add a new lead
const addLead = async (req, res) => {
  try {
    const { name, email, category, date, status, contact, budget } = req.body;
    const newLead = new Lead({ user: req.user, name, email, category, date, status, contact, budget });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: "Error adding lead", error });
  }
};

// Delete a lead by ID
const deleteLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    const lead = await Lead.findOne({ _id: leadId, user: req.user });
    if (!lead) return res.status(404).json({ message: "Lead not found or not authorized" });
    
    await Lead.findByIdAndDelete(leadId);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
};


// Update a lead by ID
const updateLead = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Return updated document and validate input
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found or not authorized" });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: "Error updating lead", error: error.message });
  }
};

module.exports = { getLeads, getLeadById, addLead, deleteLead, updateLead };
