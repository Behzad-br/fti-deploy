const ServicesModel = require('../../models/pages/ServicesModel');

const getServicesData = async (req, res) => {
    try {
        const data = ServicesModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateServicesData = async (req, res) => {
    try {
        const updatedData = ServicesModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getServicesData,
    updateServicesData
};
