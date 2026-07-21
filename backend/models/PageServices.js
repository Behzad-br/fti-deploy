const mongoose = require('mongoose');

const pageServicesSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Comprehensive Education Solutions." },
  heroDescription: { type: String, default: "From initial counselling to landing in your dream country." }
}, { timestamps: true });

module.exports = mongoose.model('PageServices', pageServicesSchema);
