const DestinationsModel = require('../../models/pages/DestinationsModel');

const getDestinationsData = async (req, res) => {
    try {
        const data = DestinationsModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateDestinationsData = async (req, res) => {
    try {
        const updatedData = DestinationsModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDestinationsData,
    updateDestinationsData
};
