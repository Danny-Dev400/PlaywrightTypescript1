import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigateToLoginPage();

    // Perform login
    const validUsername = 'Test1';
    const validPassword = '!Walk2022';
    await loginPage.login(validUsername, validPassword);

    // Assert successful login (example: check for a specific element after login)
    // await expect(page).toHaveURL('/dashboard'); // Replace '/dashboard' with the actual post-login URL
    await expect(page.locator('text=@Test1')).toBeVisible(); // Replace 'Welcome' with an actual element/text visible after login
  });

  test('should fail to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigateToLoginPage();

    // Perform login with invalid credentials
    const invalidUsername = 'invaliduser';
    const invalidPassword = 'wrongpassword';
    await loginPage.login(invalidUsername, invalidPassword);

    // Assert login failure (example: check for an error message)
    await expect(page.locator('text=Invalid username or password')).toBeVisible(); // Replace with the actual error message
  });
});