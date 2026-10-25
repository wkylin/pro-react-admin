import { getEnvBool } from '@platform/config/env'

const sessionKeys = [
  'enterprise_session',
  'token',
  'github_token',
  'github_user',
  'github_demo_user',
  'user_permissions',
  'permissions_fetch_time',
  'permissions_auth_key',
  'user_role',
  'force_demo_switch',
] as const

export const SESSION_CHANGED_EVENT = 'pro-react-admin:session-changed'

export interface EnterpriseSession {
  token: string
  tenantId: string
  expiresAt: number
  user: { id: string; name: string; email: string }
}
export function parseEnterpriseSession(value: unknown): EnterpriseSession {
  if (!value || typeof value !== 'object') throw new Error('无效的业务会话')
  const session = value as Record<string, unknown>
  const user = session.user as Record<string, unknown> | undefined
  if (
    typeof session.token !== 'string' ||
    !/^[A-Za-z0-9_-]{43}$/.test(session.token) ||
    typeof session.tenantId !== 'string' ||
    !/^[a-z][a-z0-9_-]*$/.test(session.tenantId) ||
    typeof session.expiresAt !== 'number' ||
    !Number.isFinite(session.expiresAt) ||
    !user ||
    typeof user.id !== 'string' ||
    typeof user.name !== 'string' ||
    typeof user.email !== 'string'
  )
    throw new Error('无效的业务会话')
  return {
    token: session.token,
    tenantId: session.tenantId,
    expiresAt: session.expiresAt,
    user: { id: user.id, name: user.name, email: user.email },
  }
}
export function readEnterpriseSession(): EnterpriseSession | null {
  try {
    const raw = localStorage.getItem('enterprise_session')
    if (!raw) return null
    const session = parseEnterpriseSession(JSON.parse(raw))
    return session.expiresAt > Date.now() ? session : null
  } catch {
    return null
  }
}
export function saveEnterpriseSession(session: EnterpriseSession): void {
  if (session.expiresAt <= Date.now()) throw new Error('业务会话已过期')
  // Persist once before notifying consumers; an unavailable storage leaves the user signed out.
  localStorage.setItem('enterprise_session', JSON.stringify(session))
  for (const key of sessionKeys) if (key !== 'enterprise_session') localStorage.removeItem(key)
  window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
}
export function getSessionIdentity(): string {
  const session = readEnterpriseSession()
  return session ? `tenant:${session.tenantId}|token:${session.token}` : `token:${readStoredToken() || ''}`
}
export function subscribeSession(listener: () => void): () => void {
  let expiry: ReturnType<typeof setTimeout> | undefined
  const changed = () => {
    clearTimeout(expiry)
    const session = readEnterpriseSession()
    if (session)
      expiry = setTimeout(
        () => {
          // A session renewed in another tab must not be cleared by this old timer.
          if (readEnterpriseSession()?.token === session.token) changed()
          else if (!readEnterpriseSession()) clearSession()
        },
        Math.max(1, Math.min(session.expiresAt - Date.now() + 1, 2_147_483_647))
      )
    listener()
  }
  const storage = (event: StorageEvent) => {
    if (event.key === null || sessionKeys.some((key) => key === event.key)) changed()
  }
  window.addEventListener('storage', storage)
  window.addEventListener(SESSION_CHANGED_EVENT, changed)
  window.addEventListener('focus', changed)
  changed()
  return () => {
    clearTimeout(expiry)
    window.removeEventListener('storage', storage)
    window.removeEventListener(SESSION_CHANGED_EVENT, changed)
    window.removeEventListener('focus', changed)
  }
}

/** Explicit credentials may belong to an old session or an independent upstream service. */
export function getRequestIdentity(authorization?: string): string {
  return authorization && authorization !== `Bearer ${readStoredToken()}` ? 'external-credential' : getSessionIdentity()
}

export function readStoredToken(): string | null {
  try {
    if (localStorage.getItem('enterprise_session')) return readEnterpriseSession()?.token ?? null
  } catch {
    return null
  }
  // Legacy demo credentials are never an authentication fallback in tenant mode.
  if (!getEnvBool('REACT_APP_USE_MOCK', false)) return null
  try {
    const stored = localStorage.getItem('github_demo_user')
    if (stored) {
      const user: unknown = JSON.parse(stored)
      if (
        user &&
        typeof user === 'object' &&
        'id' in user &&
        typeof user.id === 'number' &&
        Number.isSafeInteger(user.id) &&
        user.id > 0 &&
        'login' in user &&
        typeof user.login === 'string' &&
        user.login
      )
        return `github-demo:${user.id}`
    }
  } catch {
    return null
  }
  for (const key of ['token']) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) continue
      try {
        const parsed: unknown = JSON.parse(raw)
        if (
          parsed &&
          typeof parsed === 'object' &&
          !Array.isArray(parsed) &&
          'token' in parsed &&
          typeof parsed.token === 'string' &&
          parsed.token
        ) {
          return parsed.token
        }
      } catch {
        // Ignore obsolete raw-string credentials; current demo storage is JSON.
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
export function handleAuthenticationFailure(status?: number, code?: number | string, identity?: string): void {
  if (status !== 401 && code !== 401 && code !== 41002) return
  if (identity !== undefined && identity !== getSessionIdentity()) return
  clearSession()
  if (typeof window !== 'undefined' && !window.location.hash.startsWith('#/signin')) {
    window.location.hash = '#/signin'
  }
}
