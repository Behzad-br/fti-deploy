# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.forms.spec.ts >> Phase 4: Contact & Apply Form Verification >> Submit Apply Form Successfully
- Location: e2e.forms.spec.ts:31:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - region "Notifications (F8)":
      - list [ref=e4]:
        - status [ref=e5]:
          - generic [ref=e6]:
            - generic [ref=e7]: Error
            - generic [ref=e8]: Too many form submissions from this IP, please try again after an hour
          - button [ref=e9] [cursor=pointer]:
            - img [ref=e10]
    - region "Notifications alt+T"
    - generic [ref=e15]:
      - banner [ref=e16]:
        - generic [ref=e18]:
          - link "FTI Consultants" [ref=e19] [cursor=pointer]:
            - /url: /
            - img "FTI Consultants" [ref=e21]
          - navigation [ref=e22]:
            - link "Home" [ref=e23] [cursor=pointer]:
              - /url: /
            - link "Profile" [ref=e24] [cursor=pointer]:
              - /url: /about
            - link "Destinations" [ref=e25] [cursor=pointer]:
              - /url: /destinations
            - link "Services" [ref=e26] [cursor=pointer]:
              - /url: /services
            - link "Events" [ref=e27] [cursor=pointer]:
              - /url: /events
            - link "IELTS" [ref=e28] [cursor=pointer]:
              - /url: /ielts
            - link "PTE" [ref=e29] [cursor=pointer]:
              - /url: /pte
            - link "Contact" [ref=e30] [cursor=pointer]:
              - /url: /contact
          - link "nurturing careers" [ref=e32] [cursor=pointer]:
            - /url: /ielts
            - generic [ref=e33]: nurturing
            - generic [ref=e34]: careers
      - main [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e38]:
            - heading "Apply Now" [level=1] [ref=e39]
            - paragraph [ref=e40]: Start your study abroad journey with a free counselling session.
          - generic [ref=e43]:
            - textbox "Full Name *" [ref=e44]: Jane Doe
            - textbox "Phone / WhatsApp *" [ref=e45]: "+923009876543"
            - textbox "Email Address" [ref=e46]: jane.doe@example.com
            - combobox [ref=e47] [cursor=pointer]:
              - generic: Qualification
              - img [ref=e48]
            - combobox [ref=e50] [cursor=pointer]
            - textbox "GPA / Percentage" [ref=e51]
            - combobox [ref=e52] [cursor=pointer]:
              - generic: UK
              - img [ref=e53]
            - combobox [ref=e55] [cursor=pointer]
            - combobox [ref=e56] [cursor=pointer]:
              - generic: IELTS/PTE Status
              - img [ref=e57]
            - combobox [ref=e59] [cursor=pointer]
            - combobox [ref=e60] [cursor=pointer]:
              - generic: Preferred Intake
              - img [ref=e61]
            - combobox [ref=e63] [cursor=pointer]
            - button "Submit Application" [ref=e64] [cursor=pointer]
      - contentinfo [ref=e65]:
        - generic [ref=e69]:
          - link "FTI Consultants" [ref=e71] [cursor=pointer]:
            - /url: /
            - img "FTI Consultants" [ref=e73]
          - generic [ref=e74]:
            - link [ref=e75] [cursor=pointer]:
              - /url: "#"
              - img [ref=e76]
            - link [ref=e78] [cursor=pointer]:
              - /url: "#"
              - img [ref=e79]
            - link [ref=e82] [cursor=pointer]:
              - /url: "#"
              - img [ref=e83]
            - link [ref=e87] [cursor=pointer]:
              - /url: "#"
              - img [ref=e88]
            - link [ref=e91] [cursor=pointer]:
              - /url: "#"
              - img [ref=e92]
        - generic [ref=e96]:
          - paragraph [ref=e97]: © 2026 FTI Consultants. Engineered for Excellence.
          - generic [ref=e98]:
            - link "Privacy Policy" [ref=e99] [cursor=pointer]:
              - /url: /privacy
            - link "Terms of Service" [ref=e100] [cursor=pointer]:
              - /url: /terms
      - button "WhatsApp Support" [ref=e102] [cursor=pointer]:
        - img [ref=e105]
      - button [ref=e108] [cursor=pointer]:
        - img [ref=e111]
  - status [ref=e114]: Notification ErrorToo many form submissions from this IP, please try again after an hour
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Phase 4: Contact & Apply Form Verification', () => {
  4  | 
  5  |   test('Submit Contact Form Successfully', async ({ page }) => {
  6  |     await page.goto('http://localhost:8080/contact');
  7  |     
  8  |     // Fill out the form
  9  |     await page.fill('input[name="name"]', 'John E2E Test');
  10 |     await page.fill('input[name="email"]', 'john.e2e@example.com');
  11 |     await page.fill('input[name="phone"]', '+923001234567');
  12 |     await page.fill('textarea[name="message"]', 'This is an automated E2E test message.');
  13 |     
  14 |     // Listen for the network response to the backend API
  15 |     const responsePromise = page.waitForResponse(response => 
  16 |       response.url().includes('/api/contact')
  17 |     );
  18 | 
  19 |     // Submit form
  20 |     await page.click('button[type="submit"]');
  21 | 
  22 |     // Wait for API response
  23 |     const response = await responsePromise;
  24 |     console.log('Contact response status:', response.status(), await response.text());
  25 |     expect(response.ok()).toBeTruthy();
  26 | 
  27 |     // Verify UI success state
  28 |     await expect(page.getByText('Message Sent!').first()).toBeVisible({ timeout: 5000 });
  29 |   });
  30 | 
  31 |   test('Submit Apply Form Successfully', async ({ page }) => {
  32 |     await page.goto('http://localhost:8080/apply');
  33 |     
  34 |     // Fill out the application form
  35 |     await page.fill('input[name="name"]', 'Jane Doe');
  36 |     await page.fill('input[name="email"]', 'jane.doe@example.com');
  37 |     await page.fill('input[name="phone"]', '+923009876543');
  38 |     
  39 |     // Select country
  40 |     await page.getByRole('combobox').filter({ hasText: 'Preferred Country *' }).click();
  41 |     await page.getByRole('option', { name: 'UK', exact: true }).click();
  42 | 
  43 |     const responsePromise = page.waitForResponse(response => 
  44 |       response.url().includes('/api/enquiries')
  45 |     );
  46 | 
  47 |     // Click submit
  48 |     await page.click('button[type="submit"]');
  49 | 
  50 |     const response = await responsePromise;
  51 |     console.log('Apply response status:', response.status(), await response.text());
> 52 |     expect(response.ok()).toBeTruthy();
     |                           ^ Error: expect(received).toBeTruthy()
  53 | 
  54 |     // Typically, apply form redirects to /success or shows toast
  55 |     await expect(page.getByText('Application Received!')).toBeVisible({ timeout: 5000 });
  56 |   });
  57 | });
  58 | 
```