import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { libraryEntries } from '../config/library-contract.mjs'

const require = createRequire(import.meta.url)
const { rollup } = require('rollup')
const { dts } = require('rollup-plugin-dts')
export async function bundleDeclarations(typesDir, entries = libraryEntries) {
  // Read every entry before removing intermediate declarations: a group can refer
  // to another group's types. One declaration per public entry bounds file growth
  // independently of the number of migrated implementation files.
  const bundled = []
  for (const entry of entries) {
    const bundle = await rollup({
      input: path.join(typesDir, entry.types),
      plugins: [dts()],
      onwarn(warning, warn) {
        if (warning.code !== 'EMPTY_BUNDLE') warn(warning)
      },
    })
    try {
      const { output } = await bundle.generate({ format: 'es' })
      if (output.length !== 1 || output[0].type !== 'chunk') {
        throw new Error(`Expected one consolidated declaration for ${entry.subpath}`)
      }
      bundled.push([entry.types, output[0].code || 'export {}\n'])
    } finally {
      await bundle.close()
    }
  }
  // Preserve the root's re-exports, including type identity with legacy subpaths.
  const rootTypes = await fs.readFile(path.join(typesDir, 'index.d.ts'), 'utf8')
  await fs.rm(typesDir, { recursive: true, force: true })
  for (const [file, code] of [['index.d.ts', rootTypes], ...bundled]) {
    const target = path.join(typesDir, file)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, code)
  }
  return bundled.length + 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const count = await bundleDeclarations(path.join(root, 'packages/wui-react/dist/types'))
  console.log(`Consolidated declarations into ${count} public files.`)
}
