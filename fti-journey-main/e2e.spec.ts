import { test, expect } from '@playwright/test';

test.describe('E2E Staging Testing', () => {
    test('Public Contact Workflow', async ({ request }) => {
        // Direct API call to mimic frontend submission
        const res = await request.post('http://localhost:5000/api/contact', {
            data: {
                name: 'Playwright Test',
                email: 'test@playwright.com',
                phone: '+1234567890',
                message: 'Hello staging'
            }
        });
        expect(res.status()).toBe(201);
    });

    test('Auth Workflow: Invalid login', async ({ request }) => {
        const res = await request.post('http://localhost:5000/api/auth/login', {
            data: {
                email: 'admin@fti.edu.pk',
                password: 'wrongpassword'
            }
        });
        expect(res.status()).toBe(401); // Or 401
    });

    test('Auth Workflow: Valid admin login', async ({ request }) => {
        const res = await request.post('http://localhost:5000/api/auth/login', {
            data: {
                email: 'admin@fti.edu.pk',
                password: 'password123'
            }
        });
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.token).toBeDefined();
    });

    test('Employee Role Isolation', async ({ request }) => {
        const adminRes = await request.post('http://localhost:5000/api/auth/login', {
            data: { email: 'admin@fti.edu.pk', password: 'password123' }
        });
        const adminToken = (await adminRes.json()).token;

        const email = `emp${Date.now()}@fti.com`;
        const empRes = await request.post('http://localhost:5000/api/auth/employee', {
            headers: { 'Authorization': `Bearer ${adminToken}` },
            data: {
                name: 'Emp',
                email: email,
                password: 'password123',
                role: 'employee'
            }
        });
        expect(empRes.status()).toBe(201);

        const empLogin = await request.post('http://localhost:5000/api/auth/login', {
            data: { email: email, password: 'password123' }
        });
        expect(empLogin.status()).toBe(200);
        const empToken = (await empLogin.json()).token;

        // Try to access admin route
        const cmsRes = await request.put('http://localhost:5000/api/settings/whatsapp', {
            headers: { 'Authorization': `Bearer ${empToken}` },
            data: { companyName: 'Hacked' }
        });
        expect(cmsRes.status()).toBe(403);
    });
});
