import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const outputDir = path.join(root, 'dist-vercel')
const shellIndex = path.join(outputDir, 'index.html')

if (!fs.existsSync(shellIndex)) throw new Error('Missing Shell entry: dist-vercel/index.html')

for (const remote of registry.remotes) {
  const remoteDir = path.join(outputDir, remote.name)
  const manifestPath = path.join(remoteDir, 'remote-manifest.json')
  const entryPath = path.join(remoteDir, 'remoteEntry.js')
  if (!fs.existsSync(entryPath)) throw new Error(`Missing Remote entry: dist-vercel/${remote.name}/remoteEntry.js`)
  if (!fs.existsSync(manifestPath)) throw new Error(`Missing Remote manifest: dist-vercel/${remote.name}/remote-manifest.json`)

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const expectedExpose = registry.projects[remote.name]?.mfeExpose
  if (
    manifest.schemaVersion !== 1 ||
    manifest.name !== remote.name ||
    manifest.protocolVersion !== registry.mfeProtocolVersion ||
    manifest.exposes?.['./App'] !== expectedExpose
  ) {
    throw new Error(`Remote contract mismatch in dist-vercel/${remote.name}/remote-manifest.json`)
  }
}

console.log(`[mfe-artifacts] Shell and ${registry.remotes.length} Remote manifests match protocol v${registry.mfeProtocolVersion}`)
