const SettingsModel = require('../models/core/SettingsModel');

/**
 * @desc    Get whatsapp settings
 * @route   GET /api/settings/whatsapp
 * @access  Public
 */
const getWhatsAppSettings = async (req, res) => {
    try {
        const settings = SettingsModel.getData();
        res.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Update whatsapp settings
 * @route   POST /api/settings/whatsapp
 * @access  Private
 */
const updateWhatsAppSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        
        // SettingsModel uses deep merge for updates
        const updatedData = SettingsModel.updateData(newSettings);
        
        res.json(updatedData);
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getWhatsAppSettings,
    updateWhatsAppSettings
};
