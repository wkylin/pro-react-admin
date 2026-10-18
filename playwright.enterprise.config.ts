import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'enterprise.spec.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  outputDir: './test-results/enterprise',
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { outputFolder: 'playwright-enterprise-report' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:5090',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node node_modules/serve/build/main.js -s dist-enterprise -l 5090',
    url: 'http://localhost:5090',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium' }],
})
