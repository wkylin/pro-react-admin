import { spawnSync } from 'node:child_process'
import { loadProjectRegistry, workspaceRoot } from '../config/project-registry.mjs'
const registry = loadProjectRegistry()
const host = Object.entries(registry.projects).find(([, project]) => project.mfeHost)
if (!host) throw new Error('Missing federation host')
for (const name of [host[0], ...registry.remotes.map((remote) => remote.name)]) {
  const result = spawnSync(process.execPath, ['scripts/project-command.mjs', 'mfe-build', name], {
    cwd: workspaceRoot,
    stdio: 'inherit',
    env: process.env,
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
for (const script of ['prepare-vercel-mfe.mjs', 'validate-mfe-artifacts.mjs']) {
  const result = spawnSync(process.execPath, [`scripts/${script}`], { cwd: workspaceRoot, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
