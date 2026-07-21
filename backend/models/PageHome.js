const mongoose = require('mongoose');

const pageHomeSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Your Journey to Global Success" },
  heroDescription: { type: String, default: "Expert consultancy for studying abroad." },
  heroImage: { type: String, default: "/skyline_generated.png" },
  successImages: { type: [String], default: [] },
  universityPartners: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('PageHome', pageHomeSchema);
