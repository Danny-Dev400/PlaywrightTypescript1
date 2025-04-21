import { defineConfig, devices } from '@playwright/test';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: `${__dirname}//src//config//.env`});
}else {
  require('dotenv').config({path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`});
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 2000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
