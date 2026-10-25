import { defineConfig } from '@playwright/test'
import { browserDefaults, e2eReport, sharedConfig, workspaceRoot } from './shared'

export default defineConfig({
  ...sharedConfig,
  testMatch: 'enterprise.spec.ts',
  fullyParallel: true,
  ...e2eReport('enterprise-demo'),
  forbidOnly: !!process.env.CI,
  use: {
    ...browserDefaults,
    baseURL: 'http://localhost:5090',
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'node node_modules/serve/build/main.js -s dist-enterprise -l 5090',
    cwd: workspaceRoot,
    url: 'http://localhost:5090',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
})
