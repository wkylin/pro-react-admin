import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import {
  hasCompleteMfeSharedDependencies,
  MFE_MANIFEST_SCHEMA_VERSION,
  getMfeSharedDependencies,
} from '../config/mfe-contract.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const mfeProtocol = JSON.parse(fs.readFileSync(path.join(root, 'config/mfe-protocol.json'), 'utf8'))
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const sharedDependencies = getMfeSharedDependencies({
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
})
const outputDir = path.join(root, 'dist-vercel')
const shellIndex = path.join(outputDir, 'index.html')
const metadataPath = path.join(outputDir, 'build-metadata.json')
const bundler = fs.existsSync(metadataPath)
  ? JSON.parse(fs.readFileSync(metadataPath, 'utf8')).bundler
  : process.env.BUILD_TOOL || 'webpack'

if (!fs.existsSync(shellIndex)) throw new Error('Missing Shell entry: dist-vercel/index.html')
if (!['webpack', 'vite'].includes(bundler)) throw new Error(`Unknown MFE artifact bundler: ${bundler}`)

for (const remote of registry.remotes) {
  const remoteDir = path.join(outputDir, path.posix.dirname(remote.prodPath).slice(1))
  const manifestPath = path.join(remoteDir, 'remote-manifest.json')
  const entryPath = path.join(remoteDir, 'remoteEntry.js')
  if (!fs.existsSync(entryPath)) throw new Error(`Missing Remote entry: dist-vercel/${remote.name}/remoteEntry.js`)
  if (!fs.existsSync(manifestPath))
    throw new Error(`Missing Remote manifest: dist-vercel/${remote.name}/remote-manifest.json`)

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const expectedExpose = registry.projects[remote.name]?.mfeExpose
  if (
    manifest.schemaVersion !== MFE_MANIFEST_SCHEMA_VERSION ||
    manifest.name !== remote.name ||
    manifest.protocolVersion !== mfeProtocol.protocolVersion ||
    manifest.exposes?.['./App'] !== expectedExpose ||
    !hasCompleteMfeSharedDependencies(manifest.sharedDependencies, sharedDependencies)
  ) {
    throw new Error(`Remote contract mismatch in dist-vercel/${remote.name}/remote-manifest.json`)
  }

  if (bundler === 'vite') {
    const { validateRemoteEntry } = await import('../build/validate-remote-entry.mjs')
    await validateRemoteEntry(entryPath)
  } else {
    // A Host loads only remoteEntry.js; evaluate its startup without app/vendor scripts.
    const entryUrl = `https://mfe.example/${remote.name}/remoteEntry.js`
    const sandbox = {
      document: { currentScript: { src: entryUrl, tagName: 'SCRIPT' }, baseURI: 'https://mfe.example/' },
      URL,
      setTimeout,
      clearTimeout,
    }
    sandbox.window = sandbox
    sandbox.self = sandbox
    vm.runInNewContext(fs.readFileSync(entryPath, 'utf8'), sandbox, { timeout: 5000, filename: entryPath })
    const container = sandbox[remote.name]
    if (typeof container?.get !== 'function' || typeof container?.init !== 'function') {
      throw new Error(`Remote container ${remote.name} is not available after loading remoteEntry.js alone`)
    }
  }
}

process.stdout.write(
  `[mfe-artifacts] Shell and ${registry.remotes.length} Remote manifests match protocol v${mfeProtocol.protocolVersion}\n`
)
