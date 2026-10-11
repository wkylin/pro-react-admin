const sessionKeys = [
  'token',
  'github_token',
  'github_user',
  'user_permissions',
  'permissions_fetch_time',
  'permissions_auth_key',
  'user_role',
  'force_demo_switch',
] as const

export const SESSION_CHANGED_EVENT = 'pro-react-admin:session-changed'

export function readStoredToken(): string | null {
  for (const key of ['token', 'github_token']) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) continue
      try {
        const parsed: unknown = JSON.parse(raw)
        if (typeof parsed === 'string' && parsed) return parsed
        if (
          parsed &&
          typeof parsed === 'object' &&
          'token' in parsed &&
          typeof parsed.token === 'string' &&
          parsed.token
        ) {
          return parsed.token
        }
      } catch {
        return raw
      }
    } catch {
      return null
    }
  }
  return null
}

export function clearSession(): void {
  for (const key of sessionKeys) {
    try {
      localStorage.removeItem(key)
    } catch {
      /* Storage may be unavailable. */
    }
  }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
}

/** Forbidden requests do not invalidate a valid session. */
export function handleAuthenticationFailure(status?: number, code?: number | string): void {
  if (status !== 401 && code !== 401 && code !== 41002) return
  clearSession()
  if (typeof window !== 'undefined' && !window.location.hash.startsWith('#/signin')) {
    window.location.hash = '#/signin'
  }
}
