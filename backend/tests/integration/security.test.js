const request = require('supertest');
const app = require('../../server');

describe('Security Headers and CORS', () => {
    it('should set security headers via Helmet', async () => {
        const res = await request(app).get('/');
        
        // Helmet sets these headers by default
        expect(res.headers['x-dns-prefetch-control']).toBeDefined();
        expect(res.headers['x-frame-options']).toBeDefined();
        expect(res.headers['content-security-policy']).toBeDefined();
    });

    it('should allow valid CORS origins (when defined in env)', async () => {
        process.env.FRONTEND_URL = 'http://trusted-frontend.com';
        
        const res = await request(app)
            .get('/')
            .set('Origin', 'http://trusted-frontend.com');

        expect(res.headers['access-control-allow-origin']).toBe('http://trusted-frontend.com');
    });

    it('should reject invalid CORS origins', async () => {
        const res = await request(app)
            .get('/')
            .set('Origin', 'http://malicious.com');

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Not allowed by CORS');
    });

    describe('Rate Limiter Tests', () => {
        beforeEach(() => {
            // Reset the internal maps for testing limiters
            const { apiLimiter, authLimiter, formLimiter } = require('../../middleware/rateLimiter');
            apiLimiter.resetKey('::ffff:127.0.0.1');
            authLimiter.resetKey('::ffff:127.0.0.1');
            formLimiter.resetKey('::ffff:127.0.0.1');
        });

        it('should allow login requests below limit', async () => {
            const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com', password: '123' });
            expect(res.status).not.toBe(429);
        });

        it('should return 429 when login requests exceed the limit', async () => {
            // authLimiter max is 10
            for (let i = 0; i < 10; i++) {
                await request(app).post('/api/auth/login').send({ email: 'a@b.com', password: '123' });
            }
            const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com', password: '123' });
            expect(res.status).toBe(429);
            expect(res.body.message).toMatch(/Too many login attempts/);
            expect(res.headers['ratelimit-limit']).toBeDefined();
        });

        it('should return 429 when form submissions exceed the limit', async () => {
            // formLimiter max is 5
            for (let i = 0; i < 5; i++) {
                await request(app).post('/api/contact').send({ name: 'A', phone: '123456', message: 'test' });
            }
            const res = await request(app).post('/api/contact').send({ name: 'A', phone: '123456', message: 'test' });
            expect(res.status).toBe(429);
            expect(res.body.message).toMatch(/Too many form submissions/);
            expect(res.headers['ratelimit-limit']).toBeDefined();
        });
    });
});
