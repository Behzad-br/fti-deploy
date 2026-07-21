const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            maxlength: [20, 'Phone number cannot exceed 20 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                'Please enter a valid email address',
            ],
            default: '',
        },
        address: {
            type: String,
            trim: true,
            default: '',
        },
        currentQualification: {
            type: String,
            trim: true,
            default: '',
        },
        targetCountry: {
            type: String,
            required: [true, 'Target country is required'],
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
