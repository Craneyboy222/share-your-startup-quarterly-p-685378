import { test, expect } from '@playwright/test';

test.describe('End-to-End Database Tests', () => {
  test('User can register and login', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/profile');
  });

  test('User can submit a startup', async ({ page }) => {
    await page.goto('http://localhost:3000/startups/new');
    await page.fill('#name', 'Test Startup');
    await page.fill('#url', 'http://teststartup.com');
    await page.fill('#location', 'San Francisco');
    await page.fill('#stage', 'growth');
    await page.fill('#goals', 'Expand globally');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*startups/);
  });

  test('Admin can approve startup submissions', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');
    await page.click('.approve-startup');
    await expect(page).toHaveText('.status', 'Approved');
  });
});