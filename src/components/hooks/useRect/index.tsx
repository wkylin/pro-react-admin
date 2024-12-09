import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import ResizeObserver from 'resize-observer-polyfill'

type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
} | null

const getRect = (element: HTMLElement | null): RectResult | null => {
  if (!element) return null
  return element.getBoundingClientRect()
}

const useRect = (): [RectResult, React.MutableRefObject<HTMLDivElement | null>] => {
  const ref = useRef<HTMLDivElement | null>(null)
  const current = ref.current || null
  const [rect, setRect] = useState(getRect(current))

  const handleResize = useCallback(() => {
    if (!ref.current) return

    // Update client rect
    setRect(getRect(ref.current))
  }, [ref])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    handleResize()
    if (typeof ResizeObserver === 'function') {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(() => handleResize())
      resizeObserver.observe(element)

      return () => {
        if (!resizeObserver) return
        resizeObserver.disconnect()
        resizeObserver = null
      }
    }
    // set resize listener
    window.addEventListener('resize', handleResize)
    // remove resize listener
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return [rect, ref]
}

export default useRect
