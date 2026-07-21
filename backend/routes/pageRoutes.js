const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Controllers
const { getHomeData, updateHomeData } = require('../controllers/pages/home.controller');
const { getAboutData, updateAboutData } = require('../controllers/pages/about.controller');
const { getIeltsData, updateIeltsData } = require('../controllers/pages/ielts.controller');
const { getPteData, updatePteData } = require('../controllers/pages/pte.controller');
const { getDestinationsData, updateDestinationsData } = require('../controllers/pages/destinations.controller');
const { getServicesData, updateServicesData } = require('../controllers/pages/services.controller');
const { getEventsData, updateEventsData } = require('../controllers/pages/events.controller');
const { getContactData, updateContactData } = require('../controllers/pages/contact.controller');

// Routes
router.get('/home', getHomeData);
router.post('/home', protect, updateHomeData);

router.get('/about', getAboutData);
router.post('/about', protect, updateAboutData);

router.get('/ielts', getIeltsData);
router.post('/ielts', protect, updateIeltsData);

router.get('/pte', getPteData);
router.post('/pte', protect, updatePteData);

router.get('/destinations', getDestinationsData);
router.post('/destinations', protect, updateDestinationsData);

router.get('/services', getServicesData);
router.post('/services', protect, updateServicesData);

router.get('/events', getEventsData);
router.post('/events', protect, updateEventsData);

router.get('/contact', getContactData);
router.post('/contact', protect, updateContactData);

module.exports = router;
