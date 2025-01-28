const express = require("express");
const router = express.Router();
const { getLeads, getLeadById, addLead, deleteLead, updateLead } = require("../controller/leadController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", protect, getLeads); // Fetch all leads
router.get("/:id", protect, getLeadById); // Get specific lead by ID
router.post("/", protect, addLead); // Add a new lead
router.delete("/:id", protect, deleteLead); // Delete a lead by ID
router.put("/:id", protect, updateLead);
module.exports = router;
