const mongoose = require("mongoose");

const leadSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["new", "filled", "reminder", "dropped", "converted", "pitched"], default: "new" },
    contact: { 
      type: String, 
      validate: {
        validator: (value) => /^\d{10}$/.test(value), // 10-digit number
        message: "Contact must be a 10-digit number"
      } 
    },
    budget: {
      type: [Number],
      validate: {
        validator: (value) => value.length === 2,
        message: "Budget must contain exactly two numbers"
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
