const mongoose = require('mongoose');

const pageDestinationsSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Choose Your Dream Destination" },
  heroDescription: { type: String, default: "Explore top study destinations worldwide." }
}, { timestamps: true });

module.exports = mongoose.model('PageDestinations', pageDestinationsSchema);
