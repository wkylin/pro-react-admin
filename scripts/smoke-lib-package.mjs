import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { log } from 'node:console'
import { fileURLToPath } from 'node:url'
import { libraryComponents, libraryEntries, libraryGroups, libraryPackageName } from '../config/library-contract.mjs'

import { assertEntryExports } from './lib-package-contract.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(repoRoot, 'packages/wui-react')
const consumerDir = await fs.mkdtemp(path.join(os.tmpdir(), 'wui-react-consumer-'))
const packageLink = path.join(consumerDir, 'node_modules', ...libraryPackageName.split('/'))
const expectedRootExports = libraryComponents
  .flatMap(({ name, runtimeExports = [] }) => [name, ...runtimeExports])
  .sort()
const subpaths = libraryEntries.map(({ subpath }) => subpath)

const runNode = (label, args) => {
  const result = spawnSync(process.execPath, args, {
    cwd: consumerDir,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    env: { ...process.env, NODE_ENV: 'production' },
  })

  if (result.status !== 0) {
    throw new Error(`${label} 消费检查失败：\n${result.stderr || result.stdout}`)
  }

  return JSON.parse(result.stdout)
}

const assertResult = (label, result) => {
  const actualRootExports = [...result.rootExports].sort()
  if (JSON.stringify(actualRootExports) !== JSON.stringify(expectedRootExports)) {
    throw new Error(
      `${label} 根入口导出不一致：actual=${actualRootExports.join(', ')}; expected=${expectedRootExports.join(', ')}`
    )
  }

  for (const entry of libraryEntries) {
    assertEntryExports(label, entry, result.entryExports[entry.subpath])
    const resolved = result.resolvedEntries[entry.subpath]
    const suffix = label === 'ESM' ? `/dist/esm/${entry.subpath}.js` : `/dist/cjs/${entry.subpath}.cjs`
    if (!resolved.replaceAll(path.sep, '/').endsWith(suffix))
      throw new Error(`${label} resolved the wrong condition for ${entry.subpath}: ${resolved}`)
  }

  if (!result.styleResolved || !result.packageJsonResolved) {
    throw new Error(`${label} 未能解析 style.css 或 package.json export`)
  }
}

async function assertConsumerTypes() {
  const require = createRequire(import.meta.url)
  const ts = require('typescript')
  const source = []
  for (const [index, entry] of libraryEntries.entries()) {
    const specifier = JSON.stringify(`${libraryPackageName}/${entry.subpath}`)
    if (entry.name) source.push(`import Default${index} from ${specifier}; void Default${index}`)
    for (const name of entry.runtimeExports ?? []) {
      source.push(`import { ${name} as Runtime${index}_${name} } from ${specifier}; void Runtime${index}_${name}`)
    }
    for (const name of entry.typeExports ?? []) {
      source.push(`import type { ${name} as Type${index}_${name} } from ${specifier}`)
      if (entry.name) source.push(`import type { ${name} as Root${index}_${name} } from '${libraryPackageName}'`)
    }
    // Resolves empty groups too; their declarations must be external modules.
    source.push(`import type * as Entry${index} from ${specifier}`)
  }
  if (libraryGroups.find((entry) => entry.subpath === 'layout')?.runtimeExports.includes('FixTabs')) {
    source.push(
      `const tabs: import('${libraryPackageName}/layout').FixTabsProps = { tabs: [{id: 0, label: 'One', content: 'Panel'}], activeId: 0, onActiveIdChange: id => { const key: string | number = id; void key } }; void tabs`
    )
    source.push(
      `const cards: import('${libraryPackageName}/layout').HorizontalScrollProps = { cards: [{id: 'one', url: '/image.png', alt: 'Image', href: '/details'}] }; void cards`
    )
  }
  if (libraryGroups.find((entry) => entry.subpath === 'forms')?.runtimeExports.includes('SmartChat')) {
    source.push(
      `const chat: import('${libraryPackageName}/forms').SmartChatProps = { apiUrl: '/chat', buildRequestBody: ({messages, input, systemPrompt}) => ({messages, input, systemPrompt}), onMessagesChange: messages => { const role: import('${libraryPackageName}/forms').ChatRole = messages[0].role; void role } }; void chat`
    )
    source.push(
      `const interval: import('${libraryPackageName}/forms').IntervalInputProps = { value: {minValue: null, maxValue: 900}, onChange: value => { const max: number | null | undefined = value.maxValue; void max } }; void interval`
    )
    source.push(
      `const tags: import('${libraryPackageName}/forms').CheckableTagsProps = { dataSource: [], onChange: event => { const selected: import('${libraryPackageName}/forms').SelectedTags = event.checkedKeys; void selected } }; void tags`
    )
  }
  if (libraryGroups.find((entry) => entry.subpath === 'data-display')?.runtimeExports.includes('TreeList')) {
    source.push(
      `const tree: import('${libraryPackageName}/data-display').TreeListProps = {getTreeList: async (_params, signal) => {signal?.throwIfAborted(); return {status: 1, data: [{id: 'root', pid: null, name: 'Root'}]}}, setSelectedKeys: keys => {const key: string | undefined = keys[0]; void key}}; void tree`
    )
    source.push(
      `const network: import('${libraryPackageName}/data-display').UserIPProps = {loadInfo: async signal => {signal.throwIfAborted(); return {ip:'192.0.2.1'}}}; void network`
    )
    source.push(
      `const history: import('${libraryPackageName}/data-display').TransferHistoryProps = {groups: [{id:'g',name:'History',children:[]}], renderTitle: group => group.name}; void history`
    )
    source.push(
      `const pdf: import('${libraryPackageName}/data-display').PDFExportProps = {fileName:'test.pdf',pdfOptions:{orientation:'landscape'},onError: error => {void error}}; void pdf`
    )
  }
  const consumerFile = path.join(consumerDir, 'consumer.mts')
  await fs.writeFile(consumerFile, source.join('\n'))
  const program = ts.createProgram([consumerFile], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    types: [],
    module: ts.ModuleKind.Preserve,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  if (diagnostics.length) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => consumerDir,
        getNewLine: () => '\n',
      })
    )
  }
}

async function assertPdfPeerFreeTypes() {
  const require = createRequire(import.meta.url)
  const ts = require('typescript')
  const fixture = path.join(consumerDir, 'without-pdf-peers.mts')
  await fs.writeFile(
    fixture,
    `import {NumberViewCard} from '${libraryPackageName}/data-display'\nNumberViewCard({value: 42, label: 'Independent metric'})`
  )
  const options = {
    strict: true,
    noEmit: true,
    skipLibCheck: false,
    types: [],
    module: ts.ModuleKind.Preserve,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  }
  const host = ts.createCompilerHost(options)
  host.resolveModuleNames = (names, containingFile) =>
    names.map((name) =>
      /^(jspdf|html2canvas)(\/|$)/.test(name)
        ? undefined
        : ts.resolveModuleName(name, containingFile, options, host).resolvedModule
    )
  const program = ts.createProgram([fixture], options, host)
  // These two pre-existing Ant Design dependency declarations fail strict checking
  // independently of this package. Do not suppress other codes/files or package diagnostics.
  const upstreamFiles = [
    '/node_modules/@rc-component/image/es/PreviewGroup.d.ts',
    '/node_modules/@rc-component/picker/es/PickerPanel/index.d.ts',
  ]
  const allDiagnostics = ts.getPreEmitDiagnostics(program)
  const diagnostics = allDiagnostics.filter(
    (diagnostic) =>
      !(
        diagnostic.code === 2430 &&
        upstreamFiles.some((file) => diagnostic.file?.fileName.replaceAll(path.sep, '/').endsWith(file))
      )
  )
  const baselineCount = allDiagnostics.length - diagnostics.length
  log(`Strict PDF-peer-free declaration consumer: ${baselineCount} known upstream TS2430 diagnostics baselined.`)
  if (diagnostics.length)
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => consumerDir,
        getNewLine: () => '\n',
      })
    )
}

try {
  await fs.mkdir(path.dirname(packageLink), { recursive: true })
  await fs.symlink(packageDir, packageLink, process.platform === 'win32' ? 'junction' : 'dir')

  for (const peer of ['react', 'react-dom']) {
    await fs.symlink(
      path.join(repoRoot, 'node_modules', peer),
      path.join(consumerDir, 'node_modules', peer),
      process.platform === 'win32' ? 'junction' : 'dir'
    )
  }
  const layoutRender = libraryGroups.find((entry) => entry.subpath === 'layout')?.runtimeExports.includes('FixTabs')
    ? `
    const layout = entryModules.layout
    const markup = renderToStaticMarkup(createElement(layout.PageContainer, {title: 'Independent layout', footer: createElement(layout.Footer, {brand: 'Consumer brand'})},
      createElement(layout.FixTabs, {tabs: [{id: 0, label: 'First', content: 'Panel content'}]}),
      createElement(layout.HorizontalScroll, {cards: [{id: 1, url: '/photo.png', alt: 'Consumer image'}]}),
      createElement(layout.FeatureAny, {data: [{title: 'Feature', content: 'Description', srcImage: '/feature.png'}]})
    ))
    if (!markup.includes('Panel content') || !markup.includes('Consumer brand') || !markup.includes('Consumer image') || !markup.includes('role="tab"')) throw new Error('Independent layout SSR lost caller content or accessibility')
  `
    : ''
  const formsRender = libraryGroups.find((entry) => entry.subpath === 'forms')?.runtimeExports.includes('SmartChat')
    ? `
    const forms = entryModules.forms
    const formMarkup = renderToStaticMarkup(createElement('div', null,
      createElement(forms.CheckableTags, {dataSource: [{key: 'tags', title: 'Choices', data: [{key: 'a', name: 'Choice A'}]}]}),
      createElement(forms.DottedStepper, {steps: [{label: 'Caller step', content: 'Caller content'}]}),
      createElement(forms.IntervalInput, {value: {minValue: -200, maxValue: 900}}),
      createElement(forms.LanguageSwitcher, {language: 'en', options: [{value:'en', label:'English'}, {value:'de', label:'Deutsch'}], onLanguageChange: () => {}}),
      createElement(forms.PromptOptimizer, {value: {role: 'Reviewer'}}),
      createElement(forms.RadioInput, {text: 'Read-only choice', checked: true}),
      createElement(forms.ReactSignature, {}),
      createElement(forms.SmartChat, {apiUrl: '/chat', initialMessages: [{content: '**Markdown rendered**'}]}),
      createElement(forms.StarRating, {value: 2})
    ))
    for (const content of ['Choice A', 'Caller content', 'Deutsch', 'Reviewer', 'aria-readonly', '<svg', '<strong>Markdown rendered</strong>', 'radiogroup']) {
      if (!formMarkup.includes(content)) throw new Error('Independent forms SSR lost ' + content)
    }
  `
    : ''
  const dataDisplayRender = libraryGroups
    .find((entry) => entry.subpath === 'data-display')
    ?.runtimeExports.includes('TreeList')
    ? `
    const display = entryModules['data-display']
    const displayMarkup = renderToStaticMarkup(createElement('div', null,
      createElement(display.NumberViewCard, {value: 42, label: 'Consumer metric'}),
      createElement(display.UserIP, {data: {ip:'192.0.2.42'}}),
      createElement(display.TransferHistory, {groups:[{id:'g',name:'Consumer history',children:[]}]}),
      createElement(display.PDFExport, null, 'Consumer PDF'),
      createElement(display.TagCard, {tagCardList:[{id:'c',name:'Consumer card',tags:[]}]}),
      createElement(display.SvgPreview, {}),
      createElement(display.TreeList, {getTreeList: async () => ({status:1,data:[]}),setSelectedKeys: () => {}})
    ))
    for(const content of ['Consumer metric','192.0.2.42','Consumer history','Consumer PDF','Consumer card','SVG viewer']) {
      if(!displayMarkup.includes(content)) throw new Error('Independent data-display SSR lost ' + content)
    }
    display.Watermark()()
  `
    : ''
  const esmScript = `
    const packageName = ${JSON.stringify(libraryPackageName)}
    const entryModules = {}
    const subpaths = ${JSON.stringify(subpaths)}
    const {createElement} = await import('react')
    const {renderToStaticMarkup} = await import('react-dom/server')
    const root = await import(packageName)
    const entryExports = {}
    const resolvedEntries = {}
    for (const subpath of subpaths) {
      const component = await import(packageName + '/' + subpath)
      resolvedEntries[subpath] = import.meta.resolve(packageName + '/' + subpath)
      if ('default' in component && component.default == null) throw new Error('Invalid default export for ' + subpath)
      entryExports[subpath] = Object.keys(component)
      entryModules[subpath] = component
    }
    ${layoutRender}
    ${formsRender}
    ${dataDisplayRender}
    process.stdout.write(JSON.stringify({
      rootExports: Object.keys(root),
      entryExports,
      resolvedEntries,
      styleResolved: Boolean(import.meta.resolve(packageName + '/style.css')),
      packageJsonResolved: Boolean(import.meta.resolve(packageName + '/package.json')),
    }))
  `

  const cjsScript = `
    const packageName = ${JSON.stringify(libraryPackageName)}
    const entryModules = {}
    const subpaths = ${JSON.stringify(subpaths)}
    const {createElement} = require('react')
    const {renderToStaticMarkup} = require('react-dom/server')
    const root = require(packageName)
    const entryExports = {}
    const resolvedEntries = {}
    for (const subpath of subpaths) {
      const component = require(packageName + '/' + subpath)
      resolvedEntries[subpath] = require.resolve(packageName + '/' + subpath)
      if ('default' in component && component.default == null) throw new Error('Invalid default export for ' + subpath)
      entryExports[subpath] = Object.keys(component)
      entryModules[subpath] = component
    }
    ${layoutRender}
    ${formsRender}
    ${dataDisplayRender}
    process.stdout.write(JSON.stringify({
      rootExports: Object.keys(root),
      entryExports,
      resolvedEntries,
      styleResolved: Boolean(require.resolve(packageName + '/style.css')),
      packageJsonResolved: Boolean(require.resolve(packageName + '/package.json')),
    }))
  `

  const esmResult = runNode('ESM', ['--input-type=module', '--eval', esmScript])
  const cjsResult = runNode('CJS', ['--eval', cjsScript])
  assertResult('ESM', esmResult)
  assertResult('CJS', cjsResult)
  await assertPdfPeerFreeTypes()
  await assertConsumerTypes()
  if (layoutRender) {
    const css = await fs.readFile(path.join(packageDir, 'dist/style.css'), 'utf8')
    for (const token of ['--wui-footer-bg', '--wui-tab-active-bg', '--wui-hero-bg']) {
      if (!css.includes(token)) throw new Error(`Independent layout stylesheet is missing ${token}`)
    }
  }

  if (formsRender) {
    const css = await fs.readFile(path.join(packageDir, 'dist/style.css'), 'utf8')
    for (const token of ['.hljs', 'container-type:inline-size', '--radio-primary-color']) {
      if (!css.replace(/\s+/g, '').includes(token)) throw new Error(`Independent forms stylesheet is missing ${token}`)
    }
  }

  if (dataDisplayRender) {
    const css = await fs.readFile(path.join(packageDir, 'dist/style.css'), 'utf8')
    for (const token of ['numberCard', 'networkFields', 'stepTrack', 'transferHistoryContainer']) {
      if (!css.includes(token)) throw new Error('Independent data-display stylesheet is missing ' + token)
    }
  }

  log(
    `Consumer smoke passed for public types, ESM/CJS root exports and ${libraryComponents.length} component subpaths and ${libraryGroups.length} named groups.`
  )
} finally {
  await fs.rm(consumerDir, { recursive: true, force: true })
}
