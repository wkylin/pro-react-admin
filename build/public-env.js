const PUBLIC_ENV_KEYS = [
  'APP_BASE_URL',
  'DEPLOYED_ENV',
  'IFRAME_ORIGIN',
  'PROJECTB_STANDALONE_ORIGIN',
  'REACT_APP_GITHUB_CLIENT_ID',
  'REACT_APP_GITHUB_REDIRECT_URI',
  'REACT_APP_USE_MOCK',
  'SENTRY_DSN',
]

/**
 * Build the explicit environment surface that may be embedded in browser code.
 * Values such as OAuth client secrets and account passwords must stay server-side.
 * VITE_* values are public by convention and are included for Vite-native config.
 *
 * @param {{ mode: string, project: string, source?: Record<string, string | undefined> }} options
 * @returns {Record<string, string>}
 */
export function createPublicEnv({ mode, project, source = {} }) {
  const result = {
    NODE_ENV: mode,
    PROJECT: project,
  }

  for (const key of PUBLIC_ENV_KEYS) {
    const value = source[key]
    if (value !== undefined) result[key] = value
  }

  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('VITE_') && value !== undefined) result[key] = value
  }

  return result
}
