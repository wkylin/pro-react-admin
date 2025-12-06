const globalAny: any = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {}

const importMetaEnv: Record<string, any> = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}
const processEnv: Record<string, any> = typeof process !== 'undefined' && process.env ? process.env : {}

// Ensure process.env exists in browser runtimes so legacy code can read from it
if (typeof globalAny.process === 'undefined') {
  globalAny.process = { env: { ...importMetaEnv, ...processEnv } }
} else if (!globalAny.process.env) {
  globalAny.process.env = { ...importMetaEnv, ...processEnv }
}

const expandKeyVariants = (key: string): string[] => {
  const variants = [key]
  if (!key.startsWith('VITE_')) variants.push(`VITE_${key}`)
  if (!key.startsWith('REACT_APP_')) variants.push(`REACT_APP_${key}`)
  if (!key.startsWith('APP_')) variants.push(`APP_${key}`)
  if (!key.startsWith('AUTH_')) variants.push(`AUTH_${key}`)
  return Array.from(new Set(variants))
}

const readEnv = (key: string): any => {
  const candidates = expandKeyVariants(key)
  for (const k of candidates) {
    if (k in importMetaEnv && importMetaEnv[k] !== undefined) return importMetaEnv[k]
    if (k in processEnv && processEnv[k] !== undefined) return processEnv[k]
    if (globalAny.process?.env && k in globalAny.process.env && globalAny.process.env[k] !== undefined)
      return globalAny.process.env[k]
  }
  return undefined
}

export const getEnv = (key: string, fallback: string = ''): string => {
  const value = readEnv(key)
  if (value === undefined || value === null) return fallback
  return String(value)
}

export const getEnvBool = (key: string, fallback = false): boolean => {
  const value = readEnv(key)
  if (value === undefined || value === null) return fallback
  const normalized = String(value).toLowerCase()
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false
  return fallback
}

export const getEnvNumber = (key: string, fallback: number): number => {
  const value = readEnv(key)
  if (value === undefined || value === null) return fallback
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

export default {
  getEnv,
  getEnvBool,
  getEnvNumber,
}
