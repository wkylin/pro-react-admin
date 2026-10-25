import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { devices, type PlaywrightTestConfig } from '@playwright/test'

export const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

export const browserDefaults = {
  ...devices['Desktop Chrome'],
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
} satisfies PlaywrightTestConfig['use']

export const sharedConfig = {
  testDir: path.join(workspaceRoot, 'tests/e2e'),
  timeout: 30_000,
  expect: { timeout: 10_000 },
  projects: [{ name: 'chromium' }],
} satisfies PlaywrightTestConfig

export function e2eReport(target: 'webpack' | 'vite' | 'enterprise-demo' | 'enterprise-api' | 'mfe') {
  const directory = path.join(workspaceRoot, 'tests/reports/e2e', target)
  return {
    outputDir: path.join(directory, 'artifacts'),
    reporter: [
      ['list'],
      ['html', { outputFolder: path.join(directory, 'html'), open: 'never' }],
      ['json', { outputFile: path.join(directory, 'results.json') }],
    ],
  } satisfies Pick<PlaywrightTestConfig, 'outputDir' | 'reporter'>
}
