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

  const safeInvoke = (fn, label) => {
    try {
      fn()
    } catch (err) {
      // 仅在开发环境输出，避免生产环境噪音；同时满足 Sonar 对异常处理的要求
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
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
    if (active) {
      setIsActivityVisible(true)
      return
    }

    const timer = setTimeout(() => {
      setIsActivityVisible(false)
    }, 16)

    return () => clearTimeout(timer)
  }, [active])

  // Initialize container once
  if (!containerRef.current && typeof document !== 'undefined') {
    // 优化：支持 HMR (热更新)
    // 在开发环境下，尝试复用已存在的 DOM 节点，防止 HMR 导致 DOM 丢失或重复创建
    let existing = null
    if (process.env.NODE_ENV === 'development' && id) {
      const hidden = document.getElementById('__keepalive_hidden_root')
      if (hidden) {
        existing = hidden.querySelector(`[data-keepalive-id="${id}"]`)
      }
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
    container.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })

    return () => {
      container.removeEventListener('scroll', onScroll, { capture: true })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistOnUnmount])

  // Toggle visibility logic
  useLayoutEffect(() => {
    const container = containerRef.current
    const placeholder = placeholderRef.current

    if (!container || !placeholder) return

    // 如果 container 还在隐藏容器里（比如从缓存恢复），把它移到当前占位符下
    if (container.parentNode !== placeholder) {
      // 在移动DOM之前，发送自定义事件通知子组件
      const event = new CustomEvent('keepalive-dom-move', {
        detail: { from: container.parentNode, to: placeholder },
      })
      container.dispatchEvent(event)

      // 短暂延迟确保子组件有机会处理事件
      setTimeout(() => {
        if (container.parentNode !== placeholder) {
          placeholder.appendChild(container)
        }
      }, 0)
    }

    // 如果使用 Activity，我们让 Activity 控制可见性，但我们需要确保 container 本身是 block
    // 并且我们仍然需要手动恢复滚动位置，因为 container 是我们手动管理的 DOM
    if (ActivityComponent) {
      container.style.display = 'block'
      if (active && shouldRender) {
        scrollPos.current.forEach((pos, node) => {
          if (node.isConnected) {
            node.scrollLeft = pos.left
            node.scrollTop = pos.top
          }
        })
      }
      return
    }

    if (active && shouldRender) {
      // 使用 CSS 切换可见性，性能远高于 appendChild
      container.style.display = 'block'

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

  if (!shouldRender) return null

  if (ActivityComponent) {
    return (
      <KeepAliveContext.Provider value={active}>
        <ActivityComponent mode={isActivityVisible ? 'visible' : 'hidden'}>
          <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
          {containerRef.current && createPortal(children, containerRef.current)}
        </ActivityComponent>
      </KeepAliveContext.Provider>
    )
  }

  return (
    <KeepAliveContext.Provider value={active}>
      <div ref={placeholderRef} style={{ width: '100%', height: '100%' }} />
      {containerRef.current && createPortal(children, containerRef.current)}
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
