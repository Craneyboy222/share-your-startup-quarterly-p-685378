import { test, expect } from '@playwright/test';

// Authentication end-to-end tests
test.describe('User Registration and Authentication', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="username"]', 'newuser');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/profile');
  });

  test('should log in an existing user', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'existinguser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/profile');
  });

  test('should fail with incorrect password', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'existinguser@example.com');
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });
});