import React, { useEffect, useRef, createContext, useContext, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

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
  let keys = [] // LRU keys
  const instances = new Map() // id -> { setShouldRender }

  return {
    setLimit: (n) => {
      limit = n
    },
    register: (id, setShouldRender) => {
      instances.set(id, { setShouldRender })
    },
    unregister: (id) => {
      instances.delete(id)
      keys = keys.filter((k) => k !== id)
    },
    activate: (id) => {
      // Move to end (most recently used)
      keys = keys.filter((k) => k !== id)
      keys.push(id)

      // Check limit
      while (keys.length > limit) {
        const idToDrop = keys.shift()
        const instance = instances.get(idToDrop)
        if (instance) {
          instance.setShouldRender(false)
        }
      }

      // Ensure current is rendered
      const current = instances.get(id)
      if (current) {
        current.setShouldRender(true)
      }
    },
  }
}

export const keepAliveManager = createKeepAliveManager()

const KeepAlive = ({ id, active = false, children, persistOnUnmount = false, cacheLimit }) => {
  const placeholderRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(true)
  const scrollPos = useRef(new Map())

  // Update global limit if provided
  useEffect(() => {
    if (cacheLimit) {
      keepAliveManager.setLimit(cacheLimit)
    }
  }, [cacheLimit])

  // Register to manager
  useEffect(() => {
    if (id) {
      keepAliveManager.register(id, setShouldRender)
    }
    return () => {
      if (id) {
        keepAliveManager.unregister(id)
      }
    }
  }, [id])

  // Notify manager on active
  useEffect(() => {
    if (active && id) {
      keepAliveManager.activate(id)
    }
  }, [active, id])

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

  if (!shouldRender) return null

  return (
    <KeepAliveContext.Provider value={active}>
      <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
      {containerRef.current && createPortal(children, containerRef.current)}
    </KeepAliveContext.Provider>
  )
}

export default KeepAlive
