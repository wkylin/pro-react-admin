import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const remotes = registry.remotes || []

const typeDeclarations = [
  ...remotes.flatMap(({ name }) => [
    `declare module '${name}/App' {`,
    `  import type { ComponentType } from 'react'`,
    `  const App: ComponentType`,
    `  export default App`,
    `}`,
  ]),
  '',
].join('\n')

const remoteComponents = [
  `import React from 'react'`,
  '',
  `// Generated from src/projects/registry.json. Run pnpm run sync:project-contracts after registry changes.`,
  `export const remoteComponents = {`,
  ...remotes.map(({ name }) => `  ${name}: React.lazy(() => import('${name}/App')),`),
  `} as const`,
  '',
  `export type RemoteName = keyof typeof remoteComponents`,
  '',
].join('\n')

const outputs = new Map([
  [path.join(root, 'typings/module-federation.d.ts'), typeDeclarations],
  [path.join(root, 'src/projects/shell/remote-components.tsx'), remoteComponents],
])
const checkOnly = process.argv.includes('--check')
let stale = false

for (const [file, expected] of outputs) {
  const actual = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  if (checkOnly) {
    if (actual !== expected) {
      stale = true
      console.error(`[project-contracts] ${path.relative(root, file)} is stale. Run: pnpm run sync:project-contracts`)
    }
  } else {
    fs.writeFileSync(file, expected)
  }
}

if (checkOnly && stale) process.exitCode = 1
else console.log(`[project-contracts] ${remotes.length} Remote imports and type declarations are in sync`)
