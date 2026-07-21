const mongoose = require('mongoose');

const pageIELTSSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Master IELTS with FTI" },
  heroDescription: { type: String, default: "Join the biggest IELTS campus in Gujranwala division." },
  successImages: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('PageIELTS', pageIELTSSchema);
