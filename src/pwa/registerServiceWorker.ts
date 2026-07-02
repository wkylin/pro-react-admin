import { emitPwaUpdateReady, type PwaBuildMeta } from './events'

const isServiceWorkerAvailable = async () => {
  if (!('serviceWorker' in navigator)) return false
  if (process.env.NODE_ENV !== 'production') return false

  try {
    const response = await fetch('/sw.js', {
      method: 'HEAD',
      cache: 'no-store',
    })

    if (!response.ok) return false

    const contentType = response.headers.get('content-type')?.toLowerCase() || ''
    return !contentType.includes('text/html')
  } catch {
    return false
  }
}

let hasPromptedForUpdate = false
let hasPendingReload = false

const readNextBuildMeta = async (): Promise<PwaBuildMeta | null> => {
  try {
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) return null

    const meta = (await response.json()) as Partial<PwaBuildMeta>
    if (!meta.version || !meta.buildTime) return null

    return {
      version: String(meta.version),
      buildTime: String(meta.buildTime),
    }
  } catch {
    return null
  }
}

const promptForServiceWorkerUpdate = async (registration: ServiceWorkerRegistration) => {
  if (hasPromptedForUpdate || !registration.waiting) return

  hasPromptedForUpdate = true
  const meta = await readNextBuildMeta()

  emitPwaUpdateReady({
    meta,
    applyUpdate: async () => {
      if (!registration.waiting) return
      hasPendingReload = true
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    },
  })
}

const bindServiceWorkerLifecycle = (registration: ServiceWorkerRegistration) => {
  if (registration.waiting) {
    void promptForServiceWorkerUpdate(registration)
  }

  registration.addEventListener('updatefound', () => {
    const installing = registration.installing
    if (!installing) return

    installing.addEventListener('statechange', () => {
      if (installing.state === 'installed' && navigator.serviceWorker.controller) {
        void promptForServiceWorkerUpdate(registration)
      }
    })
  })

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hasPendingReload) return
    window.location.reload()
  })
}

export const registerServiceWorker = () => {
  void (async () => {
    if (!(await isServiceWorkerAvailable())) return

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      bindServiceWorkerLifecycle(registration)
      void registration.update().catch(() => undefined)
    } catch (error) {
      console.warn('[pwa] Failed to register service worker.', error)
    }
  })()
}
