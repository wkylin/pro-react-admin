import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundler = process.env.BUILD_TOOL || 'webpack'
if (!['webpack', 'vite'].includes(bundler)) throw new Error(`Unknown library build tool: ${bundler}`)

for (const command of [
  `build:lib:${bundler}`,
  'prepare:lib:publish',
  'check:lib-package',
  'check:lib-smoke',
  'check:lib-size',
]) {
  const result = spawnSync(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', ['run', command], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
