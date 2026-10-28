import { useMemo } from 'react'
import type { EChartsOption, BarSeriesOption, LineSeriesOption } from 'echarts'
import EChart, { type EChartProps } from '../EChart'
export type PHRange = { name: string; values: readonly number[] }
export type PHMarker = { value: number; label: string; color?: string }
export type PHBarChartProps = Omit<EChartProps, 'option'> & {
  ranges: readonly PHRange[]
  markers?: readonly PHMarker[]
  title?: string
  axisLabel?: string
  getColor?: (value: number) => string
}
export function getPHColor(value: number): string {
  if (!Number.isFinite(value) || value < 0 || value > 14) return '#808080'
  if (value < 7) return `rgb(255, ${Math.round((255 * value) / 7)}, 0)`
  if (value === 7) return '#00FF00'
  const ratio = Math.min((value - 7) / 7, 0.9)
  return `rgb(0, ${Math.round(255 * (1 - ratio))}, ${Math.round(200 + 55 * ratio)})`
}
export default function PHBarChart({
  ranges,
  markers,
  title,
  axisLabel = 'pH',
  getColor = getPHColor,
  ariaLabel = title ?? 'pH chart',
  ...props
}: PHBarChartProps) {
  const option = useMemo<EChartsOption>(() => {
    const series: (BarSeriesOption | LineSeriesOption)[] = ranges.flatMap((range, index) =>
      range.values.map((value) => ({
        name: `${range.name}: ${value}`,
        type: 'bar' as const,
        stack: `range-${index}`,
        data: ranges.map((_, position) => (position === index ? 14 / Math.max(1, range.values.length) : 0)),
        itemStyle: { color: getColor(value) },
        label: { show: true, position: 'inside' as const, formatter: String(value) },
      }))
    )
    if (markers?.length)
      series.push({
        type: 'line',
        data: [],
        markLine: {
          silent: true,
          data: markers.map((marker) => ({
            yAxis: marker.value,
            label: { formatter: marker.label },
            lineStyle: { color: marker.color },
          })),
        },
      })
    return {
      title: { text: title },
      tooltip: { trigger: 'item', renderMode: 'richText' },
      xAxis: { type: 'category', data: ranges.map((range) => range.name) },
      yAxis: { type: 'value', min: 0, max: 14, name: axisLabel },
      series,
    }
  }, [ranges, markers, title, axisLabel, getColor])
  return <EChart {...props} ariaLabel={ariaLabel} option={option} notMerge />
}
