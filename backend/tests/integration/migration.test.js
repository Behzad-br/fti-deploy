const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { migrateData } = require('../../utils/migrateJSON');
const User = require('../../models/User');
const Enquiry = require('../../models/Enquiry');

jest.mock('fs');

describe('JSON to MongoDB Migration Rehearsal', () => {
    beforeEach(async () => {
        // Clear DB
        await User.deleteMany({});
        await Enquiry.deleteMany({});
        jest.clearAllMocks();
    });

    it('should migrate users and enquiries from JSON idempotently', async () => {
        const mockUsers = [
            { name: 'Admin', email: 'admin@mig.com', password: '123', role: 'admin' }, // plain password
            { name: 'Emp', email: 'emp@mig.com', password: '$2a$10$12345678901234567890123456789012345678901234567890123', role: 'employee' }, // fake hash (60 chars)
            { name: 'Invalid', password: '123' }, // missing email, should be rejected
            { name: 'Admin', email: 'admin@mig.com', password: '123' } // duplicate email
        ];

        const mockEnquiries = [
            { name: 'John Doe', email: 'john@mig.com', phone: '123', targetCountry: 'UK' },
            { name: 'Invalid', targetCountry: 'UK' }, // missing phone -> rejected
            { name: 'John Doe', email: 'john@mig.com', phone: '123', targetCountry: 'UK' } // duplicate
        ];

        // Setup mock fs.readFileSync
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockImplementation((filepath) => {
            if (filepath.includes('users.json')) return JSON.stringify(mockUsers);
            if (filepath.includes('enquiries.json')) return JSON.stringify(mockEnquiries);
            return '[]';
        });

        // First run
        const stats1 = await migrateData();

        expect(stats1.users.read).toBe(4);
        expect(stats1.users.rejected).toBe(1);
        expect(stats1.users.migrated).toBe(2);
        expect(stats1.users.skipped).toBe(1);

        expect(stats1.enquiries.read).toBe(3);
        expect(stats1.enquiries.rejected).toBe(1);
        expect(stats1.enquiries.migrated).toBe(1);
        expect(stats1.enquiries.skipped).toBe(1);

        // Verify passwords hashed
        const adminUser = await User.findOne({ email: 'admin@mig.com' });
        expect(adminUser.password).not.toBe('123'); // Was plain, got hashed
        const empUser = await User.findOne({ email: 'emp@mig.com' });
        expect(empUser.password).toBe('$2a$10$12345678901234567890123456789012345678901234567890123'); // Was already hashed, stays

        // Second run (Idempotency)
        const stats2 = await migrateData();
        expect(stats2.users.migrated).toBe(0);
        expect(stats2.users.skipped).toBe(3); // 2 existing + 1 duplicate in array
        
        expect(stats2.enquiries.migrated).toBe(0);
        expect(stats2.enquiries.skipped).toBe(2);
    });
});
