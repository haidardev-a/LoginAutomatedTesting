const { test, expect } = require('@playwright/test');

// Test data (demo site credentials). Replace with your own.
const VALID_USER = { username: 'tomsmith', password: 'SuperSecretPassword!' };

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('logs in with valid credentials', async ({ page }) => {
    await page.fill('#username', VALID_USER.username);
    await page.fill('#password', VALID_USER.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('shows an error for a wrong password', async ({ page }) => {
    await page.fill('#username', VALID_USER.username);
    await page.fill('#password', 'wrong-password');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('shows an error for an unknown user', async ({ page }) => {
    await page.fill('#username', 'nobody');
    await page.fill('#password', 'whatever');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('shows an error when fields are empty', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('logs out after logging in', async ({ page }) => {
    await page.fill('#username', VALID_USER.username);
    await page.fill('#password', VALID_USER.password);
    await page.click('button[type="submit"]');
    await page.click('a[href="/logout"]');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });
});
