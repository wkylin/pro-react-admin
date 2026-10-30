const identifier = /^[A-Za-z_$][\w$]*$/

function isJsonValue(value, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value !== 'object' || seen.has(value)) return false
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype) return false
  seen.add(value)
  const valid = Object.values(value).every((item) => isJsonValue(item, seen))
  seen.delete(value)
  return valid
}

/** Supply a useful JSX example when the builder has no CSF source snippet. */
export function sourceSnippet(code, context) {
  if (code?.trim()) return code

  const name =
    context.title
      ?.split('/')
      .at(-1)
      ?.replace(/[^A-Za-z0-9_$]/g, '') || 'Component'
  const props = Object.entries(context.args || {}).flatMap(([key, value]) => {
    if (!identifier.test(key) || !isJsonValue(value)) return []
    if (value === true) return [`  ${key}`]
    if (typeof value === 'string') return [`  ${key}=${JSON.stringify(value)}`]
    return [`  ${key}={${JSON.stringify(value, null, 2)}}`]
  })

  return props.length ? `<${name}\n${props.join('\n')}\n/>` : `<${name} />`
}
