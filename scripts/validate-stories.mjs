import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { log } from 'node:console'
import { libraryComponents, libraryGroups } from '../config/library-contract.mjs'

const roster = JSON.parse(fs.readFileSync('config/wui-migration-roster.json', 'utf8')).entries

const groups = ['src/components/stateless', 'src/components/stateful', 'src/shared/ui']
let directories = groups.flatMap((root) =>
  fs
    .readdirSync(root, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        ['index.tsx', 'index.ts', 'index.js'].some((file) => fs.existsSync(path.join(root, entry.name, file)))
    )
    .map((entry) => path.join(root, entry.name))
)
directories.push(...libraryComponents.map(({ name }) => `packages/wui-react/src/${name}`))
// Migrated legacy directories retain only a source alias forwarder for compatibility.
// Validate the implementation's adjacent story instead of requiring duplicate stories.
directories = directories.map((directory) => {
  const entry = ['index.tsx', 'index.ts', 'index.js'].find((file) => fs.existsSync(path.join(directory, file)))
  const source = fs.readFileSync(path.join(directory, entry), 'utf8')
  const forwarder = source.match(/^export \{ default \} from '@wui\/([^']+)'/)
  if (forwarder) return `packages/wui-react/src/${forwarder[1]}`
  const migrated = roster.find(
    (entry) =>
      entry.source === directory &&
      entry.destination &&
      (source.includes(`@wui/${entry.destination.group}/${entry.name}`) ||
        (source.includes(`from '@wui/${entry.destination.group}'`) && source.includes(`${entry.name} as default`)))
  )
  return migrated?.destination.source ?? directory
})
for (const { subpath: group } of libraryGroups) {
  const root = `packages/wui-react/src/${group}`
  directories.push(
    ...fs
      .readdirSync(root, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          ['index.tsx', 'index.ts', 'index.js'].some((file) => fs.existsSync(path.join(root, entry.name, file)))
      )
      .map((entry) => path.join(root, entry.name))
  )
}
directories = [...new Set(directories)]
const missing = directories.filter(
  (directory) => !fs.readdirSync(directory).some((file) => /\.stories\.[jt]sx?$/.test(file))
)
if (missing.length) throw new Error(`Missing component stories:\n${missing.join('\n')}`)
const builtOption = process.argv.find((arg) => arg === '--built' || arg.startsWith('--built='))
if (builtOption) {
  const output = builtOption.startsWith('--built=') ? builtOption.slice('--built='.length) : 'storybook-static'
  const index = JSON.parse(fs.readFileSync(path.join(output, 'index.json'), 'utf8'))
  const imports = new Set(Object.values(index.entries).map((entry) => entry.importPath.replace(/^\.\//, '')))
  for (const directory of directories) {
    const stories = fs.readdirSync(directory).filter((file) => /\.stories\.[jt]sx?$/.test(file))
    if (!stories.some((file) => imports.has(path.join(directory, file).split(path.sep).join('/'))))
      throw new Error(`Component missing from built story index: ${directory}`)
  }
  log(`[stories] Built index has ${Object.keys(index.entries).length} stories/docs entries`)
}
log(
  `[stories] ${directories.length} UI component entries have source-adjacent stories (hooks and private helpers are documented through their consumers)`
)
