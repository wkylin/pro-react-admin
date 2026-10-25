import { defineConfig } from '@playwright/test'
import { browserDefaults, e2eReport, sharedConfig, workspaceRoot } from './shared'

export default defineConfig({
  ...sharedConfig,
  testMatch: 'mfe-remote.spec.ts',
  timeout: 45_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  ...e2eReport('mfe'),
  use: {
    ...browserDefaults,
    headless: true,
    baseURL: 'http://localhost:5080',
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'node node_modules/serve/build/main.js -s dist-vercel -l 5080',
    cwd: workspaceRoot,
    url: 'http://localhost:5080',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
})
