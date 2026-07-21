const mongoose = require('mongoose');

const pageContactSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Contact Us" },
  heroDescription: { type: String, default: "Get in touch with our team." }
}, { timestamps: true });

module.exports = mongoose.model('PageContact', pageContactSchema);
