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
const cacheRules = (base) => [
  noCache(`${base}/remoteEntry.js`),
  noCache(`${base}/remote-manifest.json`),
  noCache(`${base}/sw.js`),
  noCache(`${base}/version.json`),
  immutable(`${base}/assets/(.*)`),
  { source: `${base}/index.html`, headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }] },
]
const headerRules = roots.flatMap(cacheRules)
const configs = ['vercel.json', 'vercel.mfe.json', 'vercel.shell.json', 'vercel.projectA.json', 'vercel.projectB.json']
let stale = false
for (const filename of configs) {
  const file = path.join(workspaceRoot, filename)
  const actual = JSON.parse(fs.readFileSync(file, 'utf8'))
  const headers = ['vercel.json', 'vercel.mfe.json'].includes(filename)
    ? headerRules
    : [...cacheRules(''), { source: '/(.*)\\.js', headers: common }]
  const expected = JSON.stringify({ ...actual, headers }, null, 2) + '\n'
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(file, 'utf8') !== expected) {
      stale = true
      console.error(`${filename} is stale; run pnpm run sync:deployment`)
    }
  } else fs.writeFileSync(file, expected)
}
if (stale) process.exitCode = 1
else console.log('[deployment] Registry Remote paths and cache headers are in sync')
