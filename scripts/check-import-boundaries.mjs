import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(root, 'src')
const packageSourceRoot = path.join(root, 'packages/wui-react/src')
const aliases = JSON.parse(fs.readFileSync(path.join(root, 'config/path-aliases.json'), 'utf8'))
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'])
const layerRules = [
  {
    name: 'shared',
    directory: path.join(sourceRoot, 'shared'),
    forbiddenTargetPrefixes: [
      'src/app/',
      'src/app-hooks/',
      'src/components/',
      'src/features/',
      'src/layouts/',
      'src/pages/',
      'src/platform/',
      'src/projects/',
      'src/routers/',
    ],
  },
  {
    name: 'platform',
    directory: path.join(sourceRoot, 'platform'),
    forbiddenTargetPrefixes: [
      'src/app/',
      'src/app-hooks/',
      'src/components/',
      'src/features/',
      'src/layouts/',
      'src/pages/',
      'src/projects/',
      'src/routers/',
    ],
  },
  {
    name: 'wui-react package',
    directory: packageSourceRoot,
    forbiddenTargetPrefixes: ['src/'],
  },
]
const importPattern =
  /(?:^|\n)\s*(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\sfrom\s*)?['"]([^'"]+)['"]|\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)
    return entry.isDirectory() ? collectFiles(absolutePath) : [absolutePath]
  })
}

function resolveLocalImport(specifier, importerPath) {
  if (specifier.startsWith('.')) return path.resolve(path.dirname(importerPath), specifier)

  const matchingAlias = Object.entries(aliases)
    .sort(([left], [right]) => right.length - left.length)
    .find(([alias]) => specifier === alias || specifier.startsWith(`${alias}/`))

  if (!matchingAlias) return null

  const [alias, target] = matchingAlias
  const suffix = specifier === alias ? '' : specifier.slice(alias.length + 1)
  return path.resolve(root, target, suffix)
}

const violations = []

for (const rule of layerRules) {
  const layerFiles = collectFiles(rule.directory).filter((filePath) => sourceExtensions.has(path.extname(filePath)))
  for (const importerPath of layerFiles) {
    const source = fs.readFileSync(importerPath, 'utf8')
    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] || match[2]
      const targetPath = resolveLocalImport(specifier, importerPath)
      if (!targetPath) continue

      const relativeTarget = `${path.relative(root, targetPath).split(path.sep).join('/')}/`
      const forbiddenPrefix = rule.forbiddenTargetPrefixes.find((prefix) => relativeTarget.startsWith(prefix))
      if (forbiddenPrefix) {
        violations.push({ importerPath, specifier, forbiddenPrefix, layer: rule.name })
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`[import-boundaries] Found ${violations.length} forbidden layer import(s):`)
  for (const violation of violations) {
    console.error(
      `  - ${path.relative(root, violation.importerPath)} (${violation.layer}) imports "${violation.specifier}" (target ${violation.forbiddenPrefix} is outside this layer's contract)`
    )
  }
  process.exitCode = 1
} else {
  const checkedLayers = layerRules.map((rule) => rule.name).join(', ')
  console.log(`[import-boundaries] ${checkedLayers} source layers respect package and dependency boundaries.`)
}
