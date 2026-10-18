import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

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
  ...[
    'README.md',
    'NPM_README.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    '.github/PULL_REQUEST_TEMPLATE.md',
    'api/README.md',
  ].map((name) => path.join(root, name)),
]
const issues = []
const anchors = new Map()

const headingText = (tokens) =>
  tokens.map((token) => (token.tokens ? headingText(token.tokens) : (token.text ?? ''))).join('')

function anchorsFor(file) {
  if (anchors.has(file)) return anchors.get(file)
  const found = new Set()
  const tokens = marked.lexer(fs.readFileSync(file, 'utf8'))
  marked.walkTokens(tokens, (token) => {
    if (token.type !== 'heading') return
    const base = headingText(token.tokens ?? [])
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}_\s-]/gu, '')
      .replace(/\s/g, '-')
    let slug = base
    for (let duplicate = 1; found.has(slug); duplicate += 1) slug = `${base}-${duplicate}`
    found.add(slug)
  })
  anchors.set(file, found)
  return found
}

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const tokens = marked.lexer(source)
  marked.walkTokens(tokens, (token) => {
    if (token.type !== 'link' && token.type !== 'image') return
    const target = token.href.trim()
    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(target)) return
    try {
      const [location, fragment] = target.split('#', 2)
      const pathname = decodeURIComponent(location.split('?')[0])
      const resolved = pathname ? path.resolve(path.dirname(file), pathname) : file
      if (!fs.existsSync(resolved)) {
        issues.push(`${path.relative(root, file)}: missing link ${target}`)
      } else if (fragment && /\.mdx?$/i.test(resolved) && !anchorsFor(resolved).has(decodeURIComponent(fragment))) {
        issues.push(`${path.relative(root, file)}: missing anchor ${target}`)
      }
    } catch {
      issues.push(`${path.relative(root, file)}: invalid local link ${target}`)
    }
  })
  for (const match of source.matchAll(/pnpm run ([a-zA-Z0-9:_-]+)/g)) {
    if (!(match[1] in scripts)) issues.push(`${path.relative(root, file)}: unknown script ${match[1]}`)
  }
}
if (issues.length) {
  console.error('[docs]\n' + [...new Set(issues)].join('\n'))
  process.exitCode = 1
} else console.log(`[docs] ${files.length} project documents have valid local links, anchors and commands.`)
