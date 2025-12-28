import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

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

const useRect = (): [RectResult, React.RefObject<HTMLDivElement | null>] => {
  const ref = useRef<HTMLDivElement | null>(null)
  // 初始不在渲染期间访问 ref.current，使用 lazy 初始化保底值
  const [rect, setRect] = useState<RectResult>(() => getRect(null))

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
