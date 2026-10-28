import fs from 'node:fs/promises'
import path from 'node:path'
import { log } from 'node:console'
import { fileURLToPath } from 'node:url'
import { libraryComponents, libraryGroups } from '../config/library-contract.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'packages/wui-react/dist')

const esmIndex = `${libraryComponents
  .map(
    ({ name, subpath, runtimeExports = [] }) =>
      `export { default as ${name}${runtimeExports.map((exportName) => `, ${exportName}`).join('')} } from './${subpath}.js'`
  )
  .join('\n')}\n`

const cjsIndex = `'use strict'\n\n${libraryComponents
  .flatMap(({ name, subpath, runtimeExports = [] }) => [
    `Object.defineProperty(exports, '${name}', { enumerable: true, get: () => require('./${subpath}.cjs').default })`,
    ...runtimeExports.map(
      (exportName) =>
        `Object.defineProperty(exports, '${exportName}', { enumerable: true, get: () => require('./${subpath}.cjs').${exportName} })`
    ),
  ])
  .join('\n')}\n`

await Promise.all([
  fs.writeFile(path.join(distDir, 'esm/index.js'), esmIndex),
  fs.writeFile(path.join(distDir, 'cjs/index.cjs'), cjsIndex),
])

await Promise.all([
  fs.rm(path.join(distDir, 'esm/style-entry.js'), { force: true }),
  fs.rm(path.join(distDir, 'esm-styles'), { recursive: true, force: true }),
  fs.rm(path.join(distDir, 'cjs-styles'), { recursive: true, force: true }),
])

log(`Finalized ${libraryComponents.length} root components and ${libraryGroups.length} named group entries.`)
