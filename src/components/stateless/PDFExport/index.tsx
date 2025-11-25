'use client'
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import * as echarts from 'echarts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Button, Card, Typography, message, Row, Col, Statistic } from 'antd'
import { DownloadOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography

interface ChartData {
  name: string
  value: number
}

// 将数据移到组件外部，避免每次渲染重新创建
const initialSalesData: ChartData[] = [
  { name: '一月', value: 820 },
  { name: '二月', value: 932 },
  { name: '三月', value: 901 },
  { name: '四月', value: 934 },
  { name: '五月', value: 1290 },
  { name: '六月', value: 1330 },
]

const initialPieData: ChartData[] = [
  { name: '产品A', value: 335 },
  { name: '产品B', value: 310 },
  { name: '产品C', value: 234 },
  { name: '产品D', value: 135 },
  { name: '产品E', value: 148 },
]

const PDFExportDemo: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null) // 使用ref代替state存储图表实例
  const [isExporting, setIsExporting] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  // 使用useMemo确保数据不会在每次渲染时重新创建
  const salesData = useMemo(() => initialSalesData, [])
  const pieData = useMemo(() => initialPieData, [])

  const initCharts = useCallback(() => {
    if (!chartRef.current) return

    // 如果已存在图表实例，先销毁
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
    }

    const chart = echarts.init(chartRef.current)
    chartInstanceRef.current = chart // 保存到ref中
    const option = {
      title: {
        text: '销售数据统计',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: salesData.map((item) => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '销售额',
          type: 'bar',
          data: salesData.map((item) => item.value),
          itemStyle: {
            color: '#1890ff',
          },
        },
      ],
    }
    chart.setOption(option)

    const handleResize = () => {
      chart.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [salesData]) // 依赖项现在是稳定的

  useEffect(() => {
    const cleanup = initCharts()
    return cleanup
  }, [initCharts])

  const waitForChartsRender = (): Promise<void> => {
    return new Promise((resolve) => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize()
        setTimeout(resolve, 500)
      } else {
        resolve()
      }
    })
  }

  const exportToPDF = async () => {
    if (!contentRef.current) {
      messageApi.error('内容区域未找到')
      return
    }

    setIsExporting(true)
    try {
      messageApi.info('正在生成PDF，请稍候...')
      await waitForChartsRender()

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`数据报告_${new Date().toLocaleDateString()}.pdf`)
      messageApi.success('PDF导出成功！')
    } catch (error) {
      console.error('PDF导出失败:', error)
      messageApi.error('PDF导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {contextHolder}
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Title level={1} style={{ marginBottom: '8px' }}>
          <FileTextOutlined style={{ marginRight: '8px' }} />
          React 19 + ECharts 6 + Ant Design 5
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>演示如何将包含图表的页面导出为PDF文件</Paragraph>
      </div>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Button
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={exportToPDF}
          loading={isExporting}
          style={{ padding: '0 32px' }}
        >
          {isExporting ? '正在导出...' : '导出PDF'}
        </Button>
      </div>
      <div ref={contentRef} style={{ padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            数据分析报告
          </Title>
          <Paragraph style={{ fontSize: '14px' }}>生成时间: {new Date().toLocaleString()}</Paragraph>
        </div>
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={salesData.reduce((sum, item) => sum + item.value, 0)}
                precision={0}
                styles={{ content: { color: '#3f8600' } }}
                prefix="¥"
                suffix="万"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="平均月销售"
                value={salesData.reduce((sum, item) => sum + item.value, 0) / salesData.length}
                precision={1}
                styles={{ content: { color: '#1890ff' } }}
                prefix="¥"
                suffix="万"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="最高月销售"
                value={Math.max(...salesData.map((item) => item.value))}
                precision={0}
                styles={{ content: { color: '#cf1322' } }}
                prefix="¥"
                suffix="万"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="产品种类"
                value={pieData.length}
                styles={{ content: { color: '#722ed1' } }}
                suffix="种"
              />
            </Card>
          </Col>
        </Row>
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Title level={3}>
              <BarChartOutlined style={{ marginRight: '8px' }} />
              销售趋势图表
            </Title>
          </div>
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </Card>
        <Card>
          <Title level={3} style={{ marginBottom: '16px' }}>
            详细数据
          </Title>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Title level={4}>月度销售数据</Title>
              <div>
                {salesData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ fontWeight: '600' }}>¥{item.value}万</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>产品销售占比</Title>
              <div>
                {pieData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px',
                      borderRadius: '4px',
                      marginBottom: '8px',
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ fontWeight: '600' }}>{item.value}件</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
          <Paragraph>本报告由React 19 + ECharts 6 + Ant Design 5技术栈生成</Paragraph>
        </div>
      </div>
    </div>
  )
}

export default PDFExportDemo
