import React, { useMemo, useRef } from 'react'
import EChart from '@stateless/EChart'
import PropTypes from 'prop-types'
import useBigScreenChartsReinit from '@/components/hooks/useBigScreenChartsReinit'

const PieNestChart = ({ data = [], height = '100%', eOptions = {} }) => {
  const innerColors = ['#3B70FD', '#0EC374', '#F57A43']
  const outerColors = ['#6A93FF', '#98B5FF', '#2CCD97', '#2BE79E', '#95FBB1', '#FF9440', '#FFB860']

  const chartHandleRef = useRef(null)

  const option = useMemo(() => {
    const defaultOption = {
      tooltip: {
        show: false
      },
      legend: {
        show: false,
        ...eOptions?.options?.legend
      },
      series: eOptions?.options?.series?.map((item, index) => {
        if (index === 0) {
          return {
            name: 'inner',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '24%'],
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              show: true,
              position: 'inner',
              fontSize: 14,
              formatter: '{a|{b}}',
              rich: {
                a: { color: '#fff', fontSize: 12 }
              },
              ...item.label
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            data: item?.data?.map((temp, idx) => ({
              ...temp,
              itemStyle: { color: innerColors[idx % innerColors.length] }
            })),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params) => `${params.name}: ${params.value}(${params.percent}%)`,
              ...item?.tooltip
            }
          }
        } else {
          return {
            name: 'outer',
            type: 'pie',
            radius: ['24%', '40%'],
            labelLine: {
              length: 30,
              length2: 60
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
                  lineHeight: 33
                }
              },
              ...item?.label
            },
            labelLayout: (params) => {
              return {
                hideOverlap: true,
                moveOverlap: true
              }
            },
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              opacity: 0.8,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: item?.data?.map((temp, idx) => ({
              ...temp,
              itemStyle: { color: outerColors[idx % outerColors.length] }
            })),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params) => `${params.name}: ${params.value}(${params.percent}%)`,
              ...item?.tooltip
            }
          }
        }
      })
    }
    return defaultOption
  }, [eOptions, innerColors, outerColors])

  useBigScreenChartsReinit(chartHandleRef)

  return <EChart ref={chartHandleRef} option={option} notMerge style={{ height, width: '100%' }} />
}

PieNestChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.string,
  eOptions: PropTypes.object
}

export default PieNestChart
