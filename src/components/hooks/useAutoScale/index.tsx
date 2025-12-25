'use client'

import { useEffect, useState } from 'react'

// 自定义 Hook：自动计算缩放比例
export function useAutoScale(designWidth = 1920, designHeight = 1080) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const scaleX = width / designWidth
      const scaleY = height / designHeight
      const newScale = Math.min(scaleX, scaleY)

      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [designWidth, designHeight])

  return scale
}
