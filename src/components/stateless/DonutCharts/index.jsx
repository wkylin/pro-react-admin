import React, { useEffect, useRef, useCallback } from 'react'
import * as echarts from 'echarts'
import { normalizeEChartsOption } from '@utils/echarts/normalizeOption'
import PropTypes from 'prop-types'

const DonutChart = ({ height = '100%', eOptions }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

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

  // 处理窗口大小变化
  const handleResize = () => {
    if (chartInstance.current) {
      chartInstance.current.resize()
    }
  }

  // 初始化图表
  const initChart = () => {
    if (!chartRef.current) return

    // 销毁旧实例
    if (chartInstance.current) {
      chartInstance.current.dispose()
    }

    // 创建新实例
    chartInstance.current = echarts.init(chartRef.current)

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
        const isLeft = params.labelRect.x < chartInstance.current.getWidth() / 2
        const points = params.labelLinePoints
        points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
        return {
          labelLinePoints: points,
          hideOverlap: true,
        }
      },
      animationEasing: 'elasticOut',
      animationDelay: () => Math.random() * 200,
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

    normalizeEChartsOption(defaultOption)
    chartInstance.current.setOption(defaultOption)
  }

  // 重新初始化图表
  const reinitChart = useCallback(() => {
    if (chartInstance.current) {
      chartInstance.current.dispose()
    }
    initChart()
  }, [initChart])

  // 组件挂载和卸载时的处理
  useEffect(() => {
    initChart()
    window.addEventListener('resize', handleResize)

    // 监听 BigScreen 页面重新初始化事件
    const handleReinit = () => {
      reinitChart()
    }
    window.addEventListener('bigscreen-charts-reinit', handleReinit)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('bigscreen-charts-reinit', handleReinit)
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [reinitChart])

  // 当props变化时重新初始化图表
  useEffect(() => {
    if (eOptions) {
      initChart()
    }
  }, [eOptions])

  return <div ref={chartRef} style={{ height, width: '100%' }} />
}

DonutChart.propTypes = {
  height: PropTypes.string,
  eOptions: PropTypes.object,
}

export default DonutChart
