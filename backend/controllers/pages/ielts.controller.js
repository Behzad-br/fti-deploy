const IeltsModel = require('../../models/pages/IeltsModel');

const getIeltsData = async (req, res) => {
    try {
        const data = IeltsModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateIeltsData = async (req, res) => {
    try {
        const updatedData = IeltsModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getIeltsData,
    updateIeltsData
};
