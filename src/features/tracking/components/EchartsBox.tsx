import { useEffect, useRef, type CSSProperties } from 'react'
import * as echarts from 'echarts'
import type { EChartsCoreOption, EChartsType } from 'echarts'
import { useOptionalProThemeContext } from '@/theme/hooks'

interface EchartsBoxProps {
  option: EChartsCoreOption
  style?: CSSProperties
}

const EchartsBox = ({ option, style }: EchartsBoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<EChartsType | null>(null)
  const themeContext = useOptionalProThemeContext()
  const chartTheme = themeContext?.resolvedTheme === 'dark' ? 'dark' : undefined

  useEffect(() => {
    if (!containerRef.current) return
    chartRef.current = echarts.init(containerRef.current, chartTheme)
    return () => {
      chartRef.current?.dispose()
      chartRef.current = null
    }
  }, [chartTheme])

  useEffect(() => {
    if (!option) return
    chartRef.current?.setOption(option, true)
  }, [option, chartTheme])

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <div ref={containerRef} style={{ width: '100%', ...style }} />
}

export default EchartsBox
