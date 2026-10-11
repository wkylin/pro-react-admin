import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import concurrently from 'concurrently'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const providedEnvKeys = new Set(Object.keys(process.env))

// Share the same local configuration between the API and Webpack processes.
for (const fileName of ['.env.development', '.env.development.local']) {
  const filePath = path.join(root, fileName)
  if (!fs.existsSync(filePath)) continue

  const values = dotenv.parse(fs.readFileSync(filePath))
  for (const [key, value] of Object.entries(values)) {
    if (!providedEnvKeys.has(key)) process.env[key] = value
  }
}

process.env.NODE_ENV = 'development'
process.env.TRACKING_STORE ||= 'memory'
process.env.TRACKING_API_PORT ||= '5200'
process.env.TRACKING_API_TARGET ||= `http://127.0.0.1:${process.env.TRACKING_API_PORT}`
process.env.TRACKING_ADMIN_TOKEN ||= crypto.randomBytes(32).toString('hex')

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
