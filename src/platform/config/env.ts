type EnvMap = Record<string, string | undefined>

// Webpack replaces process.env with the browser-safe object. A typeof process
// guard would discard that injected object in browsers without a process global.
const processEnv: EnvMap = process.env

const expandKeyVariants = (key: string): string[] => {
  const variants = [key]
  if (!key.startsWith('REACT_APP_')) variants.push(`REACT_APP_${key}`)
  if (!key.startsWith('APP_')) variants.push(`APP_${key}`)
  if (!key.startsWith('AUTH_')) variants.push(`AUTH_${key}`)
  return Array.from(new Set(variants))
}

const readEnv = (key: string): string | undefined => {
  for (const candidate of expandKeyVariants(key)) {
    const value = processEnv[candidate]
    if (value !== undefined) return value
  }
  return undefined
}

export const getEnv = (key: string, fallback = ''): string => readEnv(key) ?? fallback

export const getEnvBool = (key: string, fallback = false): boolean => {
  const value = readEnv(key)
  if (value === undefined) return fallback

  const normalized = value.toLowerCase()
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false
  return fallback
}

export const getEnvNumber = (key: string, fallback: number): number => {
  const value = readEnv(key)
  if (value === undefined) return fallback

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

export default {
  getEnv,
  getEnvBool,
  getEnvNumber,
}
