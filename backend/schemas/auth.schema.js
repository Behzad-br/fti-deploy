const { z } = require('zod');

const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        }).email('A valid email is required').max(255),
        password: z.string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }).min(1, 'Password cannot be empty').max(1024),
    })
});

const updatePasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string({
            required_error: 'Current password is required',
        }).min(1, 'Current password cannot be empty').max(1024),
        newPassword: z.string({
            required_error: 'New password is required',
        }).min(6, 'New password must be at least 6 characters long').max(1024),
    })
});

const createEmployeeSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).min(2, 'Name must be at least 2 characters long').max(100, 'Name cannot exceed 100 characters'),
        email: z.string({
            required_error: 'Email is required',
        }).email('A valid email is required').max(255),
        password: z.string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters long').max(1024),
    })
});

module.exports = {
    loginSchema,
    updatePasswordSchema,
    createEmployeeSchema
};
