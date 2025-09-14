'use client'

import React from 'react'
import { useRef, useEffect, useCallback } from 'react'
import * as echarts from 'echarts'
import { Card, Row, Col, Typography, Space } from 'antd'
const { Title, Text } = Typography
const PHBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  // 颜色计算函数 - 增强NaN保护
  const getPHColor = useCallback((ph: number | string): string => {
    // 确保ph是数字类型
    const phValue = typeof ph === 'string' ? Number.parseFloat(ph) : ph
    // 检查是否为有效数字
    if (isNaN(phValue) || phValue < 0 || phValue > 14) {
      return '#808080' // 默认灰色
    }
    if (phValue < 7) {
      const ratio = phValue / 7
      let green = Math.round(255 * ratio)
      // 防止NaN并确保在0-255范围内
      green = isNaN(green) ? 0 : Math.max(0, Math.min(255, green))
      return `rgb(255, ${green}, 0)`
    } else if (phValue === 7) {
      return '#00FF00'
    } else {
      // 优化碱性部分的颜色计算，使pH=14不是纯蓝色
      const ratio = Math.min((phValue - 7) / 7, 0.9) // 限制最大比率为0.9
      let green = Math.round(255 * (1 - ratio))
      let blue = Math.round(200 + 55 * ratio) // 蓝色从200开始，最大为255

      // 防止NaN并确保在0-255范围内
      green = isNaN(green) ? 0 : Math.max(0, Math.min(255, green))
      blue = isNaN(blue) ? 0 : Math.max(0, Math.min(255, blue))

      return `rgb(0, ${green}, ${blue})`
    }
  }, [])
  // 获取酸碱性描述
  const getPHType = useCallback((ph: number | string): string => {
    const phValue = typeof ph === 'string' ? Number.parseFloat(ph) : ph
    if (isNaN(phValue)) return '未知'
    if (phValue < 3) return '强酸性'
    if (phValue < 6) return '弱酸性'
    if (phValue === 7) return '中性'
    if (phValue < 11) return '弱碱性'
    return '强碱性'
  }, [])
  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return
    // 销毁已存在的图表实例
    if (chartInstance.current) {
      chartInstance.current.dispose()
    }
    chartInstance.current = echarts.init(chartRef.current)
    // 创建系列数据
    const series: any[] = []
    const categories = ['pH范围1', 'pH范围2', 'pH范围3']
    // 每个色块的高度，使总高度为14
    const blockHeight = 14 / 15 // 15个色块（pH0-14），总高度为14

    // 为每个pH值创建三个系列（每个范围一个）
    for (let ph = 0; ph <= 14; ph++) {
      // 为pH范围1创建系列
      series.push({
        name: `pH ${ph}-范围1`,
        type: 'bar',
        stack: '范围1',
        data: [blockHeight, 0, 0],
        itemStyle: {
          color: getPHColor(ph),
        },
        label: {
          show: true,
          position: 'inside',
          formatter: ph.toString(),
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      })
      // 为pH范围2创建系列
      series.push({
        name: `pH ${ph}-范围2`,
        type: 'bar',
        stack: '范围2',
        data: [0, blockHeight, 0],
        itemStyle: {
          color: getPHColor(ph),
        },
        label: {
          show: true,
          position: 'inside',
          formatter: ph.toString(),
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      })
      // 为pH范围3创建系列
      series.push({
        name: `pH ${ph}-范围3`,
        type: 'bar',
        stack: '范围3',
        data: [0, 0, blockHeight],
        itemStyle: {
          color: getPHColor(ph),
        },
        label: {
          show: true,
          position: 'inside',
          formatter: ph.toString(),
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      })
    }
    // 添加水平指示线系列
    // 中性点指示线 (pH=7)
    series.push({
      name: '中性点指示线',
      type: 'line',
      markLine: {
        silent: true,
        lineStyle: {
          color: '#ff0000',
          type: 'solid',
          width: 2,
        },
        label: {
          position: 'end',
          formatter: '中性点 (pH=7)',
          color: '#ff0000',
          fontSize: 12,
          fontWeight: 'bold',
        },
        data: [
          {
            yAxis: 7,
            name: '中性点',
          },
        ],
      },
      data: [0, 0, 0],
    })
    // 弱酸性指示线 (pH=3.5)
    series.push({
      name: '弱酸性指示线',
      type: 'line',
      markLine: {
        silent: true,
        lineStyle: {
          color: '#ff9900',
          type: 'solid',
          width: 2,
        },
        label: {
          position: 'end',
          formatter: '弱酸性 (pH=3.5)',
          color: '#ff9900',
          fontSize: 12,
          fontWeight: 'bold',
        },
        data: [
          {
            yAxis: 3.5,
            name: '弱酸性',
          },
        ],
      },
      data: [0, 0, 0],
    })
    // 弱碱性指示线 (pH=10.5)
    series.push({
      name: '弱碱性指示线',
      type: 'line',
      markLine: {
        silent: true,
        lineStyle: {
          color: '#0066ff',
          type: 'solid',
          width: 2,
        },
        label: {
          position: 'end',
          formatter: '弱碱性 (pH=10.5)',
          color: '#0066ff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        data: [
          {
            yAxis: 10.5,
            name: '弱碱性',
          },
        ],
      },
      data: [0, 0, 0],
    })
    // 配置图表选项
    const option: echarts.EChartsOption = {
      title: {
        text: '三pH范围堆叠柱状图（带水平指示线）',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 18,
          color: '#2c3e50',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          // 如果是指示线，不显示提示
          if (params.seriesName && params.seriesName.includes('指示线')) {
            return ''
          }
          try {
            // 检查系列名称格式是否正确
            if (!params.seriesName || typeof params.seriesName !== 'string') {
              return 'pH值: 未知'
            }

            // 确保系列名称格式为 "pH X-范围Y"
            const parts = params.seriesName.split('-')
            if (parts.length !== 2) {
              return 'pH值: 未知'
            }

            // 提取pH值部分
            const phPart = parts[0]
            const phString = phPart.replace('pH ', '').trim()
            const phValue = Number.parseFloat(phString)

            // 检查pH值是否有效
            if (isNaN(phValue) || phValue < 0 || phValue > 14) {
              return 'pH值: 无效'
            }

            const rangePart = parts[1]
            const phType = getPHType(phValue)
            const color = getPHColor(phValue)
            return `pH值: ${phValue}<br/>范围: ${rangePart}<br/>酸碱性: ${phType}<br/>颜色: ${color}`
          } catch (error) {
            console.error('Tooltip formatter error:', error)
            return 'pH值: 未知'
          }
        },
      },
      legend: {
        data: categories,
        top: 40,
        textStyle: {
          color: '#666',
        },
        itemWidth: 15,
        itemHeight: 15,
      },
      grid: {
        left: '8%',
        right: '5%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        axisLabel: {
          color: '#666',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 14,
        name: 'pH值',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#666',
          fontSize: 14,
          fontWeight: 'bold',
        },
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        axisLabel: {
          color: '#666',
          formatter: '{value}',
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#eee',
          },
        },
      },
      series: series,
    }
    // 应用配置
    chartInstance.current.setOption(option)
    // 响应式调整
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }
    window.addEventListener('resize', handleResize)
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstance.current) {
        chartInstance.current.dispose()
        chartInstance.current = null
      }
    }
  }, [getPHColor, getPHType])
  // 创建颜色参考条
  const renderColorScale = useCallback(() => {
    const blocks = []
    for (let i = 0; i <= 14; i++) {
      blocks.push(
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getPHColor(i),
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            height: '30px',
          }}
        >
          {i}
        </div>
      )
    }
    return blocks
  }, [getPHColor])
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card title="pH值堆叠柱状图（0-14）">
        {/* 图表容器 */}
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: '600px',
            marginBottom: '20px',
          }}
        />
        {/* pH范围图例 */}
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Space size="large">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#3498db',
                  marginRight: '8px',
                  borderRadius: '3px',
                }}
              ></div>
              <span>pH范围1</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#e74c3c',
                  marginRight: '8px',
                  borderRadius: '3px',
                }}
              ></div>
              <span>pH范围2</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#2ecc71',
                  marginRight: '8px',
                  borderRadius: '3px',
                }}
              ></div>
              <span>pH范围3</span>
            </div>
          </Space>
        </Row>
        {/* 指示线图例 */}
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Space size="middle">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: '#ff0000',
                  marginRight: '8px',
                }}
              ></div>
              <Text>中性点 (pH=7)</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: '#ff9900',
                  marginRight: '8px',
                }}
              ></div>
              <Text>弱酸性 (pH=3.5)</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '3px',
                  backgroundColor: '#0066ff',
                  marginRight: '8px',
                }}
              ></div>
              <Text>弱碱性 (pH=10.5)</Text>
            </div>
          </Space>
        </Row>
        {/* 颜色参考条 */}
        <div>
          <Title level={4}>pH值颜色渐变参考</Title>
          <div
            style={{
              display: 'flex',
              height: '30px',
              borderRadius: '4px',
              overflow: 'hidden',
              margin: '20px 0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {renderColorScale()}
          </div>
          <Row justify="space-between" style={{ padding: '0 5px' }}>
            <Col style={{ textAlign: 'center', width: '40px' }}>
              <Text type="secondary">
                0<br />
                强酸
              </Text>
            </Col>
            <Col style={{ textAlign: 'center', width: '40px' }}>
              <Text type="secondary">
                7<br />
                中性
              </Text>
            </Col>
            <Col style={{ textAlign: 'center', width: '40px' }}>
              <Text type="secondary">
                14 <br />
                强碱
              </Text>
            </Col>
          </Row>
        </div>
        {/* 说明信息 */}
        <Card style={{ marginTop: '20px', backgroundColor: '#f8f9fa' }}>
          <Title level={3}>图表说明</Title>
          <p>
            此图表展示了三个独立的pH范围堆叠柱状图，每个柱子都包含pH值0-14的完整渐变效果。从左到右分别是"pH范围1"、"pH范围2"和"pH范围3"。
          </p>
          <p>
            每个柱子被分为15个等高的色块（pH0到pH14），从底部的强酸性（红色）平滑过渡到顶部的强碱性（蓝色），中间的中性点（pH=7）显示为绿色。
          </p>
          <div>
            <strong>水平指示线</strong>：图表中添加了三条水平指示线，分别标记了重要的pH值位置：
            <ul>
              <li>红色实线：中性点 (pH=7)</li>
              <li>橙色实线：弱酸性分界线 (pH=3.5)</li>
              <li>蓝色实线：弱碱性分界线 (pH=10.5)</li>
            </ul>
            这些指示线贯穿三个柱子，便于快速比较不同范围在关键pH值位置的情况。
          </div>
        </Card>
      </Card>
    </div>
  )
}
export default PHBarChart
