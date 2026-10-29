import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { log } from 'node:console'
import { libraryComponents, libraryGroups } from '../config/library-contract.mjs'

const roster = JSON.parse(fs.readFileSync('config/wui-migration-roster.json', 'utf8')).entries
const componentDocs = JSON.parse(fs.readFileSync('.storybook/component-docs.json', 'utf8'))
const componentCautions = JSON.parse(fs.readFileSync('.storybook/component-cautions.json', 'utf8'))
const componentProps = JSON.parse(fs.readFileSync('.storybook/component-props.generated.json', 'utf8'))

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
const autodocs = new Set()
const storyTitles = new Set()
for (const directory of directories) {
  const story = fs.readdirSync(directory).find((file) => /\.stories\.[jt]sx?$/.test(file))
  const source = fs.readFileSync(path.join(directory, story), 'utf8')
  const title = source.match(/(?:\bconst meta[^\n]*=|\bexport default)\s*\{\s*title:\s*['"]([^'"]+)['"]/)?.[1]
  if (!title) throw new Error(`Story has no static title: ${directory}/${story}`)
  if (storyTitles.has(title)) throw new Error(`Duplicate Storybook title: ${title}`)
  storyTitles.add(title)
  const name = title.split('/').at(-1)
  if (!Array.isArray(componentProps[name]) || componentProps[name].some((prop) =>
    !prop.name || !prop.type || !prop.description || typeof prop.required !== 'boolean'
  )) throw new Error(`Missing source-derived Props explanation: ${title}`)
  if (/\btags:\s*\[[^\]]*['"]autodocs['"]/.test(source)) {
    if (autodocs.has(name)) throw new Error(`Duplicate Autodocs component name: ${name}`)
    autodocs.add(name)
    const guide = componentDocs[name]
    if (!guide || !['purpose', 'preview'].every((field) => typeof guide[field] === 'string' && guide[field].trim()))
      throw new Error(`Missing component-specific Autodocs guide: ${title}`)
    if (typeof componentCautions[name] !== 'string' || !componentCautions[name].trim())
      throw new Error(`Missing component-specific caution: ${title}`)
  } else {
    const mdxFile = path.join(directory, `${name}.mdx`)
    if (!fs.existsSync(mdxFile)) throw new Error(`Story without Autodocs needs an adjacent MDX page: ${title}`)
    const mdx = fs.readFileSync(mdxFile, 'utf8')
    const sections = [
      '<header className="wui-doc-hero">',
      'aria-label="组件使用指南"',
      'wui-doc-card-caution',
      '<span className="wui-doc-section-index">01</span>',
      '<Canvas of={Stories.',
      '<span className="wui-doc-section-index">02</span>',
      '<span className="wui-doc-section-index">03</span>',
      `<PropReference name="${name}" />`,
      '<ArgTypes of={Stories} />',
    ]
    const positions = sections.map((section) => mdx.indexOf(section))
    if (
      positions.some((position) => position < 0) ||
      positions.some((position, index) => index && position <= positions[index - 1])
    )
      throw new Error(`Manual Docs page does not follow the shared layout: ${mdxFile}`)
  }
}
const orphanDocs = Object.keys(componentDocs).filter((name) => !autodocs.has(name))
if (orphanDocs.length) throw new Error(`Autodocs guides without a component story: ${orphanDocs.join(', ')}`)
const orphanCautions = Object.keys(componentCautions).filter((name) => !autodocs.has(name))
if (orphanCautions.length) throw new Error(`Autodocs cautions without a component story: ${orphanCautions.join(', ')}`)
const undocumentedProps = Object.keys(componentProps).filter((name) => ![...storyTitles].some((title) => title.endsWith(`/${name}`)))
if (undocumentedProps.length) throw new Error(`Props without a component story: ${undocumentedProps.join(', ')}`)
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
  const builtDocs = new Set(
    Object.values(index.entries)
      .filter((entry) => entry.type === 'docs')
      .map((entry) => entry.title)
  )
  const missingDocs = [...storyTitles].filter((title) => !builtDocs.has(title))
  if (missingDocs.length) throw new Error(`Component missing from built docs index: ${missingDocs.join(', ')}`)
  log(`[stories] Built index has ${Object.keys(index.entries).length} stories/docs entries`)
}
log(
  `[stories] ${autodocs.size} component-specific Autodocs guides and ${storyTitles.size - autodocs.size} adjacent MDX pages, all with Props explanations`
)
log(
  `[stories] ${directories.length} UI component entries have source-adjacent stories (hooks and private helpers are documented through their consumers)`
)
