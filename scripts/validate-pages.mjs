import fs from 'node:fs'
import path from 'node:path'
import { setTimeout, clearTimeout } from 'node:timers'
import vm from 'node:vm'
import { log } from 'node:console'
import { URL } from 'node:url'
import { loadProjectRegistry } from '../config/project-registry.mjs'
import { getPagesEntryBundler } from '../config/pages-plan.mjs'
import {
  MFE_MANIFEST_SCHEMA_VERSION,
  getMfeSharedDependencies,
  hasCompleteMfeSharedDependencies,
} from '../config/mfe-contract.mjs'

const output = 'dist-combined'
const deployment = JSON.parse(fs.readFileSync(path.join(output, 'deployment.json'), 'utf8'))
const registry = loadProjectRegistry()
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const shared = getMfeSharedDependencies(pkg.dependencies)
const protocol = JSON.parse(fs.readFileSync('config/mfe-protocol.json', 'utf8'))
for (const entry of deployment.entries) {
  const bundler = getPagesEntryBundler(entry, deployment)
  const directory = path.join(output, entry.destination)
  const html = fs.readFileSync(path.join(directory, 'index.html'), 'utf8')
  const expectedBase = deployment.base + (entry.destination ? entry.destination + '/' : '')
  if (entry.name === 'storybook') {
    for (const filename of ['index.html', 'iframe.html']) {
      const page = fs.readFileSync(path.join(directory, filename), 'utf8')
      if (!page.includes(`<base href="${expectedBase}">`)) throw new Error(`Wrong Storybook base in ${filename}`)
    }
    continue
  }
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = new URL(match[1], deployment.origin + expectedBase)
    if (url.origin !== deployment.origin || !url.pathname.startsWith(deployment.base)) continue
    const relative = decodeURIComponent(url.pathname.slice(deployment.base.length))
    if (!fs.existsSync(path.join(output, relative))) throw new Error(`Missing ${entry.name} asset: ${url.pathname}`)
  }
  const remote = registry.remotes.find(({ name }) => entry.action === 'mfe-build' && name === entry.name)
  if (remote) {
    const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'remote-manifest.json'), 'utf8'))
    if (
      manifest.name !== remote.name ||
      manifest.version !== pkg.version ||
      manifest.schemaVersion !== MFE_MANIFEST_SCHEMA_VERSION ||
      manifest.protocolVersion !== protocol.protocolVersion ||
      !hasCompleteMfeSharedDependencies(manifest.sharedDependencies, shared)
    )
      throw new Error(`Invalid Pages Remote manifest: ${remote.name}`)
    if (bundler === 'vite') {
      const { validateRemoteEntry } = await import('../build/validate-remote-entry.mjs')
      await validateRemoteEntry(path.join(directory, 'remoteEntry.js'))
    } else {
      const url = deployment.origin + expectedBase + 'remoteEntry.js'
      const sandbox = {
        document: { currentScript: { src: url, tagName: 'SCRIPT' }, baseURI: deployment.origin + expectedBase },
        URL,
        setTimeout,
        clearTimeout,
      }
      sandbox.window = sandbox
      sandbox.self = sandbox
      vm.runInNewContext(fs.readFileSync(path.join(directory, 'remoteEntry.js'), 'utf8'), sandbox, { timeout: 5000 })
      if (typeof sandbox[remote.name]?.get !== 'function' || typeof sandbox[remote.name]?.init !== 'function')
        throw new Error(`Missing Pages Remote container: ${remote.name}`)
    }
  }
  if (registry.projects[entry.name]?.mfeHost) {
    const scripts = path.join(directory, bundler === 'vite' ? 'assets' : 'static/js')
    const code = fs
      .readdirSync(scripts)
      .filter((file) => file.endsWith('.js'))
      .map((file) => fs.readFileSync(path.join(scripts, file), 'utf8'))
      .join('\n')
    for (const remote of registry.remotes) {
      const expected = deployment.origin + expectedBase.slice(0, -1) + remote.prodPath
      if (!code.includes(expected)) throw new Error(`Pages Host does not reference ${expected}`)
    }
  }
}
log(`[pages] ${deployment.entries.length} entries have valid HTML assets, Storybook bases and federation contracts`)
