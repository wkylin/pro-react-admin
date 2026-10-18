import fs from 'node:fs'
import path from 'node:path'
import { log } from 'node:console'
import { resolveProject, workspaceRoot } from '../config/project-registry.mjs'

const project = resolveProject('enterprise')
if (!fs.existsSync(path.join(project.output, 'index.html'))) {
  throw new Error('Build enterprise before preparing Vercel output')
}
const version = JSON.parse(fs.readFileSync(path.join(project.output, 'version.json'), 'utf8'))
if (version.project !== project.name) throw new Error('Expected an enterprise build')

// Build Output API uploads only these static files, never the root api/ sources.
// Keep project linkage and downloaded environment files outside output untouched.
const output = path.join(workspaceRoot, '.vercel/output')
fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })
fs.cpSync(project.output, path.join(output, 'static'), { recursive: true })
fs.writeFileSync(
  path.join(output, 'config.json'),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: '/.*',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
          continue: true,
        },
        {
          src: '/assets/.*',
          headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
          continue: true,
        },
        { handle: 'filesystem' },
      ],
    },
    null,
    2
  ) + '\n'
)
log(`[vercel] Prepared enterprise ${version.version} in .vercel/output (static frontend only)`)
