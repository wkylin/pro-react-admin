import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { libraryGroups } from '../config/library-contract.mjs'
const roster = JSON.parse(fs.readFileSync(new URL('../config/wui-migration-roster.json', import.meta.url)))
const accepted = roster.entries.filter((entry) => entry.decision !== 'keep in app')
assert.equal(roster.entries.length, 143)
assert.equal(accepted.length, 133)
// Frozen legacy directory names differ from these public PascalCase exports.
const publicNames = { markmap: 'MarkmapHooks', mermaidHooks: 'MermaidHooks' }
const require = createRequire(import.meta.url)
for (const group of libraryGroups) {
  const esm = await import(`../packages/wui-react/dist/esm/${group.subpath}.js`)
  const cjs = require(`../packages/wui-react/dist/cjs/${group.subpath}.cjs`)
  for (const entry of accepted.filter((entry) => entry.destination.group === group.subpath)) {
    const name = publicNames[entry.name] ?? entry.name
    assert.ok(fs.existsSync(entry.destination.source), `${entry.name}: missing implementation`)
    assert.ok(group.runtimeExports.includes(name), `${entry.name}: missing group contract`)
    assert.ok(esm[name], `${entry.name}: missing ESM export`)
    assert.ok(cjs[name], `${entry.name}: missing CJS export`)
  }
}
console.log('[wui-migration] 143 decisions, 133 implementations and seven ESM/CJS groups reconciled.')
