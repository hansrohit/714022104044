const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true, required: true },
  originalUrl: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", urlSchema);
