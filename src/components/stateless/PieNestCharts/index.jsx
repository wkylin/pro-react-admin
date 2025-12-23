import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as echarts from 'echarts'

const PieNestChart = ({ data = [], height = '100%', eOptions = {} }) => {
  const chartRef = useRef(null)
  const myChartRef = useRef(null)
  const innerColors = ['#3B70FD', '#0EC374', '#F57A43']
  const outerColors = ['#6A93FF', '#98B5FF', '#2CCD97', '#2BE79E', '#95FBB1', '#FF9440', '#FFB860']

  // 处理窗口大小变化
  const handleResize = useCallback(() => {
    if (myChartRef.current) {
      myChartRef.current.resize()
    }
  }, [])

  // 初始化图表
  const initChart = useCallback(() => {
    if (!chartRef.current) return

    myChartRef.current = echarts.init(chartRef.current)
    updateChart()
  }, [])

  // 更新图表配置
  const updateChart = useCallback(() => {
    if (!myChartRef.current) return

    const defaultOption = {
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
        ...eOptions?.options?.legend,
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
            data: item?.data?.map((temp, idx) => ({
              ...temp,
              itemStyle: { color: innerColors[idx % innerColors.length] },
            })),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params) => `${params.name}: ${params.value}(${params.percent}%)`,
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
            labelLayout: (params) => {
              return {
                hideOverlap: true,
                moveOverlap: true,
              }
            },
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
            data: item?.data?.map((temp, idx) => ({
              ...temp,
              itemStyle: { color: outerColors[idx % outerColors.length] },
            })),
            tooltip: {
              show: false,
              trigger: 'item',
              formatter: (params) => `${params.name}: ${params.value}(${params.percent}%)`,
              ...item?.tooltip,
            },
          }
        }
      }),
    }

    myChartRef.current.setOption(defaultOption)
  }, [eOptions, innerColors, outerColors])

  // 重新初始化图表
  const reinitChart = useCallback(() => {
    if (myChartRef.current) {
      myChartRef.current.dispose()
    }
    initChart()
  }, [initChart])

  // 初始化和事件监听
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    initChart()

    // 监听 BigScreen 页面重新初始化事件
    const handleReinit = () => {
      reinitChart()
    }
    window.addEventListener('bigscreen-charts-reinit', handleReinit)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('bigscreen-charts-reinit', handleReinit)
      if (myChartRef.current) {
        myChartRef.current.dispose()
      }
    }
  }, [handleResize, initChart, reinitChart])

  // 监听 eOptions 变化
  useEffect(() => {
    reinitChart()
  }, [eOptions, reinitChart])

  return <div ref={chartRef} style={{ height, width: '100%' }} />
}

export default PieNestChart
