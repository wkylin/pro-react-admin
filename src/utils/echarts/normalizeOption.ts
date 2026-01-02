type UnknownRecord = Record<string, unknown>

const isPlainObject = (value: unknown): value is UnknownRecord => {
  if (!value || typeof value !== 'object') return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

// ECharts 5 deprecates legacy option schemas like `itemStyle.normal`, `label.emphasis`, etc.
// This normalizer converts common legacy shapes into the modern schema in-place.
export const normalizeEChartsOption = (value: unknown): void => {
  const styleKeys = new Set(['itemStyle', 'lineStyle', 'label', 'labelLine', 'areaStyle'])

  const ensureStateContainer = (parent: UnknownRecord, stateKey: 'emphasis' | 'select') => {
    const existing = parent[stateKey]
    if (isPlainObject(existing)) return existing
    const next: UnknownRecord = {}
    parent[stateKey] = next
    return next
  }

  const mergeLegacyState = (
    parent: UnknownRecord,
    stateKey: 'emphasis' | 'select',
    styleKey: string,
    legacyState: UnknownRecord
  ) => {
    const state = ensureStateContainer(parent, stateKey)
    const existingStyle = state[styleKey]
    const existingStyleObj = isPlainObject(existingStyle) ? existingStyle : {}
    state[styleKey] = { ...existingStyleObj, ...legacyState }
  }

  const normalizeStyleObject = (parent: UnknownRecord, styleKey: string, styleObj: UnknownRecord) => {
    const legacyNormal = styleObj.normal
    if (isPlainObject(legacyNormal)) {
      Object.assign(styleObj, legacyNormal)
      delete styleObj.normal
    }

    const legacyEmphasis = styleObj.emphasis
    if (isPlainObject(legacyEmphasis)) {
      mergeLegacyState(parent, 'emphasis', styleKey, legacyEmphasis)
      delete styleObj.emphasis
    }

    const legacySelect = styleObj.select
    if (isPlainObject(legacySelect)) {
      mergeLegacyState(parent, 'select', styleKey, legacySelect)
      delete styleObj.select
    }
  }

  const stack: unknown[] = [value]
  while (stack.length > 0) {
    const node = stack.pop()
    if (Array.isArray(node)) {
      for (const item of node) stack.push(item)
      continue
    }
    if (!isPlainObject(node)) continue

    for (const [key, child] of Object.entries(node)) {
      if (styleKeys.has(key) && isPlainObject(child)) {
        normalizeStyleObject(node, key, child)
      }
      stack.push(child)
    }
  }
}
