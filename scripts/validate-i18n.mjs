import { readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../src/i18n/locales')

export function flattenTranslation(resource, prefix = '', output = new Map()) {
  for (const [key, value] of Object.entries(resource)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) flattenTranslation(value, path, output)
    else output.set(path, value)
  }
  return output
}

function placeholders(value) {
  if (typeof value !== 'string') return []
  return [...value.matchAll(/{{\s*([\w.-]+)\s*}}/g)].map((match) => match[1]).sort()
}

export function compareTranslations(baseLocale, baseResource, locale, resource) {
  const base = flattenTranslation(baseResource)
  const target = flattenTranslation(resource)
  const missingKeys = [...base.keys()].filter((key) => !target.has(key))
  const extraKeys = [...target.keys()].filter((key) => !base.has(key))
  const nonStringValues = [...base]
    .filter(([, value]) => typeof value !== 'string')
    .map(([key]) => `${baseLocale}.${key}`)
    .concat([...target].filter(([, value]) => typeof value !== 'string').map(([key]) => `${locale}.${key}`))
  const placeholderMismatches = [...base.keys()]
    .filter((key) => target.has(key))
    .filter((key) => JSON.stringify(placeholders(base.get(key))) !== JSON.stringify(placeholders(target.get(key))))

  return { missingKeys, extraKeys, nonStringValues, placeholderMismatches }
}

export async function validateLocaleDirectory(directory = root) {
  const locales = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  if (!locales.includes('en')) throw new Error('i18n validation requires the en fallback locale')

  const resources = new Map()
  for (const locale of locales) {
    const resourceUrl = pathToFileURL(resolve(directory, locale, 'translation.js')).href
    resources.set(locale, (await import(resourceUrl)).default)
  }

  const baseResource = resources.get('en')
  const issues = []
  for (const locale of locales) {
    if (locale === 'en') continue
    const result = compareTranslations('en', baseResource, locale, resources.get(locale))
    for (const key of result.missingKeys) issues.push(`${locale} is missing ${key}`)
    for (const key of result.extraKeys) issues.push(`${locale} has an extra key ${key}`)
    for (const key of result.placeholderMismatches)
      issues.push(`${locale} has different interpolation placeholders for ${key}`)
    for (const key of result.nonStringValues) issues.push(`translation values must be strings: ${key}`)
  }

  return { locales, keyCount: flattenTranslation(baseResource).size, issues }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const result = await validateLocaleDirectory()
    if (result.issues.length) {
      process.stderr.write(`[i18n] ${result.issues.join('\n[i18n] ')}\n`)
      process.exitCode = 1
    } else {
      process.stdout.write(
        `[i18n] ${result.locales.join(', ')}: ${result.keyCount} keys and interpolation placeholders match.\n`
      )
    }
  } catch (error) {
    process.stderr.write(`[i18n] ${error instanceof Error ? error.message : String(error)}\n`)
    process.exitCode = 1
  }
}
