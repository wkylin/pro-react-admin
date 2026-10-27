const RETRY_KEY = 'pro-react-admin:module-load-retry'
const RETRY_COOLDOWN_MS = 5 * 60 * 1000

type RecoveryOptions = {
  storage?: Pick<Storage, 'getItem' | 'setItem'>
  reload?: () => void
  now?: number
}

export const isModuleLoadFailure = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error)
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (?:CSS )?chunk .* failed|ChunkLoadError/i.test(
    message
  )
}

export const recoverModuleLoadFailure = (error: unknown, options: RecoveryOptions = {}): boolean => {
  if (!isModuleLoadFailure(error) || typeof window === 'undefined') return false

  try {
    const storage = options.storage ?? window.sessionStorage
    const now = options.now ?? Date.now()
    const previous = Number(storage.getItem(RETRY_KEY))
    if (previous > 0 && now - previous >= 0 && now - previous < RETRY_COOLDOWN_MS) return false

    storage.setItem(RETRY_KEY, String(now))
    const reload = options.reload ?? (() => window.location.reload())
    reload()
    return true
  } catch {
    return false
  }
}
