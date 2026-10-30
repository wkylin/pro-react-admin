import { defineConfig } from '@playwright/test'
import { browserDefaults, e2eReport, sharedConfig, workspaceRoot } from './shared'

export default defineConfig({
  ...sharedConfig,
  testIgnore: [
    '**/storybook-book.spec.ts',
    '**/mfe-remote.spec.ts',
    '**/enterprise.spec.ts',
    '**/enterprise-public.spec.ts',
    '**/enterprise-api.spec.ts',
  ],
  fullyParallel: true,
  ...e2eReport(process.env.BUILD_TOOL === 'vite' ? 'vite' : 'webpack'),
  use: {
    ...browserDefaults,
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    baseURL: 'http://localhost:5000',
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'node scripts/dist-tools.mjs serve --port 5000',
    cwd: workspaceRoot,
    url: 'http://localhost:5000',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
})
