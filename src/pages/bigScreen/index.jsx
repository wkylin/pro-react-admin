import React, { useState, useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import previewFitScale from '@utils/previewScale'
import { useActivate } from '@/components/KeepAlive'
import { useLocation } from 'react-router-dom'
import ChinaMap from './chinaMap'

const BigScreen = () => {
  const scaleDom = useRef(null)
  const { pathname } = useLocation()

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

  useActivate(() => {
    if (scaleDom.current) {
      scaleDom.current.style.transform = 'scale(1, 1)'
      setTimeout(() => {
        if (scaleRef.current?.calcRate) {
          scaleRef.current.calcRate()
        }
        window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      }, 200)
    }
  })
  useEffect(() => {
    if (pathname === '/big-screen' && scaleDom.current) {
      setTimeout(() => {
        if (scaleRef.current?.calcRate) {
          scaleRef.current.calcRate()
        }
        window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      }, 300)
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
