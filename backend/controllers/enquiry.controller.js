const Enquiry = require('../models/Enquiry');

/**
 * @desc    Submit a new enquiry
 * @route   POST /api/enquiries
 * @access  Public
 */
const submitEnquiry = async (req, res, next) => {
    try {
        const { name, phone, email, address, currentQualification, targetCountry, message } = req.body;

        if (!name || !phone || !targetCountry) {
            return res.status(400).json({ message: 'Please provide all required fields (name, phone, targetCountry)' });
        }

        const newEnquiry = await Enquiry.create({
            name,
            phone,
            email: email || '',
            address: address || '',
            currentQualification: currentQualification || '',
            targetCountry,
            message: message || ''
        });

        res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: newEnquiry });
    } catch (error) {
        console.error('Error submitting enquiry:', error);
        next(error);
    }
};

/**
 * @desc    Get all enquiries
 * @route   GET /api/enquiries
 * @access  Private (Admin/Employee)
 */
const getEnquiries = async (req, res, next) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        next(error);
    }
};

/**
 * @desc    Delete an enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Private (Admin)
 */
const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        
        res.json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        next(error);
    }
};

module.exports = {
    submitEnquiry,
    getEnquiries,
    deleteEnquiry
};
