import { clientEnvKeys } from './client-env.js'

/**
 * Build the explicit environment surface that may be embedded in browser code.
 * Values such as OAuth client secrets and account passwords must stay server-side.
 *
 * @param {{ mode: string, project: string, source?: Record<string, string | undefined> }} options
 * @returns {Record<string, string>}
 */
export function createPublicEnv({ mode, project, source = {} }) {
  const result = {
    NODE_ENV: source.NODE_ENV || (mode === 'production' ? 'production' : 'development'),
    PROJECT: project,
  }

  for (const key of clientEnvKeys) {
    const value = source[key]
    if (value !== undefined) result[key] = value
  }

  return result
}
