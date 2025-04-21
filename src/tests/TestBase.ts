import { test as baseTest } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

// Declare the types for our fixture
type Pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    // Add more pages here as they are created
};

// Extend the base test with our pages
export const test = baseTest.extend<Pages>({
    // Define the loginPage fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    // Define the homePage fixture
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    // Add more page fixtures here as they are created
});

// Export our custom test type
export { expect } from '@playwright/test'; 