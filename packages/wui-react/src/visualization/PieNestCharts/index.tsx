import { useMemo, useRef } from 'react'
import EChart from '../EChart'
import type { DefaultLabelFormatterCallbackParams, EChartsOption } from 'echarts'
import type { PieSeriesOption } from 'echarts/charts'
import type { EChartHandle } from '../EChart'

export type PieNestChartOptions = Pick<EChartsOption, 'legend'> & {
  series?: PieSeriesOption[]
}

export type PieNestChartProps = {
  data?: PieSeriesOption['data']
  theme?: import('../EChart').EChartProps['theme']
  ariaLabel?: string
  height?: string
  eOptions?: {
    options?: PieNestChartOptions
  }
}

const colorizeData = (data: PieSeriesOption['data'], colors: readonly string[]): PieSeriesOption['data'] =>
  data?.map((entry, index) => {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry))
      return { value: entry as number | '-' | (number | '-')[], itemStyle: { color: colors[index % colors.length] } }
    return { ...entry, itemStyle: { color: colors[index % colors.length], ...entry.itemStyle } }
  })

const innerColors = ['#3B70FD', '#0EC374', '#F57A43']
const outerColors = ['#6A93FF', '#98B5FF', '#2CCD97', '#2BE79E', '#95FBB1', '#FF9440', '#FFB860']

const PieNestChart = ({
  data,
  height = '400px',
  eOptions,
  theme,
  ariaLabel = 'Nested pie chart',
}: PieNestChartProps) => {
  const chartHandleRef = useRef<EChartHandle | null>(null)

  const option = useMemo(() => {
    const defaultOption: EChartsOption = {
      tooltip: {
        show: true,
        trigger: 'item',
        renderMode: 'richText',
        confine: true,
        backgroundColor: '#fff',
        borderColor: '#d9e5f2',
        textStyle: { color: '#203a56', fontSize: 12 },
        padding: [8, 10],
      },
      legend: {
        show: false,
        ...eOptions?.options?.legend,
      },
      series: (eOptions?.options?.series ?? (data ? [{ type: 'pie' as const, data }] : []))?.map(
        (item, index): PieSeriesOption => {
          if (index === 0) {
            return {
              name: 'inner',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '24%'],
              emphasis: {
                label: {
                  show: true,
                },
              },
              label: {
                show: true,
                position: 'inner',
                fontSize: 14,
                formatter: '{a|{b}}',
                rich: {
                  a: { color: '#fff', fontSize: 12 },
                },
                ...item.label,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
              },
              ...item,
              data: colorizeData(item.data, innerColors),
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: (params: DefaultLabelFormatterCallbackParams) =>
                  `${params.name}\n${params.value} · ${params.percent}%`,
                ...item?.tooltip,
              },
            }
          } else {
            return {
              name: 'outer',
              type: 'pie',
              radius: ['24%', '40%'],
              labelLayout: () => ({
                hideOverlap: true,
              }),
              emphasis: {
                label: {
                  show: true,
                },
              },
              itemStyle: {
                opacity: 0.8,
                borderColor: '#fff',
                borderWidth: 2,
              },
              ...item,
              labelLine: {
                length: 18,
                length2: 26,
                ...item.labelLine,
              },
              label: {
                show: false,
                position: 'outside',
                formatter: '{name|{b}}\n{detail|{c} · {d}%}',
                backgroundColor: '#fff',
                borderColor: '#d9e5f2',
                borderWidth: 1,
                borderRadius: 6,
                padding: [5, 8],
                ...item.label,
                rich: {
                  name: { color: '#203a56', fontSize: 12, fontWeight: 'bold', lineHeight: 18 },
                  detail: { color: '#52677e', fontSize: 11, lineHeight: 16 },
                  ...item.label?.rich,
                },
              },
              data: colorizeData(item.data, outerColors),
              tooltip: {
                show: false,
                trigger: 'item',
                formatter: (params: DefaultLabelFormatterCallbackParams) =>
                  `${params.name}\n${params.value} · ${params.percent}%`,
                ...item?.tooltip,
              },
            }
          }
        }
      ),
    }
    return defaultOption
  }, [eOptions, data])

  return (
    <EChart
      theme={theme}
      ariaLabel={ariaLabel}
      ref={chartHandleRef}
      option={option}
      notMerge
      style={{ height, width: '100%' }}
    />
  )
}

export default PieNestChart
