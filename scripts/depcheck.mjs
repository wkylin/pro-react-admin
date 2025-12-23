import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const fs = require('node:fs')
const path = require('node:path')

let depcheck
try {
  depcheck = require('depcheck')
} catch (e) {
  console.error('[depcheck] not installed. Run: npm i -D depcheck')
  process.exit(2)
}

const cwd = process.cwd()

const readPackageJson = () => {
  try {
    const raw = fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

const pkg = readPackageJson()

// depcheck doesn't reliably detect dependencies that are only used in npm scripts.
// Build a set of package names referenced in scripts/husky/lint-staged commands.
const buildScriptDeps = () => {
  const scriptDeps = new Set()
  if (!pkg) return scriptDeps

  const buckets = []

  const scripts = pkg?.scripts && typeof pkg.scripts === 'object' ? Object.values(pkg.scripts) : []
  buckets.push(...scripts)

  const huskyHooks = pkg?.husky?.hooks && typeof pkg.husky.hooks === 'object' ? Object.values(pkg.husky.hooks) : []
  buckets.push(...huskyHooks)

  const lintStaged =
    pkg?.['lint-staged'] && typeof pkg['lint-staged'] === 'object' ? Object.values(pkg['lint-staged']) : []
  for (const v of lintStaged) {
    if (Array.isArray(v)) buckets.push(...v)
    else buckets.push(v)
  }

  const text = buckets.filter((x) => typeof x === 'string').join('\n')
  if (!text) return scriptDeps

  // Some CLIs are invoked via a different package name than the underlying dependency.
  // Example: `webpack` command requires `webpack-cli` to be installed.
  const implied = new Set()
  if (/(^|\s)webpack(\s|$)/m.test(text)) implied.add('webpack-cli')
  // If we run Jest, TypeScript needs its globals (describe/test/expect/jest).
  if (/(^|\s)jest(\s|$)/m.test(text)) implied.add('@types/jest')

  const depNames = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {})
  ]

  for (const name of depNames) {
    // Heuristic: match whole token-ish occurrences to avoid substring collisions.
    const re = new RegExp(`(^|[^\\w@/-])${name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}(?=($|[^\\w@/-]))`, 'm')
    if (re.test(text)) scriptDeps.add(name)
  }

  for (const name of implied) {
    if (depNames.includes(name)) scriptDeps.add(name)
  }

  return scriptDeps
}

const scriptDeps = buildScriptDeps()

const walkFiles = (dir, out, depth = 0) => {
  if (depth > 6) return
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch (e) {
    return
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === 'dist-lib') continue
      walkFiles(full, out, depth + 1)
    } else if (ent.isFile()) {
      out.push(full)
    }
  }
}

const readIfExists = (p) => {
  try {
    if (!fs.existsSync(p)) return ''
    return fs.readFileSync(p, 'utf8')
  } catch (e) {
    return ''
  }
}

const buildConfigDeps = () => {
  const configDeps = new Set()
  if (!pkg) return configDeps

  const depNames = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {})
  ]

  const files = []
  // Common config entry points
  files.push(path.join(cwd, 'babel.config.js'))
  files.push(path.join(cwd, 'jest.config.cjs'))
  files.push(path.join(cwd, 'eslint.config.mjs'))
  files.push(path.join(cwd, 'vite.config.ts'))
  files.push(path.join(cwd, 'vite.config.lib.ts'))
  files.push(path.join(cwd, 'vite.config.lib.entries.ts'))
  files.push(path.join(cwd, 'postcss.config.js'))

  // Directories with build/storybook config
  walkFiles(path.join(cwd, '.storybook'), files)
  walkFiles(path.join(cwd, 'webpack'), files)
  walkFiles(path.join(cwd, 'scripts'), files)

  const text = files
    .filter((f) => /\.(cjs|mjs|js|ts|tsx|jsx|json)$/i.test(f))
    .map((f) => readIfExists(f))
    .filter(Boolean)
    .join('\n')

  if (!text) return configDeps

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Babel allows shorthand plugin/preset names in config.
  // Example: 'transform-remove-console' refers to 'babel-plugin-transform-remove-console'.
  const buildNameVariants = (name) => {
    const variants = new Set([name])

    if (name.startsWith('babel-plugin-')) variants.add(name.slice('babel-plugin-'.length))
    if (name.startsWith('babel-preset-')) variants.add(name.slice('babel-preset-'.length))

    if (name.startsWith('@babel/plugin-')) variants.add(name.slice('@babel/plugin-'.length))
    if (name.startsWith('@babel/preset-')) variants.add(name.slice('@babel/preset-'.length))

    return [...variants]
  }

  for (const name of depNames) {
    const variants = buildNameVariants(name)
    for (const v of variants) {
      const re = new RegExp(`(^|[^\\w@/-])${escapeRe(v)}(?=($|[^\\w@/-]))`, 'm')
      if (re.test(text)) {
        configDeps.add(name)
        break
      }
    }
  }

  return configDeps
}

const configDeps = buildConfigDeps()
const usedByMeta = new Set([...scriptDeps, ...configDeps])

// Some packages are indirectly required by bundled dependencies, but are not imported by our code.
// Example: framer-motion's CJS bundle can require @emotion/is-prop-valid.
if (pkg?.dependencies?.['framer-motion']) usedByMeta.add('@emotion/is-prop-valid')

// image-minimizer-webpack-plugin dynamically requires `sharp`.
if (pkg?.devDependencies?.['image-minimizer-webpack-plugin'] || pkg?.dependencies?.['image-minimizer-webpack-plugin']) {
  usedByMeta.add('sharp')
}

const report = await new Promise((resolve, reject) => {
  depcheck(
    cwd,
    {
      ignoreDirs: [
        'node_modules',
        'dist',
        'dist-lib',
        'dist-vite',
        'storybook-static',
        'coverage',
        'playwright-report',
        'test-results'
      ],
      // Avoid the ttypescript special (it reads tsconfig.json as strict JSON and can fail on JSONC).
      specials: [
        depcheck.special.bin,
        depcheck.special.babel,
        depcheck.special.eslint,
        depcheck.special.jest,
        depcheck.special.webpack,
        depcheck.special.husky,
        depcheck.special.prettier,
        depcheck.special.commitizen
      ]
    },
    (unused) => resolve(unused)
  )
})

const picked = {}
const ignoreMissingPrefixes = [
  '@src/',
  '@pages/',
  '@stateless/',
  '@stateful/',
  '@hooks/',
  '@utils/',
  '@assets/',
  '@app-hooks/',
  '@container/',
  '@theme/'
]

const pickArray = (key) => {
  const arr = report?.[key]
  if (!Array.isArray(arr) || arr.length === 0) return

  // Filter out deps that are referenced from package.json scripts/config files (common false positives).
  const filtered = arr.filter((name) => !usedByMeta.has(name))
  if (filtered.length > 0) picked[key] = filtered
}
const pickObject = (key) => {
  const obj = report?.[key]
  if (obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length > 0) picked[key] = obj
}

const pickMissing = () => {
  const missing = report?.missing
  if (!missing || typeof missing !== 'object' || Array.isArray(missing)) return

  const filtered = {}
  for (const [depName, files] of Object.entries(missing)) {
    if (ignoreMissingPrefixes.some((p) => depName.startsWith(p))) continue
    filtered[depName] = files
  }

  if (Object.keys(filtered).length > 0) picked.missing = filtered
}

pickArray('dependencies')
pickArray('devDependencies')
pickMissing()
pickObject('invalidFiles')
pickObject('invalidDirs')

if (Object.keys(picked).length === 0) {
  console.log('依赖全干净！')
  process.exit(0)
}

const maxItems = (() => {
  const idx = process.argv.indexOf('--max')
  if (idx >= 0) {
    const n = Number(process.argv[idx + 1])
    if (Number.isFinite(n) && n > 0) return Math.floor(n)
  }
  return 40
})()

const full = process.argv.includes('--full')

if (full) {
  console.log(JSON.stringify(picked, null, 2))
  process.exit(1)
}

// Default: print a concise summary to avoid flooding terminals/CI logs.
const summarize = (val) => {
  if (Array.isArray(val)) {
    return { count: val.length, items: val.slice(0, maxItems) }
  }
  if (val && typeof val === 'object') {
    const keys = Object.keys(val)
    return { count: keys.length, keys: keys.slice(0, maxItems) }
  }
  return val
}

const summary = {}
for (const [k, v] of Object.entries(picked)) summary[k] = summarize(v)
console.log(JSON.stringify(summary, null, 2))
console.log('\n提示：使用 `npm run depcheck -- --full` 输出完整列表')
process.exit(1)
