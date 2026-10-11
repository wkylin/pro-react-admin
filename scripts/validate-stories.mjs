import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { log } from 'node:console'
import { libraryComponents } from '../config/library-contract.mjs'

const groups = ['src/components/stateless', 'src/components/stateful', 'src/shared/ui']
const directories = groups.flatMap((root) =>
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
const missing = directories.filter(
  (directory) => !fs.readdirSync(directory).some((file) => /\.stories\.[jt]sx?$/.test(file))
)
if (missing.length) throw new Error(`Missing component stories:\n${missing.join('\n')}`)
if (process.argv.includes('--built')) {
  const index = JSON.parse(fs.readFileSync('storybook-static/index.json', 'utf8'))
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
