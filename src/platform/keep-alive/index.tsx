import React, { useEffect, useRef, createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

interface KeepAliveInstance {
  setShouldRender: React.Dispatch<React.SetStateAction<boolean>>
  persistOnUnmount: boolean
}

interface KeepAliveOptions {
  deactivateDelay?: number
  keepInactiveCount?: number
  limit?: number
}

interface KeepAliveManager {
  setLimit: (limit: number) => void
  setOptions: (options?: KeepAliveOptions) => void
  register: (id: string, instance: KeepAliveInstance) => void
  unregister: (id: string) => void
  activate: (id: string) => void
  deactivate: (id: string) => void
  forceDrop: (id: string) => void
}

interface KeepAliveProps {
  id?: string
  active?: boolean
  children?: React.ReactNode
  persistOnUnmount?: boolean
  cacheLimit?: number
}

declare global {
  interface Window {
    __keepAliveManager?: KeepAliveManager
  }
}

const KeepAliveContext = createContext(false)

export const useKeepAliveContext = () => useContext(KeepAliveContext)

/**
 * Hook triggered when the component is activated
 * @param {Function} callback
 */
export const useActivate = (callback: () => void) => {
  const active = useKeepAliveContext()
  const mountedRef = useRef(false)

  useEffect(() => {
    if (active) {
      callback()
    }
    mountedRef.current = true
  }, [active])
}

/**
 * Hook triggered when the component is deactivated (hidden)
 * @param {Function} callback
 */
export const useUnactivate = (callback: () => void) => {
  const active = useKeepAliveContext()
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current && !active) {
      callback()
    }
    mountedRef.current = true
  }, [active])
}

// Global LRU Cache Manager
const createKeepAliveManager = () => {
  let limit = 10 // Default limit
  let keys: string[] = [] // LRU keys (most recent at end)
  const instances = new Map<string, KeepAliveInstance>() // id -> { setShouldRender, persistOnUnmount }
  const activeMap = new Map<string, boolean>() // id -> boolean
  const timeouts = new Map<string, ReturnType<typeof setTimeout>>() // id -> timeoutId

  // global options for deactivate strategy
  let deactivateDelay = 3000 // ms to wait before hiding an inactive instance
  let keepInactiveCount = 1 // how many most-recent inactive instances to keep rendered

  const safeInvoke = (fn: () => void, label: string) => {
    try {
      fn()
    } catch (err) {
      // 仅在开发环境输出，避免生产环境噪音；同时满足 Sonar 对异常处理的要求
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[KeepAlive] ${label} failed`, err)
      }
    }
  }

  return {
    setLimit: (n: number) => {
      limit = n
    },
    // set global options: { deactivateDelay, keepInactiveCount, limit }
    setOptions: (opts: KeepAliveOptions = {}) => {
      if (typeof opts.deactivateDelay === 'number') deactivateDelay = opts.deactivateDelay
      if (typeof opts.keepInactiveCount === 'number')
        keepInactiveCount = Math.max(0, Math.floor(opts.keepInactiveCount))
      if (typeof opts.limit === 'number') limit = Math.max(0, Math.floor(opts.limit))
    },
    register: (id: string, opts: KeepAliveInstance) => {
      // opts: { setShouldRender, persistOnUnmount }
      instances.set(id, {
        setShouldRender: opts.setShouldRender,
        persistOnUnmount: !!opts.persistOnUnmount,
      })
    },
    unregister: (id: string) => {
      if (timeouts.has(id)) {
        clearTimeout(timeouts.get(id))
        timeouts.delete(id)
      }
      instances.delete(id)
      activeMap.delete(id)
      keys = keys.filter((k) => k !== id)
    },
    activate: (id: string) => {
      // Move to end (most recently used)
      keys = keys.filter((k) => k !== id)
      keys.push(id)
      activeMap.set(id, true)

      // cancel any pending hide timer for this id
      if (timeouts.has(id)) {
        clearTimeout(timeouts.get(id))
        timeouts.delete(id)
      }

      // Check limit and evict least-recent non-persistent entries
      while (keys.length > limit) {
        const idToDrop = keys.shift()
        const instance = idToDrop ? instances.get(idToDrop) : undefined
        if (instance && !instance.persistOnUnmount) {
          safeInvoke(() => instance.setShouldRender(false), `setShouldRender(false) for ${idToDrop}`)
        }
      }

      // Ensure current is rendered
      const current = instances.get(id)
      if (current) {
        safeInvoke(() => current.setShouldRender(true), `setShouldRender(true) for ${id}`)
      }
    },
    // advanced deactivate behavior: schedule hide with delay and preserve N most-recent inactive
    deactivate: (id: string) => {
      // mark inactive
      activeMap.set(id, false)
      const instance = instances.get(id)
      if (!instance) return

      // move id to front (least recently used) so it becomes a candidate for eviction
      keys = keys.filter((k) => k !== id)
      keys.unshift(id)

      // If instance is persistent, do nothing
      if (instance.persistOnUnmount) return

      // cancel existing timer
      if (timeouts.has(id)) {
        clearTimeout(timeouts.get(id))
        timeouts.delete(id)
      }

      const t = setTimeout(() => {
        // if reactivated meanwhile, skip
        if (activeMap.get(id)) {
          timeouts.delete(id)
          return
        }

        // compute inactive rendered ids (non-persistent) in LRU order
        const inactiveRendered = keys.filter((k) => {
          const inst = instances.get(k)
          return inst && !activeMap.get(k) && !inst.persistOnUnmount
        })

        // preserve the last `keepInactiveCount` of them (most recently used)
        const preserved = inactiveRendered.slice(-keepInactiveCount)

        if (!preserved.includes(id)) {
          const inst = instances.get(id)
          if (inst) {
            safeInvoke(() => inst.setShouldRender(false), `setShouldRender(false) for ${id}`)
          }
        }

        timeouts.delete(id)
      }, deactivateDelay)

      timeouts.set(id, t)
    },
    // Force drop (unmount) an id regardless of persist flag
    forceDrop: (id: string) => {
      const instance = instances.get(id)
      if (instance) {
        safeInvoke(() => instance.setShouldRender(false), `forceDrop setShouldRender(false) for ${id}`)
      }
      if (timeouts.has(id)) {
        clearTimeout(timeouts.get(id))
        timeouts.delete(id)
      }
      instances.delete(id)
      activeMap.delete(id)
      keys = keys.filter((k) => k !== id)
    },
  }
}

// 优化：支持 HMR (热更新)
// 在开发环境下，将 manager 挂载到 window 上，防止模块重载导致 manager 状态丢失
let manager: KeepAliveManager
if (typeof window !== 'undefined') {
  if (!window.__keepAliveManager) {
    window.__keepAliveManager = createKeepAliveManager()
  }
  manager = window.__keepAliveManager
} else {
  manager = createKeepAliveManager()
}

export const keepAliveManager = manager

const KeepAlive = ({ id, active = false, children, persistOnUnmount = false, cacheLimit }: KeepAliveProps) => {
  const [shouldRender, setShouldRender] = useState(true)

  // Update global limit if provided
  useEffect(() => {
    if (cacheLimit !== undefined) {
      keepAliveManager.setLimit(cacheLimit)
    }
  }, [cacheLimit])

  // Register to manager (pass persistOnUnmount so manager knows whether to keep rendered)
  useEffect(() => {
    if (id) {
      keepAliveManager.register(id, {
        setShouldRender,
        persistOnUnmount,
      })
    }
    return () => {
      if (id) {
        keepAliveManager.unregister(id)
      }
    }
  }, [id, persistOnUnmount])

  // Keep the LRU cache in sync with the active pane.
  useEffect(() => {
    if (!id) return
    if (active) {
      keepAliveManager.activate(id)
      return
    }
    keepAliveManager.deactivate(id)
  }, [active, id])

  if (!shouldRender) return null

  return (
    <KeepAliveContext.Provider value={active}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: active ? 'block' : 'none',
        }}
      >
        {children}
      </div>
    </KeepAliveContext.Provider>
  )
}

KeepAlive.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
  persistOnUnmount: PropTypes.bool,
  cacheLimit: PropTypes.number,
}

export default KeepAlive
