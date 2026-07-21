const { z } = require('zod');

const submitEnquirySchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
        phone: z.string({
            required_error: 'Phone number is required',
        }).min(5, 'Phone number must be at least 5 characters').max(20, 'Phone number cannot exceed 20 characters'),
        email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
        address: z.string().optional().or(z.literal('')),
        currentQualification: z.string().optional().or(z.literal('')),
        targetCountry: z.string({
            required_error: 'Target country is required'
        }).min(1, 'Target country cannot be empty'),
        message: z.string().max(2000, 'Message cannot exceed 2000 characters').optional().or(z.literal('')),
    })
});

module.exports = {
    submitEnquirySchema
};
