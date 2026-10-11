import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import {
  hasCompleteMfeSharedDependencies,
  MFE_MANIFEST_SCHEMA_VERSION,
  getMfeSharedDependencies,
} from '../config/mfe-contract.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const sharedDependencies = getMfeSharedDependencies({
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
})
const outputDir = path.join(root, 'dist-vercel')
const shellIndex = path.join(outputDir, 'index.html')

if (!fs.existsSync(shellIndex)) throw new Error('Missing Shell entry: dist-vercel/index.html')

for (const remote of registry.remotes) {
  const remoteDir = path.join(outputDir, remote.name)
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
    manifest.protocolVersion !== registry.mfeProtocolVersion ||
    manifest.exposes?.['./App'] !== expectedExpose ||
    !hasCompleteMfeSharedDependencies(manifest.sharedDependencies, sharedDependencies)
  ) {
    throw new Error(`Remote contract mismatch in dist-vercel/${remote.name}/remote-manifest.json`)
  }
}

process.stdout.write(
  `[mfe-artifacts] Shell and ${registry.remotes.length} Remote manifests match protocol v${registry.mfeProtocolVersion}\n`
)
