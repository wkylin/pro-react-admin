import { isDeepStrictEqual } from 'node:util'
import { libraryExports } from '../config/library-contract.mjs'

export function assertConditionalExports(actual, expected = libraryExports) {
  if (!isDeepStrictEqual(actual, expected)) {
    throw new Error('Package conditional exports differ from config/library-contract.mjs')
  }
  // Conditions are resolved in insertion order, which deep equality ignores.
  for (const [subpath, conditions] of Object.entries(expected)) {
    if (typeof conditions !== 'object') continue
    if (!isDeepStrictEqual(Object.keys(actual[subpath]), Object.keys(conditions))) {
      throw new Error(`Conditional export order differs for ${subpath}; types must precede runtime conditions`)
    }
  }
}

export function expectedEntryExports(entry) {
  return [...(entry.name ? ['default'] : []), ...(entry.runtimeExports ?? [])].sort()
}

export function assertEntryExports(label, entry, actualExports) {
  const expected = expectedEntryExports(entry)
  const actual = [...actualExports].filter((name) => name !== '__esModule').sort()
  // Legacy entries have historically exposed additional component aliases.
  // Their required default/runtime exports remain stable; groups are exact.
  const matches = entry.name ? expected.every((name) => actual.includes(name)) : isDeepStrictEqual(actual, expected)
  if (!matches) {
    throw new Error(
      `${label} ${entry.subpath} exports differ: actual=${actual.join(', ')}; expected=${expected.join(', ')}`
    )
  }
}
