const request = require('supertest');
const app = require('../../server');

describe('Validation and Injection Testing', () => {
    beforeEach(() => {
        const { formLimiter } = require('../../middleware/rateLimiter');
        formLimiter.resetKey('::ffff:127.0.0.1');
    });

    it('should reject missing required fields', async () => {
        const res = await request(app).post('/api/contact').send({ name: 'Test' });
        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it('should reject invalid data types', async () => {
        const res = await request(app).post('/api/contact').send({
            name: 12345, // expected string
            phone: '123456'
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].message).toBe('Expected string, received number');
    });

    it('should safely ignore or reject prototype pollution', async () => {
        const payload = JSON.parse('{"name": "test", "phone": "123456", "__proto__": {"polluted": true}}');
        const res = await request(app).post('/api/contact').send(payload);
        
        // Zod either strips it or parses safely. The key is we don't crash.
        expect(res.status).toBe(201);
        expect({}.polluted).toBeUndefined(); // ensure node isn't polluted locally
    });

    it('should reject NoSQL operators inside strings', async () => {
        // If someone passes an object instead of a string
        const res = await request(app).post('/api/contact').send({
            name: { $ne: null },
            phone: '123456'
        });
        expect(res.status).toBe(400); // Zod catches object vs string
    });

    it('should gracefully handle malformed JSON', async () => {
        const res = await request(app)
            .post('/api/contact')
            .set('Content-Type', 'application/json')
            .send('{"name": "test", "phone": "123456"'); // missing closing brace
        
        expect(res.status).toBe(400);
        expect(res.body.message).toBeDefined();
        // The error handler should obscure the stack trace in prod, but since we are in test mode it behaves as prod.
        expect(res.body.stack).toBeUndefined();
    });

    it('should reject extremely long strings', async () => {
        const longString = 'a'.repeat(5000);
        const res = await request(app).post('/api/contact').send({
            name: longString,
            phone: '123456'
        });
        expect(res.status).toBe(400); // Because we set max(100) or max(2000)
    });
});
