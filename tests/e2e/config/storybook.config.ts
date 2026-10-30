import path from 'node:path'
import { defineConfig } from '@playwright/test'
import { browserDefaults, sharedConfig, workspaceRoot } from './shared'

// STORYBOOK_URL can point to an already running Vite or Webpack Storybook.
const baseURL = process.env.STORYBOOK_URL || 'http://localhost:6008'

export default defineConfig({
  ...sharedConfig,
  testMatch: 'storybook-book.spec.ts',
  outputDir: path.join(workspaceRoot, 'tests/reports/e2e/storybook/artifacts'),
  reporter: 'list',
  use: {
    ...browserDefaults,
    baseURL,
    viewport: { width: 1400, height: 1000 },
  },
  webServer: process.env.STORYBOOK_URL
    ? undefined
    : {
        command: 'pnpm exec storybook dev -c .storybook/vite -p 6008 --ci',
        cwd: workspaceRoot,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
})
