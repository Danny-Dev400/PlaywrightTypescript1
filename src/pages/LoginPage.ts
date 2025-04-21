import { Page } from '@playwright/test';

export default class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Public method to get the page object for assertions
    getPage(): Page {
        return this.page;
    }

    // Selectors
    private usernameInput = '#username';
    private passwordInput = '#password';
    private loginButton = 'button';

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('/signin');
    }

    async enterUsername(username: string) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin(): Promise<void> {
        await this.page.click(this.loginButton);
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}