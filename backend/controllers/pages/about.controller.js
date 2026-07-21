const AboutModel = require('../../models/pages/AboutModel');

const getAboutData = async (req, res) => {
    try {
        const data = AboutModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAboutData = async (req, res) => {
    try {
        const updatedData = AboutModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAboutData,
    updateAboutData
};
