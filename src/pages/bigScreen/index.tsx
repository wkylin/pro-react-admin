import { useEffect, useRef } from 'react'
import type { ComponentProps, ComponentType } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import previewFitScale from '@utils/previewScale'
import { useActivate } from '@/components/KeepAlive'
import { useLocation } from 'react-router-dom'
import ChinaMap from './chinaMap'

type PreviewScale = {
  width: number
  height: number
}

type PreviewScaleController = {
  calcRate: () => void
  windowResize: () => void
  unWindowResize: () => void
}

type PreviewFitScale = (
  width: number,
  height: number,
  scaleDom: HTMLDivElement | null,
  callback?: (scale: PreviewScale) => void
) => PreviewScaleController

const createPreviewScale = previewFitScale as PreviewFitScale
const BigScreenFixTabPanel = FixTabPanel as ComponentType<ComponentProps<typeof FixTabPanel> & { fill?: boolean }>

const BigScreen = () => {
  const scaleDom = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  const scaleRef = useRef<PreviewScaleController | null>(null)
  const reinitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleChartsReinit = (delayMs: number) => {
    if (reinitTimerRef.current !== null) {
      clearTimeout(reinitTimerRef.current)
      reinitTimerRef.current = null
    }
    reinitTimerRef.current = setTimeout(() => {
      scaleRef.current?.calcRate()
      window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
      reinitTimerRef.current = null
    }, delayMs)
  }

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = createPreviewScale(1, 1, scaleDom.current)
    scaleRef.current = { calcRate, windowResize, unWindowResize }
    calcRate()
    windowResize()
    return () => {
      if (reinitTimerRef.current !== null) {
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
    <BigScreenFixTabPanel fill={true}>
      <section ref={scaleDom} style={{ height: '100%', width: '100%', transformOrigin: 'top left' }}>
        <ChinaMap />
      </section>
    </BigScreenFixTabPanel>
  )
}

export default BigScreen
