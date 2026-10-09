import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(rootDir, 'config/path-aliases.json')

export const pathAliasManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

export function createPathAliases(root = rootDir, overrides = {}) {
  return Object.fromEntries(
    Object.entries({ ...pathAliasManifest, ...overrides }).map(([alias, target]) => [alias, path.resolve(root, target)])
  )
}
