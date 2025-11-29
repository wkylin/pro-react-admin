import React, { useEffect, useRef, createContext, useContext, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// React 19.2+ 提供 Activity API；若存在则使用，用于更精确的激活/失活检测
const ActivityComponent = React && React.Activity ? React.Activity : null

const KeepAliveContext = createContext(false)

export const useKeepAliveContext = () => useContext(KeepAliveContext)

/**
 * Hook triggered when the component is activated
 * @param {Function} callback
 */
export const useActivate = (callback) => {
  const active = useKeepAliveContext()
  const mountedRef = useRef(false)

  useEffect(() => {
    if (active) {
      callback()
    }
    mountedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}

/**
 * Hook triggered when the component is deactivated (hidden)
 * @param {Function} callback
 */
export const useUnactivate = (callback) => {
  const active = useKeepAliveContext()
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current && !active) {
      callback()
    }
    mountedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}

const ensureHiddenContainer = () => {
  if (typeof document === 'undefined') return null
  let el = document.getElementById('__keepalive_hidden_root')
  if (!el) {
    el = document.createElement('div')
    el.id = '__keepalive_hidden_root'
    // Use fixed position and move out of viewport instead of display:none to keep internal state active if needed
    el.style.cssText =
      'position: fixed; left: -9999px; top: -9999px; width: 0; height: 0; overflow: hidden; pointer-events: none; opacity: 0; z-index: -1;'
    document.body.appendChild(el)
  }
  return el
}

// Global LRU Cache Manager
const createKeepAliveManager = () => {
  let limit = 10 // Default limit
  let keys = [] // LRU keys (most recent at end)
  const instances = new Map() // id -> { setShouldRender, persistOnUnmount }
  const activeMap = new Map() // id -> boolean
  const timeouts = new Map() // id -> timeoutId

  // global options for deactivate strategy
  let deactivateDelay = 3000 // ms to wait before hiding an inactive instance
  let keepInactiveCount = 1 // how many most-recent inactive instances to keep rendered

  return {
    setLimit: (n) => {
      limit = n
    },
    // set global options: { deactivateDelay, keepInactiveCount, limit }
    setOptions: (opts = {}) => {
      if (typeof opts.deactivateDelay === 'number') deactivateDelay = opts.deactivateDelay
      if (typeof opts.keepInactiveCount === 'number')
        keepInactiveCount = Math.max(0, Math.floor(opts.keepInactiveCount))
      if (typeof opts.limit === 'number') limit = Math.max(0, Math.floor(opts.limit))
    },
    register: (id, opts) => {
      // opts: { setShouldRender, persistOnUnmount }
      instances.set(id, { setShouldRender: opts.setShouldRender, persistOnUnmount: !!opts.persistOnUnmount })
    },
    unregister: (id) => {
      if (timeouts.has(id)) {
        clearTimeout(timeouts.get(id))
        timeouts.delete(id)
      }
      instances.delete(id)
      activeMap.delete(id)
      keys = keys.filter((k) => k !== id)
    },
    activate: (id) => {
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
        const instance = instances.get(idToDrop)
        if (instance && !instance.persistOnUnmount) {
          try {
            instance.setShouldRender(false)
          } catch (e) {
            /* ignore */
          }
        }
      }

      // Ensure current is rendered
      const current = instances.get(id)
      if (current) {
        try {
          current.setShouldRender(true)
        } catch (e) {
          /* ignore */
        }
      }
    },
    // advanced deactivate behavior: schedule hide with delay and preserve N most-recent inactive
    deactivate: (id) => {
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
          try {
            const inst = instances.get(id)
            if (inst) inst.setShouldRender(false)
          } catch (e) {
            /* ignore */
          }
        }

        timeouts.delete(id)
      }, deactivateDelay)

      timeouts.set(id, t)
    },
    // Force drop (unmount) an id regardless of persist flag
    forceDrop: (id) => {
      const instance = instances.get(id)
      if (instance) {
        try {
          instance.setShouldRender(false)
        } catch (e) {}
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

export const keepAliveManager = createKeepAliveManager()

const KeepAlive = ({ id, active = false, children, persistOnUnmount = false, cacheLimit }) => {
  const placeholderRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(true)
  const [activeState, setActiveState] = useState(!!active)
  const scrollPos = useRef(new Map())

  // Update global limit if provided
  useEffect(() => {
    if (cacheLimit) {
      keepAliveManager.setLimit(cacheLimit)
    }
  }, [cacheLimit])

  // Register to manager (pass persistOnUnmount so manager knows whether to keep rendered)
  useEffect(() => {
    if (id) {
      keepAliveManager.register(id, { setShouldRender, persistOnUnmount })
    }
    return () => {
      if (id) {
        keepAliveManager.unregister(id)
      }
    }
  }, [id, persistOnUnmount])

  // Notify manager on active
  useEffect(() => {
    if (active && id) {
      keepAliveManager.activate(id)
    }
  }, [active, id])

  // keep internal activeState in sync with parent prop when provided
  useEffect(() => {
    setActiveState(!!active)
  }, [active])

  // Initialize container once
  if (!containerRef.current && typeof document !== 'undefined') {
    const div = document.createElement('div')
    div.dataset.keepaliveId = id || ''
    // Ensure the container takes full space
    div.style.height = '100%'
    div.style.width = '100%'
    containerRef.current = div
  }

  // Scroll restoration logic
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = (e) => {
      if (!active) return
      scrollPos.current.set(e.target, {
        left: e.target.scrollLeft,
        top: e.target.scrollTop,
      })
    }

    // Capture scroll events to record positions
    container.addEventListener('scroll', onScroll, { capture: true, passive: true })

    return () => {
      container.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [active])

  // Mount/Unmount logic
  useEffect(() => {
    const container = containerRef.current
    const hidden = ensureHiddenContainer()

    // Initial placement in hidden container if not attached
    if (hidden && !container.parentNode) {
      hidden.appendChild(container)
    }

    return () => {
      // Cleanup on unmount
      if (!persistOnUnmount) {
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      } else {
        // If persisting, move back to hidden container
        if (hidden && container.parentNode !== hidden) {
          hidden.appendChild(container)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistOnUnmount])

  // Toggle visibility logic
  useLayoutEffect(() => {
    const container = containerRef.current
    const placeholder = placeholderRef.current
    const hidden = ensureHiddenContainer()

    if (!container || !placeholder || !hidden) return

    if (active && shouldRender) {
      // Restore scroll positions before showing (if possible, or right after)
      // Note: DOM move resets scroll, so we must restore AFTER move

      // Move to placeholder
      if (container.parentNode !== placeholder) {
        placeholder.appendChild(container)

        // Restore scroll positions
        scrollPos.current.forEach((pos, node) => {
          if (node.isConnected) {
            node.scrollLeft = pos.left
            node.scrollTop = pos.top
          }
        })
      }
    } else {
      // Move to hidden
      if (container.parentNode !== hidden) {
        hidden.appendChild(container)
      }
    }
  }, [active, shouldRender])

  // If Activity API is available, leverage it to control activation lifecycle
  if (ActivityComponent) {
    if (!shouldRender) return null

    const handleActive = () => {
      // when Activity marks active, ensure manager activates and mount into placeholder
      if (id) keepAliveManager.activate(id)
      setShouldRender(true)
      setActiveState(true)
      // move container into placeholder and restore scroll
      try {
        const container = containerRef.current
        const placeholder = placeholderRef.current
        if (container && placeholder && container.parentNode !== placeholder) {
          placeholder.appendChild(container)
          // restore scroll positions
          scrollPos.current.forEach((pos, node) => {
            if (node.isConnected) {
              node.scrollLeft = pos.left
              node.scrollTop = pos.top
            }
          })
        }
      } catch (e) {
        // ignore
      }
    }

    const handleInactive = () => {
      // when Activity marks inactive, move to hidden container and optionally stop rendering
      try {
        const container = containerRef.current
        const hidden = ensureHiddenContainer()
        if (container && hidden && container.parentNode !== hidden) {
          hidden.appendChild(container)
        }
      } catch (e) {
        // ignore
      }
      if (!persistOnUnmount) {
        setShouldRender(false)
      }
      setActiveState(false)
      if (id && keepAliveManager.deactivate) keepAliveManager.deactivate(id)
    }

    return (
      <KeepAliveContext.Provider value={activeState}>
        <ActivityComponent onActive={handleActive} onInactive={handleInactive}>
          <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
          {containerRef.current && createPortal(children, containerRef.current)}
        </ActivityComponent>
      </KeepAliveContext.Provider>
    )
  }

  if (!shouldRender) return null

  return (
    <KeepAliveContext.Provider value={active}>
      <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
      {containerRef.current && createPortal(children, containerRef.current)}
    </KeepAliveContext.Provider>
  )
}

export default KeepAlive
