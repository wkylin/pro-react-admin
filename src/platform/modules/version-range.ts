type SemVer = readonly [number, number, number]
type Operator = '<' | '<=' | '=' | '>=' | '>'
type Comparator = { operator: Operator; version: SemVer }

const parseVersion = (value: string): SemVer | undefined => {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(value)
  if (!match) return undefined
  const version = match.slice(1).map(Number)
  if (!version.every(Number.isSafeInteger)) return undefined
  return version as unknown as SemVer
}

const compare = (left: SemVer, right: SemVer) => {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] < right[index] ? -1 : 1
  }
  return 0
}

const expand = (token: string): Comparator[] | undefined => {
  const match = /^(\^|~|<=|>=|<|>|=)?((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))$/.exec(token)
  if (!match) return undefined
  const version = parseVersion(match[2])
  if (!version) return undefined
  const operator = match[1] ?? '='
  if (operator !== '^' && operator !== '~') return [{ operator: operator as Operator, version }]

  const [major, minor, patch] = version
  const upper: SemVer =
    operator === '~'
      ? [major, minor + 1, 0]
      : major > 0
        ? [major + 1, 0, 0]
        : minor > 0
          ? [0, minor + 1, 0]
          : [0, 0, patch + 1]
  return [
    { operator: '>=', version },
    { operator: '<', version: upper },
  ]
}

function matches(version: SemVer, comparator: Comparator) {
  const order = compare(version, comparator.version)
  switch (comparator.operator) {
    case '<':
      return order < 0
    case '<=':
      return order <= 0
    case '=':
      return order === 0
    case '>=':
      return order >= 0
    case '>':
      return order > 0
  }
}

/** Supports exact, ^, ~, and whitespace-conjoined comparison ranges; rejects unknown semver syntax. */
export function satisfiesVersionRange(versionValue: string, range: string): boolean {
  const version = parseVersion(versionValue)
  if (!version || typeof range !== 'string' || !range.trim()) return false

  const alternatives = range.split('||').map((alternative) => alternative.trim())
  if (alternatives.some((alternative) => !alternative)) return false
  return alternatives.some((alternative) => {
    const comparators = alternative.split(/\s+/).flatMap((token) => expand(token) ?? [])
    const tokens = alternative.split(/\s+/)
    if (!tokens.length || tokens.some((token) => !expand(token))) return false
    return comparators.every((comparator) => matches(version, comparator))
  })
}
