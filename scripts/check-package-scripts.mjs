import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scripts = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).scripts
const names = new Set(Object.keys(scripts))
const issues = []
const results = []
const graph = new Map()

const localFilePattern = /\b(?:scripts|tests|api|build|config)\/[\w./*-]+\.(?:[cm]?js|ts|json)\b/g
const rootConfigPattern = /\btsconfig[\w.-]*\.json\b/g
const scriptReferencePattern = /\b(?:pnpm|npm)\s+run\s+([a-zA-Z0-9:_-]+)/g

for (const [name, command] of Object.entries(scripts)) {
  const errors = []
  const syntax = spawnSync('sh', ['-n', '-c', command], { cwd: root, encoding: 'utf8' })
  if (syntax.status !== 0) errors.push(`shell syntax: ${syntax.stderr.trim()}`)

  const references = [...command.matchAll(scriptReferencePattern)].map((match) => match[1])
  graph.set(name, references)
  for (const reference of references) {
    if (!names.has(reference)) errors.push(`missing script: ${reference}`)
  }

  for (const match of command.matchAll(localFilePattern)) {
    const filename = match[0]
    if (!globSync(filename, { cwd: root, nodir: true }).length) errors.push(`missing file: ${filename}`)
  }
  for (const match of command.matchAll(rootConfigPattern)) {
    if (!fs.existsSync(path.join(root, match[0]))) errors.push(`missing config: ${match[0]}`)
  }
  for (const match of command.matchAll(/(?:--config(?:=|\s+)|-c\s+)([^\s]+)/g)) {
    const filename = match[1].replace(/^["']|["']$/g, '')
    if (!fs.existsSync(path.join(root, filename))) errors.push(`missing config: ${filename}`)
  }

  for (const segment of command.split(/&&|\|\||;/)) {
    const words = segment.trim().match(/(?:"[^"]*"|'[^']*'|\S)+/g) || []
    while (words[0] === 'cross-env' || /^[A-Za-z_][A-Za-z_0-9]*=/.test(words[0] || '')) words.shift()
    const executable = words[0] === 'pnpm' && words[1] === 'exec' ? words[2] : words[0]
    if (!executable || ['cd', 'node', 'pnpm', 'npm', 'git'].includes(executable)) continue
    if (!fs.existsSync(path.join(root, 'node_modules/.bin', executable))) errors.push(`missing binary: ${executable}`)
  }

  if (errors.length) issues.push(...errors.map((error) => `${name}: ${error}`))
  results.push({ name, status: errors.length ? 'failed' : 'static-pass', references, errors })
}

const visiting = new Set()
const visited = new Set()
const visit = (name) => {
  if (visiting.has(name)) {
    issues.push(`${name}: cyclic script reference`)
    return
  }
  if (visited.has(name)) return
  visiting.add(name)
  for (const reference of graph.get(name) || []) if (names.has(reference)) visit(reference)
  visiting.delete(name)
  visited.add(name)
}
for (const name of names) visit(name)

if (process.argv.includes('--report')) {
  const filename = path.join(root, 'artifacts/scripts/validation.json')
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(
    filename,
    JSON.stringify({ checkedAt: new Date().toISOString(), scripts: results, issues }, null, 2) + '\n'
  )
  console.log(`[scripts] report: ${path.relative(root, filename)}`)
}

if (issues.length) {
  for (const issue of issues) console.error(`[scripts] ${issue}`)
  process.exitCode = 1
} else {
  console.log(`[scripts] ${results.length} scripts passed syntax, local file, binary and reference checks.`)
}
