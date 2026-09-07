require('dotenv').config({ quiet: true });
const { defineConfig, devices } = require('@playwright/test');
const { clientUrl } = require('./config/env.config');
const { timeouts } = require('./utils/constants');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: timeouts.test,
  expect: { timeout: timeouts.expect },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'on-failure' }],
    ['junit', { outputFile: 'reports/junit-report/results.xml' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
    ...(process.env.CI ? [['github']] : []),
  ],
  use: {
    baseURL: clientUrl || process.env.CLIENT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: timeouts.action,
    navigationTimeout: timeouts.navigation,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
