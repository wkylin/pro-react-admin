import { useState, useEffect, useRef } from 'react'

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY)
  const frameRef = useRef(null)

  useEffect(() => {
    const updatePosition = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      frameRef.current = requestAnimationFrame(() => {
        setScrollPosition(window.scrollY)
        frameRef.current = null // 清空引用
      })
    }

    const handleScroll = () => {
      updatePosition()
    }

    // 添加事件监听器，使用 passive: true
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 清理函数，在组件卸载时调用
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, []) // 空依赖数组，确保effect只在组件挂载和卸载时运行

  return scrollPosition
}

export default useScrollPosition
