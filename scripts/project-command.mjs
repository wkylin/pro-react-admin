import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const [action, projectName = 'default'] = process.argv.slice(2)
const project = registry.projects[projectName]
const remote = (registry.remotes || []).find(({ name }) => name === projectName)

if (!project) throw new Error(`Unknown project "${projectName}". Registered projects: ${Object.keys(registry.projects).join(', ')}`)
if (!['dev', 'build', 'mfe-dev', 'mfe-build', 'mfe-build-standalone'].includes(action)) {
  throw new Error('Usage: project-command.mjs <dev|build|mfe-dev|mfe-build|mfe-build-standalone> <project>')
}
if (action.startsWith('mfe-') && projectName !== 'shell' && (!project.mfeExpose || !remote)) {
  throw new Error(`Project "${projectName}" is not registered as a Module Federation Remote`)
}

const isDev = action === 'dev' || action === 'mfe-dev'
const isMfe = action.startsWith('mfe-')
const isStandalone = action === 'mfe-build-standalone'
const env = {
  ...process.env,
  PROJECT: projectName,
  BUILD_GOAL: isDev ? 'development' : 'production',
  NODE_ENV: isDev ? 'development' : 'production',
  NODE_OPTIONS: process.env.NODE_OPTIONS || '--trace-deprecation',
  SENTRY_SOURCE_MAP: isMfe ? 'no' : isDev ? 'no' : 'map',
}

if (!isMfe) delete env.MFE_ROLE
if (action === 'mfe-dev') {
  if (projectName === 'shell') {
    env.MFE_ROLE = 'host'
    env.PORT = env.PORT || '8080'
    for (const item of registry.remotes || []) env[item.envKey] = item.devUrl
  } else {
    env.MFE_ROLE = 'remote'
    env.PORT = env.PORT || String(remote.devPort)
  }
} else if (isMfe) {
  env.MFE_ROLE = projectName === 'shell' ? 'host' : 'remote'
  env.PUBLIC_URL = projectName === 'shell' || isStandalone ? '/' : remote.prodPath.replace(/remoteEntry\.js$/, '')
}

const args = ['exec', 'webpack', ...(isDev ? ['serve'] : []), '--config', isDev ? './webpack/webpack.dev.js' : './webpack/webpack.prod.js', '--stats-error-details']
const child = spawn('pnpm', args, { cwd: root, env, stdio: 'inherit', shell: process.platform === 'win32' })
child.on('error', (error) => {
  console.error(`[project-command] Could not start webpack: ${error.message}`)
  process.exitCode = 1
})
child.on('exit', (code, signal) => {
  process.exitCode = signal ? 1 : code ?? 1
})
