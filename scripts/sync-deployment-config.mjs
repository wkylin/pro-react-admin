import fs from 'node:fs'
import path from 'node:path'
import { loadProjectRegistry, workspaceRoot } from '../config/project-registry.mjs'

const registry = loadProjectRegistry()
const common = [
  { key: 'Access-Control-Allow-Origin', value: '*' },
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
]
const noCache = (source) => ({
  source,
  headers: [...common, { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
})
const immutable = (source) => ({
  source,
  headers: [...common, { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
})
const roots = ['', ...registry.remotes.map((remote) => path.posix.dirname(remote.prodPath))]
const headerRules = roots.flatMap((base) => [
  noCache(`${base}/remoteEntry.js`),
  noCache(`${base}/remote-manifest.json`),
  immutable(`${base}/static/(.*)`),
  { source: `${base}/index.html`, headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }] },
])
const configs = ['vercel.json', 'vercel.mfe.json']
let stale = false
for (const filename of configs) {
  const file = path.join(workspaceRoot, filename)
  const actual = JSON.parse(fs.readFileSync(file, 'utf8'))
  const expected = JSON.stringify({ ...actual, headers: headerRules }, null, 2) + '\n'
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(file, 'utf8') !== expected) {
      stale = true
      console.error(`${filename} is stale; run pnpm run sync:deployment`)
    }
  } else fs.writeFileSync(file, expected)
}
if (stale) process.exitCode = 1
else console.log('[deployment] Registry Remote paths and cache headers are in sync')
