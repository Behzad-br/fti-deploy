const mongoose = require('mongoose');

const pagePTESchema = new mongoose.Schema({
  heroTitle: { type: String, default: "PTE Academic Preparation" },
  heroDescription: { type: String, default: "Master the computer-based PTE test." },
  successImages: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('PagePTE', pagePTESchema);
