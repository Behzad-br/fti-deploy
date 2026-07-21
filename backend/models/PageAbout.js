const mongoose = require('mongoose');

const pageAboutSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Nurturing Careers Since 2006." },
  heroDescription: { type: String, default: "FTI Consultants is a leading overseas education consultancy." },
  successImages: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('PageAbout', pageAboutSchema);
