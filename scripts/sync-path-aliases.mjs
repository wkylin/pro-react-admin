import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(root, 'config/path-aliases.json')
const generatedPath = path.join(root, 'tsconfig.paths.json')
const aliases = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

for (const [alias, target] of Object.entries(aliases)) {
  const absolute = path.resolve(root, target)
  if (!absolute.startsWith(root + path.sep) || !fs.existsSync(absolute)) {
    throw new Error(`[path-aliases] ${alias} points to a missing or out-of-repository path: ${target}`)
  }
}

const paths = Object.fromEntries(
  Object.entries(aliases).flatMap(([alias, target]) => [
    [alias, [`./${target}`]],
    [`${alias}/*`, [`./${target}/*`]],
  ])
)

const generated = `${JSON.stringify({ compilerOptions: { paths } }, null, 2)}\n`
const checkOnly = process.argv.includes('--check')

if (checkOnly) {
  const current = fs.existsSync(generatedPath) ? fs.readFileSync(generatedPath, 'utf8') : ''
  if (current !== generated) {
    console.error('[path-aliases] tsconfig.paths.json is stale. Run: pnpm run sync:aliases')
    process.exitCode = 1
  } else {
    console.log('[path-aliases] TypeScript aliases match config/path-aliases.json')
  }
} else {
  fs.writeFileSync(generatedPath, generated)
  console.log('[path-aliases] Generated tsconfig.paths.json')
}
