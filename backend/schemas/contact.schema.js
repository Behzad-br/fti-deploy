const { z } = require('zod');

const contactSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).min(2, 'Name must be at least 2 characters long').max(100, 'Name cannot exceed 100 characters'),
        phone: z.string({
            required_error: 'Phone number is required',
        }).min(5, 'Phone number must be at least 5 characters long').max(20, 'Phone number cannot exceed 20 characters'),
        email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
        country: z.enum(['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', '']).optional(),
        message: z.string().max(2000, 'Message cannot exceed 2000 characters').optional().or(z.literal('')),
    })
});

const markReadSchema = z.object({
    body: z.object({
        isRead: z.boolean({
            required_error: 'isRead boolean is required',
            invalid_type_error: 'isRead must be a boolean',
        }).optional()
    })
});

module.exports = {
    contactSchema,
    markReadSchema
};
