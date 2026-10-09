import { spawnSync } from 'node:child_process'

const isCI = ['true', '1'].includes(process.env.CI) || ['true', '1'].includes(process.env.GITHUB_ACTIONS) || process.env.VERCEL === '1'
const force = ['1', 'true'].includes(process.env.OPTIMIZE_MEDIA)

if (isCI && !force) {
  console.log('[optimize:media] CI detected, skipping. Set OPTIMIZE_MEDIA=1 to force.')
  process.exit(0)
}

const result = spawnSync('pnpm', ['run', 'optimize:media'], { stdio: 'inherit', shell: process.platform === 'win32' })
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)
