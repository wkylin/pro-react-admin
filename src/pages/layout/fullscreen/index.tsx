import React, { useEffect, useState } from 'react'
import screenfull from 'screenfull'
import { message, Space, Tooltip } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const FullScreen = ({ ele, tips = '全屏', placement = 'bottom' }: any) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
      return () => screenfull.off('change', () => {})
    })
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏')
    const dom = document.querySelector(ele) || undefined
    screenfull.toggle(dom)
  }
  return (
    <Tooltip placement={placement} title={tips}>
      <Space style={{ cursor: 'pointer' }} onClick={handleFullScreen}>
        {fullScreen ? (
          <FullscreenExitOutlined style={{ fontSize: 16 }} />
        ) : (
          <FullscreenOutlined style={{ fontSize: 16 }} />
        )}
      </Space>
    </Tooltip>
  )
}
export default FullScreen
