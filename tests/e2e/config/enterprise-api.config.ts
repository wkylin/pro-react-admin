import { defineConfig } from '@playwright/test'
import { browserDefaults, e2eReport, sharedConfig, workspaceRoot } from './shared'

export default defineConfig({
  ...sharedConfig,
  testMatch: 'enterprise-api.spec.ts',
  workers: 1,
  ...e2eReport('enterprise-api'),
  forbidOnly: !!process.env.CI,
  use: {
    ...browserDefaults,
    baseURL: 'http://127.0.0.1:5091',
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'node scripts/serve-enterprise-test.mjs',
    cwd: workspaceRoot,
    url: 'http://127.0.0.1:5091',
    timeout: 60_000,
    reuseExistingServer: false,
  },
})
