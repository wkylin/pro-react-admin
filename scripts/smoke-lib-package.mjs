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

try {
  await fs.mkdir(path.dirname(packageLink), { recursive: true })
  await fs.symlink(packageDir, packageLink, process.platform === 'win32' ? 'junction' : 'dir')

  const esmScript = `
    const packageName = ${JSON.stringify(libraryPackageName)}
    const subpaths = ${JSON.stringify(subpaths)}
    const root = await import(packageName)
    const entryExports = {}
    const resolvedEntries = {}
    for (const subpath of subpaths) {
      const component = await import(packageName + '/' + subpath)
      resolvedEntries[subpath] = import.meta.resolve(packageName + '/' + subpath)
      if ('default' in component && component.default == null) throw new Error('Invalid default export for ' + subpath)
      entryExports[subpath] = Object.keys(component)
    }
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
    const subpaths = ${JSON.stringify(subpaths)}
    const root = require(packageName)
    const entryExports = {}
    const resolvedEntries = {}
    for (const subpath of subpaths) {
      const component = require(packageName + '/' + subpath)
      resolvedEntries[subpath] = require.resolve(packageName + '/' + subpath)
      if ('default' in component && component.default == null) throw new Error('Invalid default export for ' + subpath)
      entryExports[subpath] = Object.keys(component)
    }
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
  await assertConsumerTypes()

  log(
    `Consumer smoke passed for public types, ESM/CJS root exports and ${libraryComponents.length} component subpaths and ${libraryGroups.length} named groups.`
  )
} finally {
  await fs.rm(consumerDir, { recursive: true, force: true })
}
