const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Change this to your own app's URL
    baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
