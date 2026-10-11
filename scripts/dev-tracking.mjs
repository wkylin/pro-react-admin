import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

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

const child = spawn(
  'pnpm',
  [
    'exec',
    'concurrently',
    '-k',
    '-n',
    'api,web',
    '-c',
    'cyan,green',
    'pnpm --filter api dev',
    'pnpm run start:web',
  ],
  {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  }
)

child.on('error', (error) => {
  console.error(`[dev:tracking] Could not start local services: ${error.message}`)
  process.exitCode = 1
})

child.on('exit', (code, signal) => {
  process.exitCode = signal ? 1 : (code ?? 1)
})
