import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'enterprise-api.spec.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  workers: 1,
  forbidOnly: !!process.env.CI,
  outputDir: './test-results/enterprise-api',
  reporter: [['list'], ['html', { outputFolder: 'playwright-enterprise-api-report' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:5091',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-enterprise-test.mjs',
    url: 'http://127.0.0.1:5091',
    timeout: 60_000,
    reuseExistingServer: false,
  },
  projects: [{ name: 'chromium' }],
})
