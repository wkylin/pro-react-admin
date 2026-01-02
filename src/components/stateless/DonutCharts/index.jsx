import React, { useMemo, useRef, useCallback } from 'react'
import EChart from '@stateless/EChart'
import PropTypes from 'prop-types'
import useBigScreenChartsReinit from '@/components/hooks/useBigScreenChartsReinit'

const DonutChart = ({ height = '100%', eOptions }) => {
  const chartInstance = useRef(null)
  const chartHandleRef = useRef(null)

  const colors = [
    ['#2878FF', '#73B9FF'],
    ['#ABF1FF', '#39D3FF'],
    ['#ECC6FF', '#BA86FF'],
    ['#ACFFDC', '#72D592'],
    ['#FFE6A5', '#FFBD4A'],
    ['#FD80F1', '#FFADF6'],
    ['#5657E8', '#B9BAFF'],
    ['#E85B89', '#FFB8CF'],
    ['#38A047', '#ADDFB5'],
    ['#F2FA8B', '#BCC81C'],
    ['#B0CEFF', '#346FD3'],
    ['#FFD3AD', '#E08230'],
    ['#9CE9FF', '#29A1C3'],
    ['#4442CA', '#D6D5FF'],
    ['#C02D56', '#FFA8C0'],
    ['#C84FD1', '#FCD3FF'],
    ['#9FDE47', '#CEF19E'],
    ['#AAC6FF', '#3A7AFF'],
    ['#CF8E29', '#FFCF84'],
    ['#98E4FB', '#23C1F0'],
    ['#FFE0D6', '#E57450'],
    ['#B465FF', '#E8D0FF'],
    ['#F8C106', '#FFEAA4'],
  ]

  const handleChartInit = useCallback((chart) => {
    chartInstance.current = chart
  }, [])

  const option = useMemo(() => {
    const data = eOptions?.data?.map((item, index) => ({
      ...item,
      tooltip: {
        trigger: 'item',
        ...eOptions?.options?.tooltip,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      labelLine: {
        // show: index === 0, // 显示第一个
        show: true,
        length: 15,
        length2: 10,
        ...eOptions?.options?.labelLine,
      },
      label: {
        trigger: 'item',
        // show: index === 0, // 显示第一个
        show: true,
        alignTo: 'edge',
        minMargin: 5,
        edgeDistance: 10,
        rich: {
          a: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
          },
          b: {
            color: '#fff',
            fontSize: 12,
            padding: [8, 0, 0, 0],
          },
          c: {
            color: '#fff',
            fontSize: 16,
            padding: [8, 0, 0, 15],
          },
          d: {
            padding: [28, 0, 0, 0],
            color: '#fff',
            fontWeight: 'bold',
          },
          e: {
            color: '#EF4A10',
            fontSize: 12,
            padding: [8, 0, 0, 0],
          },
          f: {
            color: '#EF4A10',
            fontSize: 16,
            padding: [8, 0, 0, 15],
          },
          g: {
            color: '#2878FF',
            fontSize: 16,
            padding: [8, 0, 0, 15],
          },
        },
        ...eOptions?.options?.label,
      },
      itemStyle: {
        color: {
          colorStops: [
            { offset: 0, color: colors[index % colors.length][0] },
            { offset: 1, color: colors[index % colors.length][1] },
          ],
        },
      },
    }))

    const optionSerie = {
      type: 'pie',
      data,
      radius: ['30', '90'],
      center: ['50%', '50%'],
      roseType: 'radius',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      label: {
        position: 'outside',
        distance: 0,
        alignTo: 'labelLine',
      },
      itemStyle: {
        borderRadius: 0,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
        },
      },
      labelLayout: (params) => {
        const width = chartInstance.current?.getWidth?.() ?? 0
        const isLeft = width ? params.labelRect.x < width / 2 : params.labelRect.x < 0
        const points = params.labelLinePoints
        if (!points?.[2]) {
          return { hideOverlap: true }
        }
        points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
        return {
          labelLinePoints: points,
          hideOverlap: true,
        }
      },
      animationEasing: 'elasticOut',
      animationDelay: (idx) => idx * 10,
    }

    // 配置项
    const defaultOption = {
      title: {
        text: '',
        subtext: '',
        left: 'center',
        ...eOptions?.options?.title,
      },
      tooltip: {
        trigger: 'item',
        ...eOptions?.options?.tooltip,
      },
      legend: {
        show: true,
        orient: 'vertical',
        right: 20,
        ...eOptions?.options?.legend,
      },
      series:
        eOptions?.options?.series?.length > 0
          ? eOptions?.options?.series.map((item) => ({
              ...optionSerie,
              ...item,
            }))
          : [optionSerie],
    }
    return defaultOption
  }, [colors, eOptions])

  useBigScreenChartsReinit(chartHandleRef)

  return (
    <EChart ref={chartHandleRef} option={option} onInit={handleChartInit} notMerge style={{ height, width: '100%' }} />
  )
}

DonutChart.propTypes = {
  height: PropTypes.string,
  eOptions: PropTypes.object,
}

export default DonutChart
