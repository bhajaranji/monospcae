const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addPreference,
  getPreferencesByLead,
  updatePreference,
  deletePreference,
  getPreferenceIdByEventTitleAndLead,
} = require("../controller/preferenceController");

const router = express.Router();

router.post("/", protect, addPreference); // Add new preference
router.get("/:leadId", protect, getPreferencesByLead); // Get preferences by lead ID
router.put("/:id", protect, updatePreference); // Update preference by ID
router.delete("/:id", protect, deletePreference); // Delete preference by ID
router.get("/:leadId/:eventTitle/id", protect, getPreferenceIdByEventTitleAndLead); // Get preference ID by leadId and eventTitle

module.exports = router;
