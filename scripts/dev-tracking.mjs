import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import concurrently from 'concurrently'
import portfinder from 'portfinder'
import { applyWorkspaceEnv } from '../build/load-env.js'
import { prepareLocalEnterpriseDemo } from './enterprise-demo.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const enterpriseProject = process.env.PROJECT === 'enterprise'

// Enterprise uses the tenant-backed login by default; browser-only mock remains opt-in.
applyWorkspaceEnv('development', root, process.env, enterpriseProject ? new Set(['REACT_APP_USE_MOCK']) : new Set())

process.env.NODE_ENV = 'development'
process.env.TRACKING_STORE ||= 'memory'
if (enterpriseProject) {
  process.env.REACT_APP_USE_MOCK ??= 'false'
  process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO = 'false'
  if (process.env.REACT_APP_USE_MOCK !== 'true' && !process.env.APP_BASE_URL && !process.env.ENTERPRISE_API_TARGET)
    process.env.ENTERPRISE_ENABLED = 'true'
}
const requestedApiPort = Number(process.env.TRACKING_API_PORT || 5200)
if (!Number.isInteger(requestedApiPort) || requestedApiPort < 1 || requestedApiPort > 65535) {
  throw new Error('TRACKING_API_PORT must be an integer between 1 and 65535')
}
const apiPort = await portfinder.getPortPromise({ port: requestedApiPort, stopPort: 65535, host: '127.0.0.1' })
process.env.TRACKING_API_PORT = String(apiPort)
process.env.TRACKING_API_TARGET ||= `http://127.0.0.1:${process.env.TRACKING_API_PORT}`
process.env.TRACKING_ADMIN_TOKEN ||= crypto.randomBytes(32).toString('hex')
if (apiPort !== requestedApiPort) console.log(`API port ${requestedApiPort} is in use; using ${apiPort} instead.`)
if (enterpriseProject && process.env.ENTERPRISE_ENABLED === 'true') {
  const demo = await prepareLocalEnterpriseDemo(root, process.env)
  if (demo)
    console.log(
      `Local Enterprise demo: tenant=${demo.account.tenantId}, email=${demo.account.email}, password=${demo.account.password}; SQLite=${demo.databasePath}`
    )
}
if (enterpriseProject) {
  const requestedWebPort = Number(process.env.PORT || 8080)
  if (!Number.isInteger(requestedWebPort) || requestedWebPort < 1 || requestedWebPort > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535')
  }
  const availablePort = (port) => portfinder.getPortPromise({ port, stopPort: 65535, host: '127.0.0.1' })
  let webPort = await availablePort(requestedWebPort)
  if (webPort === apiPort) {
    if (webPort === 65535) throw new Error('No free web port remains after the selected API port')
    webPort = await availablePort(webPort + 1)
  }
  process.env.PORT = String(webPort)
  if (webPort !== requestedWebPort) console.log(`Web port ${requestedWebPort} is in use; using ${webPort} instead.`)
  console.log(`Open Enterprise: http://localhost:${webPort}/#/signin (API: http://127.0.0.1:${apiPort})`)
}

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
