import { test, expect } from '@playwright/test';

test.describe('Phase 4: Contact & Apply Form Verification', () => {

  test('Submit Contact Form Successfully', async ({ page }) => {
    await page.goto('http://localhost:8080/contact');
    
    // Fill out the form
    await page.fill('input[name="name"]', 'John E2E Test');
    await page.fill('input[name="email"]', 'john.e2e@example.com');
    await page.fill('input[name="phone"]', '+923001234567');
    await page.fill('textarea[name="message"]', 'This is an automated E2E test message.');
    
    // Listen for the network response to the backend API
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/contact')
    );

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for API response
    const response = await responsePromise;
    console.log('Contact response status:', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();

    // Verify UI success state
    await expect(page.getByText('Message Sent!').first()).toBeVisible({ timeout: 5000 });
  });

  test('Submit Apply Form Successfully', async ({ page }) => {
    await page.goto('http://localhost:8080/apply');
    
    // Fill out the application form
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane.doe@example.com');
    await page.fill('input[name="phone"]', '+923009876543');
    
    // Select country
    await page.getByRole('combobox').filter({ hasText: 'Preferred Country *' }).click();
    await page.getByRole('option', { name: 'UK', exact: true }).click();

    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/enquiries')
    );

    // Click submit
    await page.click('button[type="submit"]');

    const response = await responsePromise;
    console.log('Apply response status:', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();

    // Typically, apply form redirects to /success or shows toast
    await expect(page.getByText('Application Received!')).toBeVisible({ timeout: 5000 });
  });
});
