import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scripts = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).scripts
const collect = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['node_modules', 'dist', '.git', '.delta'].includes(entry.name)) return []
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? collect(file) : /\.(md|mdx)$/.test(entry.name) ? [file] : []
  })
const files = [
  ...collect(path.join(root, 'docs')),
  ...collect(path.join(root, '.storybook')),
  ...collect(path.join(root, 'src')),
  ...collect(path.join(root, 'packages/wui-react/src')),
  ...['README.md', 'NPM_README.md', 'api/README.md', 'packages/wui-react/README.md'].map((name) =>
    path.join(root, name)
  ),
]
const issues = []
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const markdown = source.replace(/```[\s\S]*?```/g, '')
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1]
      .trim()
      .split(/\s+["']/)[0]
      .replace(/^<|>$/g, '')
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue
    const pathname = decodeURIComponent(target.split(/[?#]/)[0])
    if (!fs.existsSync(path.resolve(path.dirname(file), pathname)))
      issues.push(`${path.relative(root, file)}: missing link ${target}`)
  }
  for (const match of source.matchAll(/pnpm run ([a-zA-Z0-9:_-]+)/g)) {
    if (!(match[1] in scripts)) issues.push(`${path.relative(root, file)}: unknown script ${match[1]}`)
  }
}
if (issues.length) {
  console.error('[docs]\n' + [...new Set(issues)].join('\n'))
  process.exitCode = 1
} else console.log(`[docs] ${files.length} project documents have valid local links and commands.`)
