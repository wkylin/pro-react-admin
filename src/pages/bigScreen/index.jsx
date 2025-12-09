import React, { useState, useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import previewFitScale from '@utils/previewScale'
import { useActivate } from '@/components/KeepAlive'
import { useLocation } from 'react-router-dom'
import ChinaMap from './chinaMap'

const BigScreen = () => {
  const scaleDom = useRef(null)
  const { pathname } = useLocation()

  // 缩放相关逻辑
  const scaleRef = useRef(null)

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1, 1, scaleDom.current)
    scaleRef.current = { calcRate, windowResize, unWindowResize }
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  // 当页面被激活时，重新计算缩放并重新初始化图表
  useActivate(() => {
    // 强制重新初始化缩放逻辑
    if (scaleDom.current) {
      // 先清除之前的样式
      scaleDom.current.style.transform = 'scale(1, 1)'

      // 延迟执行，确保DOM已经完全渲染和可见
      setTimeout(() => {
        if (scaleRef.current?.calcRate) {
          scaleRef.current.calcRate()
        }
        // 通知所有图表组件重新初始化
        window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      }, 200)
    }
  }) // 监听路由变化，当路由变为 /big-screen 时重新计算缩放
  useEffect(() => {
    if (pathname === '/big-screen' && scaleDom.current) {
      // 延迟执行，确保页面已经完全渲染
      setTimeout(() => {
        if (scaleRef.current?.calcRate) {
          scaleRef.current.calcRate()
        }
        // 通知所有图表组件重新初始化
        window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      }, 300)
    }
  }, [pathname])
  return (
    <FixTabPanel>
      <section ref={scaleDom} style={{ height: '100%', width: '100%', transformOrigin: 'top left' }}>
        <ChinaMap />
      </section>
    </FixTabPanel>
  )
}

export default BigScreen
