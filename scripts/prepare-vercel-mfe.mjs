import fs from 'node:fs'
import path from 'node:path'
import { loadProjectRegistry, resolveProject, workspaceRoot, resolveInside } from '../config/project-registry.mjs'

const registry = loadProjectRegistry()
const host = Object.entries(registry.projects).find(([, project]) => project.mfeHost)
if (!host) throw new Error('Register a project with mfeHost: true')
const output = path.join(workspaceRoot, 'dist-vercel')
const inputs = [
  { name: host[0], source: resolveProject(host[0], registry).output, destination: output },
  ...registry.remotes.map((remote) => ({
    name: remote.name,
    source: resolveProject(remote.name, registry).output,
    destination: resolveInside(output, path.posix.dirname(remote.prodPath).slice(1), 'Remote deployment path'),
  })),
]
for (const item of inputs) {
  if (!fs.existsSync(path.join(item.source, 'index.html')))
    throw new Error(`Missing build for ${item.name}: ${item.source}`)
  if (item.name !== host[0] && !fs.existsSync(path.join(item.source, 'remoteEntry.js')))
    throw new Error(`Missing Remote entry for ${item.name}`)
}
fs.rmSync(output, { recursive: true, force: true })
for (const item of inputs) fs.cpSync(item.source, item.destination, { recursive: true })
console.log(`[mfe] Assembled host and ${registry.remotes.length} remotes in dist-vercel from registry outputs`)
