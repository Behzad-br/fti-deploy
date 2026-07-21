const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Route Coverage Tests', () => {
    let token;

    beforeAll(async () => {
        const user = await User.create({
            name: 'Test',
            email: 'test@routes.com',
            password: '123',
            role: 'admin'
        });
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    const routesToTest = [
        { path: '/api/page', method: 'get', expectedAuth: false }, // assuming public
        { path: '/api/upload', method: 'post', expectedAuth: true },
        { path: '/api/apply', method: 'post', expectedAuth: false },
        { path: '/api/consultation', method: 'post', expectedAuth: false },
        { path: '/api/test-queries', method: 'post', expectedAuth: false },
        { path: '/api/cms', method: 'get', expectedAuth: false },
        { path: '/api/settings', method: 'get', expectedAuth: false }
    ];

    routesToTest.forEach(route => {
        it(`should safely respond to ${route.method.toUpperCase()} ${route.path}`, async () => {
            let req = request(app)[route.method](route.path);
            if (route.method === 'post') {
                req = req.send({});
            }
            
            // Just test that the route exists and doesn't crash
            // We might get 401, 400, 404 (if ID is needed), 200, 201
            const res = await req;
            
            // We ensure it is NOT a 500 error leaking stack traces
            expect(res.status).not.toBe(500);

            // If it's heavily protected, maybe 401
            if (route.expectedAuth && res.status === 401) {
                expect(res.body.message).toBeDefined();
            }
        });
    });

    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/api/unknown-route-that-doesnt-exist');
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/Route not found/);
    });
});
