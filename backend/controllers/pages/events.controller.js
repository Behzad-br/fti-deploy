const EventsModel = require('../../models/pages/EventsModel');

const getEventsData = async (req, res) => {
    try {
        const data = EventsModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEventsData = async (req, res) => {
    try {
        const updatedData = EventsModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getEventsData,
    updateEventsData
};
