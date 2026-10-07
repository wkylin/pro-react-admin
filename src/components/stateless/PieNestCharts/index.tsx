import { useMemo, useRef } from 'react'
import EChart from '@stateless/EChart'
import PropTypes from 'prop-types'
import useBigScreenChartsReinit from '@/components/hooks/useBigScreenChartsReinit'
import type { DefaultLabelFormatterCallbackParams, EChartsOption } from 'echarts'
import type { PieSeriesOption } from 'echarts/charts'
import type { EChartHandle } from '@stateless/EChart'

type PieNestChartOptions = Pick<EChartsOption, 'legend'> & {
  series?: PieSeriesOption[]
}

type PieNestChartProps = {
  data?: readonly unknown[]
  height?: string
  eOptions?: {
    options?: PieNestChartOptions
  }
}

const colorizeData = (data: PieSeriesOption['data'], colors: readonly string[]) =>
  data?.map((entry, index) => ({
    ...(typeof entry === 'object' && entry !== null
      ? entry
      : typeof entry === 'string'
        ? Object.fromEntries(entry.split('').map((value, entryIndex) => [entryIndex, value]))
        : {}),
    itemStyle: { color: colors[index % colors.length] },
  }))

const PieNestChart = ({ data: _data = [], height = '100%', eOptions = {} }: PieNestChartProps) => {
  const innerColors = ['#3B70FD', '#0EC374', '#F57A43']
  const outerColors = ['#6A93FF', '#98B5FF', '#2CCD97', '#2BE79E', '#95FBB1', '#FF9440', '#FFB860']

  const chartHandleRef = useRef<EChartHandle | null>(null)

  const option = useMemo(() => {
    const defaultOption: EChartsOption = {
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
        ...eOptions?.options?.legend,
      },
      series: eOptions?.options?.series?.map((item, index): PieSeriesOption => {
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
            data: colorizeData(item.data, innerColors),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params: DefaultLabelFormatterCallbackParams) =>
                `${params.name}: ${params.value}(${params.percent}%)`,
              ...item?.tooltip,
            },
          }
        } else {
          return {
            name: 'outer',
            type: 'pie',
            radius: ['24%', '40%'],
            labelLine: {
              length: 30,
              length2: 60,
            },
            label: {
              show: false,
              formatter: '{b|{b}}\n{c}}\n{d}%',
              rich: {
                a: { color: '#fff', fontSize: 12, lineHeight: 22 },
                b: {
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33,
                },
              },
              ...item?.label,
            },
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
            data: colorizeData(item.data, outerColors),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params: DefaultLabelFormatterCallbackParams) =>
                `${params.name}: ${params.value}(${params.percent}%)`,
              ...item?.tooltip,
            },
          }
        }
      }),
    }
    return defaultOption
  }, [eOptions, innerColors, outerColors])

  useBigScreenChartsReinit(chartHandleRef)

  return <EChart ref={chartHandleRef} option={option} notMerge style={{ height, width: '100%' }} />
}

PieNestChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.string,
  eOptions: PropTypes.object,
}

export default PieNestChart
