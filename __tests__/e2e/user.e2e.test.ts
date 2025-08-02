import { test, expect } from '@playwright/test';

// User end-to-end tests
test.describe('Profile Management', () => {
  test('should update user profile', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'existinguser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await page.goto('/profile');
    await page.fill('input[name="location"]', 'New Location');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toContainText('Profile updated');
  });

  test('should display submitted startups', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'existinguser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await page.goto('/profile');
    await expect(page.locator('.startups-list')).toBeVisible();
  });
});