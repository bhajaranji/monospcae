const Preference = require("../models/preferences");
const Lead = require("../models/Lead");

const addPreference = async (req, res) => {
  const { leadId, eventTitle, eventDate, guestCount, location, theme, imgReferences, additionalNotes } = req.body;

  try {
    // Verify lead exists
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    const newPreference = new Preference({
      leadId,
      eventTitle,
      eventDate,
      guestCount,
      location,
      theme,
      imgReferences,
      additionalNotes,
    });

    const savedPreference = await newPreference.save();
    res.status(201).json(savedPreference);
  } catch (error) {
    res.status(500).json({ message: "Error adding preference", error: error.message });
  }
};

const getPreferencesByLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    const preferences = await Preference.find({ leadId });
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching preferences", error: error.message });
  }
};

const updatePreference = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPreference = await Preference.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPreference) return res.status(404).json({ message: "Preference not found" });

    res.status(200).json(updatedPreference);
  } catch (error) {
    res.status(500).json({ message: "Error updating preference", error: error.message });
  }
};

const deletePreference = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPreference = await Preference.findByIdAndDelete(id);
    if (!deletedPreference) return res.status(404).json({ message: "Preference not found" });

    res.status(200).json({ message: "Preference deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting preference", error: error.message });
  }
};

const getPreferenceIdByEventTitleAndLead = async (req, res) => {
  const { leadId, eventTitle } = req.params;

  try {
    const preference = await Preference.findOne({ leadId, eventTitle }).select("_id");
    if (!preference) return res.status(404).json({ message: "Preference not found" });

    res.status(200).json({ id: preference._id });
  } catch (error) {
    res.status(500).json({ message: "Error fetching preference ID", error: error.message });
  }
};


module.exports = {
  addPreference,
  getPreferencesByLead,
  updatePreference,
  deletePreference,
  getPreferenceIdByEventTitleAndLead,
};
