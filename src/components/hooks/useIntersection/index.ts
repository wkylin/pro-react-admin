import { useCallback, useEffect, useRef, useState } from 'react'

type RootRef = HTMLElement | null | React.RefObject<HTMLElement>

export interface UseIntersectionOptions {
  /** IntersectionObserver threshold */
  threshold?: number
  /** Root element or ref to observe within */
  root?: RootRef
  /** Root margin */
  rootMargin?: string
  /** Whether to disconnect after first intersection (default: true) */
  once?: boolean
}

export const useIntersection = (options: UseIntersectionOptions = {}) => {
  const { threshold = 0.15, root = null, rootMargin = '0px', once = true } = options

  // internal storage
  const internalRef = useRef<HTMLElement | null>(null)
  const [observedNode, setObservedNode] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // callback ref so we react to node mount/unmount
  const ref = useCallback((node: HTMLElement | null) => {
    internalRef.current = node
    setObservedNode(node)
  }, [])

  // resolve root (may be a ref)
  const resolvedRoot =
    root && 'current' in (root as React.RefObject<HTMLElement>)
      ? (root as React.RefObject<HTMLElement>).current
      : (root as HTMLElement | null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    const node = observedNode
    if (!node) return

    // if no root provided or ref not ready, try to find common FixTabPanel container as fallback
    const rootCandidate =
      resolvedRoot ?? (document.querySelector('.fix-tab-panel-scroll-container') as HTMLElement | null)

    // debug helpers (enable by setting window.__DEBUG_USE_INTERSECTION = true)
    const isDebug = typeof window !== 'undefined' && (window as any).__DEBUG_USE_INTERSECTION
    if (isDebug) {
      console.debug(
        '[useIntersection] observed node:',
        node,
        'resolvedRoot:',
        resolvedRoot,
        'rootCandidate:',
        rootCandidate
      )
    }

    let observer: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (isDebug) console.debug('[useIntersection] observer cb, isIntersecting=', entry.isIntersecting)
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && observer) observer.disconnect()
        }
      },
      { threshold, root: rootCandidate ?? undefined, rootMargin }
    )

    try {
      observer.observe(node)
    } catch (e) {
      if (isDebug) console.warn('[useIntersection] observer.observe failed:', e)
    }

    // Fallback: attach scroll/resize listener to manually check intersection in case
    // the observer doesn't trigger due to timing or root issues (robustness)
    const checkIntersect = () => {
      if (!node) return
      const nodeRect = node.getBoundingClientRect()
      const rootRect = rootCandidate
        ? (rootCandidate as HTMLElement).getBoundingClientRect()
        : {
            top: 0,
            left: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
          }

      const verticallyIn = nodeRect.bottom > rootRect.top && nodeRect.top < rootRect.bottom
      const horizontallyIn = nodeRect.right > rootRect.left && nodeRect.left < rootRect.right

      const inView = verticallyIn && horizontallyIn
      if (isDebug && inView) console.debug('[useIntersection] checkIntersect -> inView', { nodeRect, rootRect })

      if (inView) {
        setIsVisible(true)
        if (once) {
          if (observer) {
            observer.disconnect()
            observer = null
          }
          removeListeners()
        }
      }
    }

    const removeListeners = () => {
      try {
        if (rootCandidate) {
          ;(rootCandidate as HTMLElement).removeEventListener('scroll', checkIntersect)
        } else {
          window.removeEventListener('scroll', checkIntersect)
        }
        window.removeEventListener('resize', checkIntersect)
      } catch (e) {
        /* swallow */
      }
    }

    if (rootCandidate) {
      ;(rootCandidate as HTMLElement).addEventListener('scroll', checkIntersect, { passive: true })
    } else {
      window.addEventListener('scroll', checkIntersect, { passive: true })
    }
    window.addEventListener('resize', checkIntersect)

    // initial check
    checkIntersect()

    return () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
      removeListeners()
    }
  }, [threshold, resolvedRoot, rootMargin, once, observedNode])

  return [ref, isVisible] as const
}
