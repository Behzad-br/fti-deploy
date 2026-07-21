const request = require('supertest');
const app = require('../../server');
const Enquiry = require('../../models/Enquiry');
const User = require('../../models/User');

describe('Enquiry API', () => {
    let adminToken;
    let employeeToken;

    beforeEach(async () => {
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin'
        });

        const employee = await User.create({
            name: 'Employee',
            email: 'employee@test.com',
            password: 'password123',
            role: 'employee'
        });

        const adminRes = await request(app).post('/api/auth/login').send({
            email: 'admin@test.com',
            password: 'password123'
        });
        adminToken = adminRes.body.token;
        
        const employeeRes = await request(app).post('/api/auth/login').send({
            email: 'employee@test.com',
            password: 'password123'
        });
        employeeToken = employeeRes.body.token;
    });

    describe('POST /api/enquiries', () => {
        it('should submit a valid enquiry', async () => {
            const res = await request(app).post('/api/enquiries').send({
                name: 'John Doe',
                phone: '1234567890',
                email: 'john@test.com',
                targetCountry: 'UK',
                message: 'Hello'
            });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Enquiry submitted successfully');
            
            const dbEnquiry = await Enquiry.findOne({ email: 'john@test.com' });
            expect(dbEnquiry).toBeTruthy();
            expect(dbEnquiry.name).toBe('John Doe');
        });

        it('should fail with missing required fields', async () => {
            const res = await request(app).post('/api/enquiries').send({
                name: 'John Doe',
                // phone missing
                targetCountry: 'UK'
            });

            expect(res.status).toBe(400);
            expect(res.body.errors).toBeDefined();
        });
    });

    describe('GET /api/enquiries', () => {
        beforeEach(async () => {
            await Enquiry.create({
                name: 'Jane',
                phone: '987654321',
                targetCountry: 'Canada'
            });
        });

        it('should allow admin to get enquiries', async () => {
            const res = await request(app)
                .get('/api/enquiries')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
        });

        it('should deny public access', async () => {
            const res = await request(app).get('/api/enquiries');
            expect(res.status).toBe(401);
        });
    });
});
