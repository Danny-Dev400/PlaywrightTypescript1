import { test, expect } from './TestBase';

test.describe('Home Page Tests', () => {
    test('should navigate to bank accounts and verify account name', async ({ loginPage, homePage }) => {
        // Login to the application
        await loginPage.navigateToLoginPage();
        await loginPage.login('Test1', '!Walk2022');

        // Navigate to bank accounts
        await homePage.navigateToBankAccounts();

        // Verify bank account name exists
        await expect(await homePage.isBankAccountVisible('Testdaniel')).toBeTruthy();
    });
}); 