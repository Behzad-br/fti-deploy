const PteModel = require('../../models/pages/PteModel');

const getPteData = async (req, res) => {
    try {
        const data = PteModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePteData = async (req, res) => {
    try {
        const updatedData = PteModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPteData,
    updatePteData
};
