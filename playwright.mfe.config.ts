import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: ['mfe-remote.spec.ts'],
  timeout: 45_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-mfe-report' }]],
  use: {
    ...devices['Desktop Chrome'],
    headless: true,
    baseURL: 'http://localhost:5080',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm exec serve -s dist-vercel -l 5080',
    url: 'http://localhost:5080',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
