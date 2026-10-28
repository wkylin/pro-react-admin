import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { libraryComponents, libraryEntries, libraryExports, libraryGroups } from '../config/library-contract.mjs'
import { assertConditionalExports, assertEntryExports } from './lib-package-contract.mjs'
import { bundleDeclarations } from './bundle-lib-types.mjs'

const require = createRequire(import.meta.url)
const ts = require('typescript')

test('legacy subpaths and named-only groups have separate runtime contracts', () => {
  assert.equal(libraryComponents.length, 12)
  assert.equal(libraryEntries.length, 19)
  assert.deepEqual(
    libraryGroups.map(({ subpath }) => subpath),
    ['layout', 'animation', 'data-display', 'forms', 'media', 'visualization', 'editor']
  )
  assert.doesNotThrow(() =>
    assertEntryExports('ESM', { name: 'OneTimePasscode', subpath: 'one-time-passcode' }, ['default', 'OneTimePasscode'])
  )
  const group = { subpath: 'forms', runtimeExports: ['CheckableTags', 'TreeList'] }
  assert.doesNotThrow(() => assertEntryExports('ESM', group, ['TreeList', 'CheckableTags']))
  assert.throws(() => assertEntryExports('ESM', group, ['CheckableTags']), /TreeList/)
  assert.throws(() => assertEntryExports('CJS', group, ['TreeList', 'CheckableTags', 'default']), /default/)
  assert.doesNotThrow(() => assertEntryExports('ESM', { subpath: 'empty', runtimeExports: [] }, []))
})

test('conditional exports reject a group mapped to the wrong format or condition order', () => {
  assert.doesNotThrow(() => assertConditionalExports(libraryExports))
  const wrongRequire = structuredClone(libraryExports)
  wrongRequire['./forms'].require = wrongRequire['./forms'].import
  assert.throws(() => assertConditionalExports(wrongRequire), /conditional exports/)
  const wrongOrder = structuredClone(libraryExports)
  const { types, ...runtime } = wrongOrder['./forms']
  wrongOrder['./forms'] = { ...runtime, types }
  assert.throws(() => assertConditionalExports(wrongOrder), /order/)
})

test('133 migrated declarations consolidate to seven groups without losing public prop types', async () => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'wui-declarations-'))
  try {
    await fs.writeFile(path.join(temporary, 'index.d.ts'), 'export {}\n')
    const groups = libraryGroups.map((entry) => ({ ...entry, exports: [] }))
    for (let index = 0; index < 133; index += 1) {
      const group = groups[index % groups.length]
      const dir = path.join(temporary, group.subpath, `Component${index}`)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(path.join(dir, 'props.d.ts'), `export interface Props { value: ${index}; label?: string }\n`)
      await fs.writeFile(
        path.join(dir, 'index.d.ts'),
        `import type { Props } from './props'\nexport type { Props } from './props'\nexport default function Component(props: Props): string\n`
      )
      group.exports.push(
        `export { default as Component${index} } from './Component${index}'\nexport type { Props as Component${index}Props } from './Component${index}'`
      )
    }
    for (const group of groups) await fs.writeFile(path.join(temporary, group.types), group.exports.join('\n'))
    assert.equal(await bundleDeclarations(temporary, groups), 8)
    const files = (await fs.readdir(temporary, { recursive: true })).filter((name) => name.endsWith('.d.ts'))
    assert.equal(files.length, 8)
    const consumer = []
    for (let index = 0; index < 133; index += 1) {
      const group = groups[index % groups.length]
      consumer.push(`import { Component${index}, type Component${index}Props } from './${group.subpath}'`)
      consumer.push(
        `const props${index}: Component${index}Props = { value: ${index} }; Component${index}(props${index})`
      )
      consumer.push(
        `// @ts-expect-error public prop literal must survive consolidation\nComponent${index}({ value: 'wrong' })`
      )
    }
    const fixture = path.join(temporary, 'consumer.ts')
    await fs.writeFile(fixture, consumer.join('\n'))
    const program = ts.createProgram([fixture], {
      strict: true,
      noEmit: true,
      types: [],
      module: ts.ModuleKind.Preserve,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2022,
    })
    const diagnostics = ts.getPreEmitDiagnostics(program)
    assert.equal(
      diagnostics.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => temporary,
        getNewLine: () => '\n',
      })
    )
  } finally {
    await fs.rm(temporary, { recursive: true, force: true })
  }
})
