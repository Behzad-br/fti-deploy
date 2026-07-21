const ContactModel = require('../../models/pages/ContactModel');

const getContactData = async (req, res) => {
    try {
        const data = ContactModel.getData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateContactData = async (req, res) => {
    try {
        const updatedData = ContactModel.updateData(req.body);
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getContactData,
    updateContactData
};
