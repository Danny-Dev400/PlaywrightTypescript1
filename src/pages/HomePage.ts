import { Page } from '@playwright/test';

export default class HomePage {
    private page: Page;
    private readonly menuButton: any;
    private readonly logo: any;
    private readonly newTransactionButton: any;
    private readonly notificationsButton: any;
    private readonly tabList: any;
    private readonly everyoneTab: any;
    private readonly friendsTab: any;
    private readonly mineTab: any;
    private readonly userFullName: any;
    private readonly userHandle: any;
    private readonly accountBalance: any;
    private readonly accountBalanceText: any;
    private readonly navigationList: any;
    private readonly logoutButton: any;
    private readonly dateFilterButton: any;
    private readonly amountFilterButton: any;
    private readonly transactionsList: any;

    constructor(page: Page) {
        this.page = page;
        
        // Navigation and Header Elements
        this.menuButton = this.page.getByRole('button', { name: 'open drawer' });
        this.logo = this.page.getByRole('heading', { level: 1 }).getByRole('link');
        this.newTransactionButton = this.page.getByRole('link', { name: 'New' });
        this.notificationsButton = this.page.getByRole('link', { name: /^\d+$/ }); // Matches notification count
        
        // Tabs
        this.tabList = this.page.getByRole('tablist');
        this.everyoneTab = this.page.getByRole('tab', { name: 'Everyone' });
        this.friendsTab = this.page.getByRole('tab', { name: 'Friends' });
        this.mineTab = this.page.getByRole('tab', { name: 'Mine' });
        
        // User Info
        this.userFullName = this.page.getByRole('heading', { level: 6 }).filter({ hasText: /^[^@]/ }); // Matches name without @
        this.userHandle = this.page.getByRole('heading', { level: 6 }).filter({ hasText: /^@/ }); // Matches @username
        this.accountBalance = this.page.getByRole('heading', { level: 6 }).filter({ hasText: /^\$/ }); // Matches dollar amount
        this.accountBalanceText = this.page.getByRole('heading', { name: 'Account Balance' });
        
        // Navigation Links
        this.navigationList = this.page.getByRole('list').filter({ hasText: 'Home' });
        
        // Action Buttons
        this.logoutButton = this.page.getByRole('button', { name: 'Logout' });
        this.dateFilterButton = this.page.getByRole('button', { name: /Date:/ });
        this.amountFilterButton = this.page.getByRole('button', { name: /Amount:/ });
        
        // Transaction List
        this.transactionsList = this.page.getByRole('grid', { name: 'grid' });
    }

    // Public method to get the page object for assertions
    getPage(): Page {
        return this.page;
    }

    // Navigation Methods
    async clickNewTransaction(): Promise<void> {
        await this.newTransactionButton.click();
    }

    async clickNotifications(): Promise<void> {
        await this.notificationsButton.click();
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    // Tab Navigation
    async selectEveryoneTab(): Promise<void> {
        await this.everyoneTab.click();
    }

    async selectFriendsTab(): Promise<void> {
        await this.friendsTab.click();
    }

    async selectMineTab(): Promise<void> {
        await this.mineTab.click();
    }

    // Filter Methods
    async clickDateFilter(): Promise<void> {
        await this.dateFilterButton.click();
    }

    async clickAmountFilter(): Promise<void> {
        await this.amountFilterButton.click();
    }

    // Information Getters
    async getUserFullName(): Promise<string | null> {
        return await this.userFullName.textContent();
    }

    async getUserHandle(): Promise<string | null> {
        return await this.userHandle.textContent();
    }

    async getAccountBalance(): Promise<string | null> {
        return await this.accountBalance.textContent();
    }

    // Navigation Methods
    async navigateToHome(): Promise<void> {
        await this.page.getByRole('link', { name: 'Home' }).click();
    }

    async navigateToMyAccount(): Promise<void> {
        await this.page.getByRole('link', { name: 'My Account' }).click();
    }

    async navigateToBankAccounts(): Promise<void> {
        await this.page.getByRole('link', { name: 'Bank Accounts' }).click();
    }

    async navigateToNotifications(): Promise<void> {
        await this.page.getByRole('link', { name: 'Notifications' }).click();
    }

    // Verification Methods
    async isTransactionListVisible(): Promise<boolean> {
        return await this.transactionsList.isVisible();
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.userHandle.isVisible();
    }

    // Bank Account Methods
    async isBankAccountVisible(accountName: string): Promise<boolean> {
        const bankAccount = this.page.getByRole('listitem').filter({ hasText: accountName });
        return await bankAccount.isVisible();
    }

    async waitForBankAccount(accountName: string, timeout = 10000): Promise<void> {
        const bankAccount = this.page.getByRole('listitem').filter({ hasText: accountName });
        await bankAccount.waitFor({ state: 'visible', timeout });
    }
}