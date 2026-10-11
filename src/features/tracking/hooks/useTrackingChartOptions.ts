import { useMemo } from 'react'
import type { EChartsCoreOption } from 'echarts'
import { getEventTypeColor, getEventTypeLabel } from '../model/eventTypes'
import type { PerformanceMetric, TrackingStats } from '../model/types'

const useTrackingChartOptions = (stats: TrackingStats | null) => {
  const trendChartOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.trend || stats.trend.length === 0) return null

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: 50,
        right: 20,
        top: 20,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: stats.trend.map((trend) => trend.hour.slice(11, 16)),
        axisLabel: {
          rotate: 45,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: '事件数',
      },
      series: [
        {
          name: '事件数',
          type: 'bar',
          data: stats.trend.map((trend) => [trend.count > 0 ? trend.count : null]),
          itemStyle: {
            color: '#646cff',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: { color: '#bd34fe' },
          },
        },
      ],
    }
  }, [stats])

  const typeChartOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.byType) return null

    const data = Object.entries(stats.byType).map(([name, value]) => ({
      name: getEventTypeLabel(name),
      value,
      itemStyle: { color: getEventTypeColor(name) },
    }))

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { fontSize: 12 },
      },
      series: [
        {
          name: '事件类型',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          data,
        },
      ],
    }
  }, [stats])

  const perfRadarOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.perfStats) return null

    const metrics: PerformanceMetric[] = ['fcp', 'lcp', 'fid', 'cls']
    const indicator = metrics.map((metric) => ({
      name: metric.toUpperCase(),
      max: metric === 'cls' ? 1 : metric === 'fid' ? 500 : 5000,
    }))
    const values = metrics.map((metric) => stats.perfStats[metric]?.avg || 0)

    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['性能平均值'],
      },
      radar: {
        indicator,
        center: ['40%', '50%'],
        radius: '60%',
      },
      series: [
        {
          name: '性能指标',
          type: 'radar',
          data: [
            {
              value: values,
              name: '性能平均值',
              areaStyle: { color: 'rgba(100, 108, 255, 0.2)' },
              lineStyle: { color: '#646cff' },
              itemStyle: { color: '#646cff' },
            },
          ],
        },
      ],
    }
  }, [stats])

  return { trendChartOption, typeChartOption, perfRadarOption }
}

export default useTrackingChartOptions
