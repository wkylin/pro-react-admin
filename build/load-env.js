import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

export function readWorkspaceEnv(mode, root) {
  if (!/^[a-z][a-z0-9_-]*$/i.test(mode)) throw new Error(`Invalid environment mode: ${mode}`)

  const values = {}
  for (const file of ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]) {
    const filename = path.join(root, file)
    if (fs.existsSync(filename)) Object.assign(values, dotenv.parse(fs.readFileSync(filename)))
  }
  return values
}

export function applyWorkspaceEnv(mode, root, target = process.env, skipKeys = new Set()) {
  const values = readWorkspaceEnv(mode, root)
  for (const [key, value] of Object.entries(values)) {
    if (!(key in target) && !skipKeys.has(key)) target[key] = value
  }
  return target
}
