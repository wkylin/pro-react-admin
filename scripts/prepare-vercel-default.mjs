import fs from 'node:fs'
import path from 'node:path'
import { resolveProject, workspaceRoot } from '../config/project-registry.mjs'

const project = resolveProject('default')
const versionFile = path.join(project.output, 'version.json')
if (!fs.existsSync(path.join(project.output, 'index.html')) || !fs.existsSync(versionFile)) {
  throw new Error('Build the default application before preparing Vercel output')
}
const version = JSON.parse(fs.readFileSync(versionFile, 'utf8'))
if (version.project !== project.name) throw new Error('Expected a default application build')

const output = path.join(workspaceRoot, '.vercel/output')
const functionDir = path.join(output, 'functions/api/github.func')
fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(path.join(functionDir, 'api'), { recursive: true })
fs.mkdirSync(path.join(functionDir, 'server'), { recursive: true })
fs.cpSync(project.output, path.join(output, 'static'), { recursive: true })
fs.copyFileSync(path.join(workspaceRoot, 'api/github.js'), path.join(functionDir, 'api/github.js'))
fs.copyFileSync(path.join(workspaceRoot, 'server/github-oauth.cjs'), path.join(functionDir, 'server/github-oauth.cjs'))
fs.writeFileSync(
  path.join(functionDir, '.vc-config.json'),
  JSON.stringify({ runtime: 'nodejs24.x', handler: 'api/github.js', launcherType: 'Nodejs' }, null, 2) + '\n'
)

const actions = ['config', 'start', 'callback', 'session']
const headers = JSON.parse(fs.readFileSync(path.join(workspaceRoot, 'vercel.json'), 'utf8')).headers || []
const routes = [
  ...actions.map((action) => ({
    src: `^/api/demo/github/${action}$`,
    dest: `/api/github?oauth_action=${action}`,
  })),
  { src: '^/api/.*', dest: '/api/github?oauth_action=not_found' },
  ...headers.map(({ source, headers: entries }) => ({
    src: source,
    headers: Object.fromEntries(entries.map(({ key, value }) => [key, value])),
    continue: true,
  })),
  { handle: 'filesystem' },
  { src: '/.*', dest: '/index.html' },
]
fs.writeFileSync(path.join(output, 'config.json'), JSON.stringify({ version: 3, routes }, null, 2) + '\n')
console.log(`[vercel] Prepared default ${version.version} with one GitHub OAuth function in .vercel/output`)
