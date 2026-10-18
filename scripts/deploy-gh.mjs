import { spawnSync } from 'node:child_process'
import { workspaceRoot } from '../config/project-registry.mjs'
import { localCli } from './local-cli.mjs'

for (const args of [['scripts/build-pages.mjs'], [localCli('gh-pages'), '-d', 'dist-combined']]) {
  const result = spawnSync(process.execPath, args, { cwd: workspaceRoot, stdio: 'inherit', env: process.env })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
