import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  testDir: '__tests__/e2e',
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
};

export default config;