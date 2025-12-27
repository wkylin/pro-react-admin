import React, { useEffect, useRef, createContext, useContext, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

// React 19.2+ 提供 Activity API；若存在则使用，用于更精确的激活/失活检测
const ActivityComponent = React?.Activity ?? null

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

  const safeInvoke = (fn, label) => {
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
      instances.set(id, {
        setShouldRender: opts.setShouldRender,
        persistOnUnmount: !!opts.persistOnUnmount,
      })
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
    forceDrop: (id) => {
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
let manager
if (typeof window !== 'undefined') {
  if (!window.__keepAliveManager) {
    window.__keepAliveManager = createKeepAliveManager()
  }
  manager = window.__keepAliveManager
} else {
  manager = createKeepAliveManager()
}

export const keepAliveManager = manager

const KeepAlive = ({ id, active = false, children, persistOnUnmount = false, cacheLimit }) => {
  const placeholderRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(true)
  const scrollPos = useRef(new Map())

  // Activity 模式下需要一个受控的可见性开关（用于延迟隐藏，给副作用留出执行时间）
  const [isActivityVisible, setIsActivityVisible] = useState(active)

  // Update global limit if provided
  useEffect(() => {
    if (cacheLimit) {
      keepAliveManager.setLimit(cacheLimit)
    }
  }, [cacheLimit])

  // Register to manager (pass persistOnUnmount so manager knows whether to keep rendered)
  useEffect(() => {
    if (id) {
      // 优化：如果使用 ActivityComponent，我们强制认为它是持久化的，
      // 防止 Manager 在超时后销毁组件，从而避免状态丢失（如视频重播）。
      // Activity 模式下，隐藏的开销很小，适合保留状态。
      const effectivePersist = ActivityComponent ? true : persistOnUnmount
      keepAliveManager.register(id, {
        setShouldRender,
        persistOnUnmount: effectivePersist,
      })
    }
    return () => {
      if (id) {
        keepAliveManager.unregister(id)
      }
    }
  }, [id, persistOnUnmount])

  // Notify manager on active; Activity 模式下同步 deactivate（非 Activity 维持原有行为，不触发 deactivate）
  useEffect(() => {
    if (!id) return
    if (active) {
      keepAliveManager.activate(id)
      return
    }
    if (ActivityComponent) {
      keepAliveManager.deactivate(id)
    }
  }, [active, id])

  useEffect(() => {
    if (!ActivityComponent) return
    let showTimer = null
    if (active) {
      // schedule state update asynchronously to avoid cascading render warnings
      showTimer = setTimeout(() => setIsActivityVisible(true), 0)
      return () => clearTimeout(showTimer)
    }

    const timer = setTimeout(() => {
      setIsActivityVisible(false)
    }, 16)

    return () => {
      clearTimeout(timer)
      if (showTimer) clearTimeout(showTimer)
    }
  }, [active])

  // Initialize container once (move DOM mutations into effect to satisfy hooks rules)
  const [containerNode, setContainerNode] = useState(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (containerRef.current) {
      setContainerNode(containerRef.current)
      return
    }

    // 优化：支持 HMR (热更新) —— 在开发环境下尝试复用已存在的 DOM 节点
    let existing = null
    try {
      if (process.env.NODE_ENV === 'development' && id) {
        const hidden = document.getElementById('__keepalive_hidden_root')
        if (hidden) {
          existing = hidden.querySelector(`[data-keepalive-id="${id}"]`)
        }
      }
    } catch (err) {
      existing = null
    }

    if (existing) {
      containerRef.current = existing
    } else {
      const div = document.createElement('div')
      div.dataset.keepaliveId = id || ''
      // Ensure the container takes full space
      div.style.height = '100%'
      div.style.width = '100%'
      containerRef.current = div
    }

    setContainerNode(containerRef.current)
    if (process.env.NODE_ENV === 'development') {
      try {
         
        console.debug('[KeepAlive] setContainerNode', id, containerRef.current)
      } catch (e) {}
    }
    // no cleanup here; mount/unmount handled elsewhere
  }, [id])

  // Scroll restoration logic
  useEffect(() => {
    const target = ActivityComponent ? placeholderRef.current : containerRef.current
    if (!target) return

    const onScroll = (e) => {
      if (!active) return
      scrollPos.current.set(e.target, {
        left: e.target.scrollLeft,
        top: e.target.scrollTop,
      })
    }

    // Capture scroll events to record positions
    target.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })

    return () => {
      target.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [active])

  // Mount/Unmount logic
  useEffect(() => {
    const container = containerRef.current
    // const hidden = ensureHiddenContainer() // 移除这里原本的 ensureHiddenContainer 逻辑，不要在挂载时立即移动

    // 初始化样式
    if (container) {
      container.style.display = active ? 'block' : 'none'
    }

    return () => {
      // Cleanup on unmount
      if (!persistOnUnmount) {
        container?.parentNode?.removeChild(container)
      } else {
        // 只有在组件真正卸载且需要持久化时，才移动到隐藏容器
        const hidden = ensureHiddenContainer()
        if (container && hidden) {
          hidden.appendChild(container)
        }
      }
    }
  }, [persistOnUnmount])

  // Toggle visibility logic
  useLayoutEffect(() => {
    const container = containerRef.current
    const placeholder = placeholderRef.current

    if (!container || !placeholder) return

    // If React Activity API is available, avoid moving DOM to prevent forced reflows.
    // Render children inline into the placeholder and point container refs to placeholder.
    if (ActivityComponent) {
      try {
        containerRef.current = placeholder
        setContainerNode(placeholder)
      } catch (e) {}
      return
    }

    // 如果 container 还在隐藏容器里（比如从缓存恢复），把它移到当前占位符下
    if (container.parentNode !== placeholder) {
      // 在移动 DOM 之前，发送自定义事件通知子组件，然后同步移动到占位符下。
      // 之前使用短延迟的异步移动会导致渲染滞后和大量定时器/帧回调，移到同步移动以提升响应性。
      const event = new CustomEvent('keepalive-dom-move', {
        detail: { from: container.parentNode, to: placeholder },
      })

      let dispatchError = null
      try {
        container.dispatchEvent(event)
      } catch (e) {
        dispatchError = String(e && e.message)
      }

      if (process.env.NODE_ENV === 'development') {
        try {
           
          console.debug('[KeepAlive] appending container to placeholder', id, {
            from: container.parentNode,
            to: placeholder,
            dispatchError,
          })
        } catch (e) {}
      }

      let appended = false
      try {
        if (container.parentNode !== placeholder) {
          container.dataset.keepaliveAttached = String(Date.now())
          placeholder.appendChild(container)
          appended = true

          // Watchdog: if children not mounted soon after append, record and mark on body
          try {
            setTimeout(() => {
              try {
                if (container.childElementCount === 0) {
                  if (typeof window !== 'undefined') {
                    window.__keepalive_debug_details = window.__keepalive_debug_details || []
                    window.__keepalive_debug_details.push({
                      id,
                      note: 'no-children-after-append',
                      childElementCount: container.childElementCount,
                      time: Date.now(),
                    })
                    try {
                      document.body.dataset.keepaliveIssue = 'no-children'
                    } catch (e) {}
                  }
                }
              } catch (e) {}
            }, 50)
          } catch (e) {}
        }
      } catch (e) {
        // swallow; we'll record below
      }

      // 记录附加信息，包含父节点信息与子元素计数，便于生产环境排查
      try {
        if (typeof window !== 'undefined') {
          window.__keepalive_debug_details = window.__keepalive_debug_details || []
          window.__keepalive_debug_details.push({
            id,
            parentTag: container.parentNode ? container.parentNode.tagName : null,
            parentClass: container.parentNode ? container.parentNode.className : null,
            childElementCount: container.childElementCount,
            appended,
            dispatchError,
            time: Date.now(),
          })
        }
      } catch (e) {}

      // If we just appended and this instance is active, clear any stray inline "display: none" styles
      if (appended && active && shouldRender) {
        try {
          // run in next frame to let other sync updates finish
          requestAnimationFrame(() => {
            try {
              const cleared = []
              // Limit to direct descendants first for safety
              const nodes = Array.from(container.querySelectorAll('*'))
              nodes.forEach((el) => {
                try {
                  if (el && el.style && el.style.display === 'none') {
                    el.style.removeProperty('display')
                    cleared.push(el.tagName)
                  }
                } catch (e) {}
              })

              // Ensure the root keepalive node is visible (force with !important)
              try {
                const root = container.querySelector(`[data-keepalive-id="${id}"]`)
                if (root && root.style) {
                  root.style.setProperty('display', 'block', 'important')
                }
              } catch (e) {}

              if (typeof window !== 'undefined') {
                window.__keepalive_debug_details = window.__keepalive_debug_details || []
                window.__keepalive_debug_details.push({
                  id,
                  note: 'cleared-inline-display-none',
                  clearedCount: cleared.length,
                  clearedTagsSample: cleared.slice(0, 5),
                  time: Date.now(),
                })
              }
            } catch (e) {}
          })
        } catch (e) {}
      }

      // Ensure root visible when active (force with !important) — covers cases where append didn't run
      if (active && shouldRender) {
        try {
          const root = container.querySelector(`[data-keepalive-id="${id}"]`)
          if (root && root.style) {
            root.style.setProperty('display', 'block', 'important')
            // also remove any stray inline display:none on descendants
            try {
              const nodes = Array.from(container.querySelectorAll('*'))
              nodes.forEach((el) => {
                try {
                  if (el && el.style && el.style.display === 'none') {
                    el.style.removeProperty('display')
                  }
                } catch (e) {}
              })
            } catch (e) {}

            if (typeof window !== 'undefined') {
              window.__keepalive_debug_details = window.__keepalive_debug_details || []
              window.__keepalive_debug_details.push({
                id,
                note: 'force-visible-root',
                time: Date.now(),
              })
            }
          }
        } catch (e) {}
      }

      // Restore scroll positions
      scrollPos.current.forEach((pos, node) => {
        if (node.isConnected) {
          node.scrollLeft = pos.left
          node.scrollTop = pos.top
        }
      })
    } else {
      // 失活时：仅隐藏，不移动 DOM
      container.style.display = 'none'
    }
  }, [active, shouldRender])

  // Record lightweight runtime debug info in an effect (avoid doing impure work during render)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!shouldRender) return
    try {
      window.__keepalive_debug = window.__keepalive_debug || []
      window.__keepalive_debug.push({
        id,
        active,
        shouldRender,
        containerNode: !!containerNode,
        childrenType: typeof children,
        time: Date.now(),
      })
    } catch (e) {}
  }, [shouldRender, active, containerNode, id, children])

  // Activity mode: render children inline and avoid DOM moving to reduce reflows
  useEffect(() => {
    if (!ActivityComponent) return
    if (!active || !shouldRender) return
    try {
      requestAnimationFrame(() => {
        try {
          const p = placeholderRef.current
          if (!p) return
          const nodes = Array.from(p.querySelectorAll('*'))
          nodes.forEach((el) => {
            try {
              if (el && el.style && el.style.display === 'none') {
                el.style.removeProperty('display')
              }
            } catch (e) {}
          })
          if (typeof window !== 'undefined') {
            window.__keepalive_debug_details = window.__keepalive_debug_details || []
            window.__keepalive_debug_details.push({ id, note: 'activity-mode-cleaned-display', time: Date.now() })
          }
        } catch (e) {}
      })
    } catch (e) {}
  }, [ActivityComponent, active, isActivityVisible, shouldRender])

  if (!shouldRender) return null

  if (ActivityComponent) {
    return (
      <KeepAliveContext.Provider value={active}>
        <ActivityComponent mode={isActivityVisible ? 'visible' : 'hidden'}>
          <div ref={placeholderRef} style={{ width: '100%', height: '100%' }}>
            {children}
          </div>
        </ActivityComponent>
      </KeepAliveContext.Provider>
    )
  }

  return (
    <KeepAliveContext.Provider value={active}>
      <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
      {containerNode && createPortal(children, containerNode)}
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
