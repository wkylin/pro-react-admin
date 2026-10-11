import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

interface KeepAliveInstance {
  setShouldRender: Dispatch<SetStateAction<boolean>>
  persistOnUnmount: boolean
}
export interface KeepAliveOptions {
  deactivateDelay?: number
  keepInactiveCount?: number
  limit?: number
}

/** The cache belongs to one application root, never to window or a remote container. */
export function createKeepAliveManager(options: KeepAliveOptions = {}) {
  let limit = options.limit ?? 5
  let deactivateDelay = options.deactivateDelay ?? 500
  let keepInactiveCount = options.keepInactiveCount ?? 5
  let keys: string[] = []
  const instances = new Map<string, KeepAliveInstance>()
  const active = new Set<string>()
  const timers = new Map<string, ReturnType<typeof setTimeout>>()
  const cancel = (id: string) => {
    clearTimeout(timers.get(id))
    timers.delete(id)
  }
  const drop = (id: string) => {
    cancel(id)
    instances.get(id)?.setShouldRender(false)
    keys = keys.filter((key) => key !== id)
  }
  const evict = () => {
    const cached = keys.filter((id) => !instances.get(id)?.persistOnUnmount)
    while (cached.length > limit) {
      const index = cached.findIndex((id) => !active.has(id))
      if (index < 0) break
      drop(cached.splice(index, 1)[0])
    }
  }
  const manager = {
    setLimit(next: number) {
      limit = Math.max(0, Math.floor(next))
      evict()
    },
    setOptions(next: KeepAliveOptions = {}) {
      if (next.limit !== undefined) manager.setLimit(next.limit)
      if (next.deactivateDelay !== undefined) deactivateDelay = Math.max(0, next.deactivateDelay)
      if (next.keepInactiveCount !== undefined) keepInactiveCount = Math.max(0, Math.floor(next.keepInactiveCount))
    },
    register(id: string, instance: KeepAliveInstance) {
      if (instances.has(id)) throw new Error(`Duplicate KeepAlive id within application: ${id}`)
      instances.set(id, instance)
    },
    unregister(id: string) {
      cancel(id)
      instances.delete(id)
      active.delete(id)
      keys = keys.filter((key) => key !== id)
    },
    activate(id: string) {
      cancel(id)
      active.add(id)
      keys = [...keys.filter((key) => key !== id), id]
      instances.get(id)?.setShouldRender(true)
      evict()
    },
    deactivate(id: string) {
      active.delete(id)
      cancel(id)
      if (!instances.has(id) || instances.get(id)?.persistOnUnmount) return
      evict()
      timers.set(
        id,
        setTimeout(() => {
          timers.delete(id)
          if (active.has(id)) return
          const inactive = keys.filter((key) => !active.has(key) && !instances.get(key)?.persistOnUnmount)
          const retained = keepInactiveCount === 0 ? [] : inactive.slice(-keepInactiveCount)
          if (!retained.includes(id)) drop(id)
        }, deactivateDelay)
      )
    },
    forceDrop(id: string) {
      drop(id)
    },
    dispose() {
      for (const id of timers.keys()) cancel(id)
      instances.clear()
      active.clear()
      keys = []
    },
  }
  return manager
}

// Compatibility for standalone consumers. Applications always install a provider.
export const keepAliveManager = createKeepAliveManager()
const ManagerContext = createContext(keepAliveManager)
const ActiveContext = createContext(false)
export const useKeepAliveManager = () => useContext(ManagerContext)
export const useKeepAliveContext = () => useContext(ActiveContext)

export function KeepAliveProvider({ children, options }: { children: ReactNode; options?: KeepAliveOptions }) {
  const [manager] = useState(() => createKeepAliveManager(options))
  useEffect(() => () => manager.dispose(), [manager])
  return <ManagerContext.Provider value={manager}>{children}</ManagerContext.Provider>
}

export function useActivate(callback: () => void) {
  const active = useKeepAliveContext()
  useEffect(() => {
    if (active) callback()
  }, [active])
}
export function useUnactivate(callback: () => void) {
  const active = useKeepAliveContext()
  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current && !active) callback()
    mounted.current = true
  }, [active])
}

export default function KeepAlive({
  id,
  active = false,
  children,
  persistOnUnmount = false,
  cacheLimit,
}: {
  id?: string
  active?: boolean
  children?: ReactNode
  persistOnUnmount?: boolean
  cacheLimit?: number
}) {
  const manager = useKeepAliveManager()
  const [shouldRender, setShouldRender] = useState(true)
  useEffect(() => {
    if (cacheLimit !== undefined) manager.setLimit(cacheLimit)
  }, [cacheLimit, manager])
  useEffect(() => {
    if (!id) return
    manager.register(id, { setShouldRender, persistOnUnmount })
    return () => manager.unregister(id)
  }, [id, persistOnUnmount, manager])
  useEffect(() => {
    if (!id) return
    if (active) manager.activate(id)
    else manager.deactivate(id)
  }, [active, id, manager])
  if (!shouldRender) return null
  return (
    <ActiveContext.Provider value={active}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: active ? 'block' : 'none' }}>
        {children}
      </div>
    </ActiveContext.Provider>
  )
}
