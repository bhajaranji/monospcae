const mongoose = require("mongoose");

const preferenceSchema = mongoose.Schema(
  {
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
    eventTitle: { type: String, required: true },
    eventDate: { type: Date, required: true },
    guestCount: { type: Number, required: true },
    location: { type: String, required: true },
    theme: { type: String },
    imgReferences: [{ type: String }], 
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preference", preferenceSchema);