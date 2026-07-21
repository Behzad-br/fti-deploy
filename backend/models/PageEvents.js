const mongoose = require('mongoose');

const pageEventsSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Empowering Your Future Through Global Events" },
  heroDescription: { type: String, default: "Stay updated with our latest seminars." },
  eventsList: { type: Array, default: [] },
  eventGalleryList: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('PageEvents', pageEventsSchema);
