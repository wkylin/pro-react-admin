type EnvMap = Readonly<Record<string, string | undefined>>

const env: EnvMap = typeof __APP_ENV__ !== 'undefined' ? __APP_ENV__ : typeof process !== 'undefined' ? process.env : {}

const readEnv = (key: string): string | undefined => env[key]

export const getEnv = (key: string, fallback = ''): string => readEnv(key) ?? fallback

export const getEnvBool = (key: string, fallback = false): boolean => {
  const value = readEnv(key)
  if (value === undefined) return fallback

  const normalized = value.trim().toLowerCase()
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
