const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Auth API', () => {
    let adminToken;
    let employeeToken;
    let suspendedToken;
    let deletedToken;
    let adminUser;
    
    beforeEach(async () => {
        // Reset the auth limiter so tests do not interfere
        const { authLimiter } = require('../../middleware/rateLimiter');
        authLimiter.resetKey('::ffff:127.0.0.1');

        adminUser = await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin',
            status: 'active'
        });

        const employee = await User.create({
            name: 'Employee',
            email: 'employee@test.com',
            password: 'password123',
            role: 'employee',
            status: 'active'
        });

        const suspended = await User.create({
            name: 'Suspended',
            email: 'suspended@test.com',
            password: 'password123',
            role: 'student',
            status: 'suspended'
        });

        const deleted = await User.create({
            name: 'Deleted',
            email: 'deleted@test.com',
            password: 'password123',
            role: 'student',
            status: 'deleted'
        });

        // generate tokens directly to skip rate limiting loops
        const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        adminToken = generateToken(adminUser._id);
        employeeToken = generateToken(employee._id);
        suspendedToken = generateToken(suspended._id);
        deletedToken = generateToken(deleted._id);
    });

    describe('Login Scenarios', () => {
        it('should login valid admin and exclude password hash', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'admin@test.com',
                password: 'password123'
            });
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.password).toBeUndefined();
            expect(res.body.role).toBe('admin');
        });

        it('should login valid employee', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'employee@test.com',
                password: 'password123'
            });
            expect(res.status).toBe(200);
            expect(res.body.role).toBe('employee');
        });

        it('should reject invalid password', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'admin@test.com',
                password: 'wrongpassword'
            });
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid email or password');
        });

        it('should reject non-existing email without leaking user existence', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'nobody@test.com',
                password: 'password123'
            });
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid email or password');
        });

        it('should reject missing email', async () => {
            const res = await request(app).post('/api/auth/login').send({
                password: 'password123'
            });
            expect(res.status).toBe(400);
        });

        it('should reject missing password', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'admin@test.com'
            });
            expect(res.status).toBe(400);
        });

        it('should reject empty strings', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: '',
                password: ''
            });
            expect(res.status).toBe(400);
        });

        it('should reject whitespace-only strings', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: '   ',
                password: '   '
            });
            expect(res.status).toBe(400);
        });

        it('should reject object payload instead of string (NoSQL prevention)', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: { $ne: null },
                password: 'password123'
            });
            expect(res.status).toBe(400);
            expect(res.body.errors[0].message).toBe('Email must be a string');
        });

        it('should reject extremely long inputs', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'a'.repeat(1000) + '@test.com',
                password: 'password123'
            });
            // Depending on zod config or parser it might be 400
            expect(res.status).toBe(400);
        });
    });

    describe('JWT and Session Security', () => {
        it('should reject missing JWT', async () => {
            const res = await request(app).get('/api/auth/me');
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Not authorized, no token');
        });

        it('should reject invalid/malformed JWT', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer invalid.token.here');
            expect(res.status).toBe(401);
        });

        it('should reject expired JWT', async () => {
            const expiredToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '-1s' });
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${expiredToken}`);
            expect(res.status).toBe(401);
        });

        it('should reject JWT signed with wrong secret', async () => {
            const fakeToken = jwt.sign({ id: adminUser._id }, 'wrong-secret', { expiresIn: '1h' });
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${fakeToken}`);
            expect(res.status).toBe(401);
        });

        it('should reject suspended user', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${suspendedToken}`);
            expect(res.status).toBe(403);
            expect(res.body.message).toBe('Your account has been suspended');
        });

        it('should reject deleted user', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${deletedToken}`);
            expect(res.status).toBe(403);
            expect(res.body.message).toBe('Your account has been deleted');
        });
    });
});
