import React, { useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import previewFitScale from '@utils/previewScale'
import { useActivate } from '@/components/KeepAlive'
import { useLocation } from 'react-router-dom'
import ChinaMap from './chinaMap'

const BigScreen = () => {
  const scaleDom = useRef(null)
  const { pathname } = useLocation()

  const scaleRef = useRef(null)
  const reinitTimerRef = useRef(null)

  const scheduleChartsReinit = (delayMs) => {
    if (reinitTimerRef.current) {
      clearTimeout(reinitTimerRef.current)
      reinitTimerRef.current = null
    }
    reinitTimerRef.current = setTimeout(() => {
      if (scaleRef.current?.calcRate) {
        scaleRef.current.calcRate()
      }
      window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      reinitTimerRef.current = null
    }, delayMs)
  }

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1, 1, scaleDom.current)
    scaleRef.current = { calcRate, windowResize, unWindowResize }
    calcRate()
    windowResize()
    return () => {
      if (reinitTimerRef.current) {
        clearTimeout(reinitTimerRef.current)
        reinitTimerRef.current = null
      }
      unWindowResize()
    }
  }, [])

  useActivate(() => {
    if (scaleDom.current) {
      scaleDom.current.style.transform = 'scale(1, 1)'
      scheduleChartsReinit(200)
    }
  })
  useEffect(() => {
    if (pathname === '/big-screen' && scaleDom.current) {
      scheduleChartsReinit(300)
    }
  }, [pathname])
  return (
    <FixTabPanel fill>
      <section ref={scaleDom} style={{ height: '100%', width: '100%', transformOrigin: 'top left' }}>
        <ChinaMap />
      </section>
    </FixTabPanel>
  )
}

export default BigScreen
