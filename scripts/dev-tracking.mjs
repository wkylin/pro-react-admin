import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import concurrently from 'concurrently'
import portfinder from 'portfinder'
import { applyWorkspaceEnv } from '../build/load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const enterpriseProject = process.env.PROJECT === 'enterprise'

// Enterprise uses real tenant sign-in by default; demo mode must be explicit.
applyWorkspaceEnv('development', root, process.env, enterpriseProject ? new Set(['REACT_APP_USE_MOCK']) : new Set())

process.env.NODE_ENV = 'development'
process.env.TRACKING_STORE ||= 'memory'
const requestedApiPort = Number(process.env.TRACKING_API_PORT || 5200)
if (!Number.isInteger(requestedApiPort) || requestedApiPort < 1 || requestedApiPort > 65535) {
  throw new Error('TRACKING_API_PORT must be an integer between 1 and 65535')
}
const apiPort = await portfinder.getPortPromise({ port: requestedApiPort, stopPort: 65535, host: '127.0.0.1' })
process.env.TRACKING_API_PORT = String(apiPort)
process.env.TRACKING_API_TARGET ||= `http://127.0.0.1:${process.env.TRACKING_API_PORT}`
process.env.TRACKING_ADMIN_TOKEN ||= crypto.randomBytes(32).toString('hex')
if (apiPort !== requestedApiPort) console.log(`API port ${requestedApiPort} is in use; using ${apiPort} instead.`)

const { result } = concurrently(
  [
    { command: `"${process.execPath}" --watch api/server.js`, name: 'api', prefixColor: 'cyan' },
    // Let Webpack inherit the terminal so WebpackBar can redraw one live progress bar.
    { command: `"${process.execPath}" scripts/project-command.mjs dev`, name: 'web', raw: true },
  ],
  {
    cwd: root,
    killOthersOn: ['success', 'failure'],
  }
)

result.then(
  () => {
    process.exitCode = 0
  },
  () => {
    process.exitCode = 1
  }
)
