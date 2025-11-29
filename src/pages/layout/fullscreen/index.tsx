import React, { useCallback, useEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import { message, Tooltip, Button } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

interface FullScreenProps {
  ele?: string
  tips?: string
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const FullScreen: React.FC<FullScreenProps> = ({ ele, tips = '全屏', placement = 'bottom' }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const targetRef = useRef<HTMLElement | null>(null)
  const handlerRef = useRef<(() => void) | null>(null)

  const getCurrentFullscreenElement = () => {
    // cross-browser checks
    return ((document as any).fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement ||
      null) as Element | null
  }

  const checkIsTargetFullscreen = useCallback(() => {
    if (!screenfull?.isEnabled) return false
    // If no specific element, check document fullscreen state
    if (!ele) {
      return !!screenfull.isFullscreen
    }
    const fullscreenEl = getCurrentFullscreenElement()
    return fullscreenEl === targetRef.current
  }, [ele])

  useEffect(() => {
    if (!screenfull?.isEnabled) return

    // cache target element for this instance
    if (ele) {
      targetRef.current = (document.querySelector(ele) as HTMLElement) || null
    } else {
      targetRef.current = null
    }

    const onChange = () => {
      const val = checkIsTargetFullscreen()
      setIsFullScreen(val)
    }

    handlerRef.current = onChange
    screenfull.on('change', onChange)

    // initialize state
    onChange()

    return () => {
      if (handlerRef.current) {
        screenfull.off('change', handlerRef.current)
        handlerRef.current = null
      }
    }
  }, [ele, checkIsTargetFullscreen])

  const handleFullScreen = useCallback(() => {
    if (!screenfull?.isEnabled) {
      message.warning('当前浏览器不支持全屏')
      return
    }

    try {
      const dom = ele ? (document.querySelector(ele) as HTMLElement) : undefined
      if (ele && !dom) {
        message.error('未找到目标元素')
        return
      }
      // toggle accepts undefined to target documentElement
      screenfull.toggle(dom as any)
    } catch (err) {
      console.error('fullscreen toggle error', err)
      message.error('全屏切换失败')
    }
  }, [ele])

  return (
    <Tooltip placement={placement} title={tips}>
      <Button
        type="text"
        size="small"
        aria-label={tips}
        onClick={handleFullScreen}
        icon={
          isFullScreen ? (
            <FullscreenExitOutlined style={{ fontSize: 16 }} />
          ) : (
            <FullscreenOutlined style={{ fontSize: 16 }} />
          )
        }
      />
    </Tooltip>
  )
}

export default FullScreen
