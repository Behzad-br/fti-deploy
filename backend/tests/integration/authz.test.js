const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Authorization & Privilege Escalation', () => {
    let adminToken;
    let employeeToken;
    let publicUserToken; // Although there is no 'student' login currently, let's fake a student token

    beforeEach(async () => {
        const { authLimiter } = require('../../middleware/rateLimiter');
        authLimiter.resetKey('::ffff:127.0.0.1');

        const admin = await User.create({
            name: 'Admin', email: 'admin@authz.com', password: '123', role: 'admin', status: 'active'
        });
        const employee = await User.create({
            name: 'Emp', email: 'emp@authz.com', password: '123', role: 'employee', status: 'active'
        });
        const student = await User.create({
            name: 'Stu', email: 'stu@authz.com', password: '123', role: 'student', status: 'active'
        });

        adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        employeeToken = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        publicUserToken = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should deny public access to admin endpoints (401 without token, 403 with token)', async () => {
        // Without token
        let res = await request(app).get('/api/auth/employees');
        expect(res.status).toBe(401);

        // With student token
        res = await request(app).get('/api/auth/employees').set('Authorization', `Bearer ${publicUserToken}`);
        expect(res.status).toBe(403);
    });

    it('should deny employee access to admin endpoints (403)', async () => {
        const res = await request(app).get('/api/auth/employees').set('Authorization', `Bearer ${employeeToken}`);
        expect(res.status).toBe(403);
    });

    it('should deny employee from creating another employee', async () => {
        const res = await request(app)
            .post('/api/auth/employee')
            .set('Authorization', `Bearer ${employeeToken}`)
            .send({ name: 'test', email: 'test@test.com', password: 'password123' });
        expect(res.status).toBe(403);
    });

    it('should prevent privilege escalation during employee creation (role field manipulation)', async () => {
        // Admin creates employee, but tries to inject role: admin
        const res = await request(app)
            .post('/api/auth/employee')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'test2', email: 'test2@test.com', password: 'password123', role: 'admin' });
        
        expect(res.status).toBe(201);
        
        // Assert the created user is strictly 'employee' and ignored the injected 'role: admin'
        const createdUser = await User.findOne({ email: 'test2@test.com' });
        expect(createdUser.role).toBe('employee');
    });

    it('should deny IDOR: Employee deleting protected data', async () => {
        // Assuming there's a delete employee endpoint
        const empToDelete = await User.findOne({ email: 'stu@authz.com' });
        const res = await request(app)
            .delete(`/api/auth/employee/${empToDelete._id}`)
            .set('Authorization', `Bearer ${employeeToken}`);
        expect(res.status).toBe(403);
    });

    it('should deny modified JWT role (JWT manipulation)', async () => {
        // We manually create a token setting role as admin, but signed with the real secret. 
        // Wait, the backend doesn't trust the JWT role, it queries the DB by ID.
        // Let's ensure changing the JWT payload doesn't grant access if DB says otherwise.
        // Actually, you can't sign it with the real secret if you don't know it. 
        // We'll sign it with a fake secret and ensure it's rejected.
        const fakeToken = jwt.sign({ id: 'fake_id', role: 'admin' }, 'wrong_secret');
        const res = await request(app)
            .get('/api/auth/employees')
            .set('Authorization', `Bearer ${fakeToken}`);
        expect(res.status).toBe(401);
    });
});
