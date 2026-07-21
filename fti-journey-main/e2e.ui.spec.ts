import { test, expect } from '@playwright/test';

// Define the public routes to test
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/ielts',
  '/pte',
  '/destinations',
  '/destinations/uk',
  '/contact',
  '/apply',
  '/apply-ielts',
  '/apply-pte',
  '/free-consultation',
  '/events'
];

test.describe('Phase 5: Page-by-page Browser Scanning (Public)', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Render route: ${route}`, async ({ page }) => {
      const errors: string[] = [];
      const failedRequests: string[] = [];

      // Listen for uncaught exceptions or console errors
      page.on('pageerror', exception => {
        errors.push(`Uncaught exception: "${exception}"`);
      });
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(`Console error: "${msg.text()}"`);
        }
      });
      
      // Listen for failed network requests
      page.on('requestfailed', request => {
        failedRequests.push(`Failed Request: ${request.url()} - ${request.failure()?.errorText}`);
      });
      page.on('response', response => {
        if (response.status() >= 400 && response.status() !== 401 && response.status() !== 403 && !response.url().includes('/api/auth/me')) {
           failedRequests.push(`HTTP ${response.status()}: ${response.url()}`);
        }
      });

      const response = await page.goto(`http://localhost:8080${route}`, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      
      // Wait a moment for any lazy loading
      await page.waitForTimeout(1000);
      
      // Check for generic "blank screen" symptoms (i.e. React crashed)
      const rootHtml = await page.innerHTML('#root');
      expect(rootHtml.trim().length).toBeGreaterThan(0);

      // Verify header/footer presence
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('footer').first()).toBeVisible();

      // Ensure no hard errors occurred
      if (errors.length > 0 || failedRequests.length > 0) {
        console.log(`--- Errors on ${route} ---`);
        console.log('Console Errors:', errors);
        console.log('Failed Requests:', failedRequests);
      }
    });
  }
});
