const HomeModel = require('../../models/pages/HomeModel');

const getHomeData = async (req, res) => {
    try {
        const data = HomeModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateHomeData = async (req, res) => {
    try {
        const updatedData = HomeModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getHomeData,
    updateHomeData
};
