import { spawnSync } from 'node:child_process'

// Preview has no Sentry release token. The default demo works without source-map upload.
const token = process.env.SENTRY_AUTH_TOKEN
const uploadSentry = process.env.VERCEL_ENV === 'production' && token && token !== '[SENSITIVE]'
const script = uploadSentry ? 'build:production' : 'build:webpack'
const env = {
  ...process.env,
  PROJECT: 'default',
  PUBLIC_URL: '/',
  REACT_APP_USE_MOCK: 'true',
  APP_BASE_URL: '',
}

console.log(`[vercel] Building default demo with ${script}`)
const result = spawnSync('pnpm', ['run', script], {
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)
