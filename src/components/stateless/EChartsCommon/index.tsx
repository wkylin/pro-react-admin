import { debounce } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import { RendererType } from 'echarts/types/src/util/types.js'
import china from '@assets/map/china.json'
import { GeoJSONCompressed } from 'echarts/types/src/coord/geo/geoTypes.js'

type OptionType = {
  [T: string]: unknown
}

const state = {
  width: '100%',
  height: '100%',
}

// 注册地图数据
echarts.registerMap('china', china as unknown as GeoJSONCompressed)

const EChartsCommon = (props: {
  renderer?: RendererType
  notMerge?: boolean
  lazyUpdate?: boolean
  option: OptionType
  instanceHandle?: (instance: EChartsType) => void
}) => {
  const drawDomRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<EChartsType | null>(null)
  const isInitializedRef = useRef(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  // 安全地销毁图表实例
  const dispose = useCallback(() => {
    if (chartRef.current) {
      try {
        chartRef.current.dispose()
      } catch (error) {
        console.error('ECharts dispose error:', error)
      }
      chartRef.current = null
      isInitializedRef.current = false
    }
  }, [])

  // 使用 ResizeObserver 替代 window.resize 事件
  const setupResizeObserver = useCallback(() => {
    if (!drawDomRef.current || !chartRef.current) return

    // 清理旧的观察者
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
    }

    // 创建新的观察者
    resizeObserverRef.current = new ResizeObserver(
      debounce(() => {
        if (chartRef.current) {
          try {
            chartRef.current.resize()
          } catch (error) {
            console.error('ECharts resize error:', error)
          }
        }
      }, 100)
    )

    resizeObserverRef.current.observe(drawDomRef.current)
  }, [])

  // 解构常用 props，避免在依赖数组使用整个 props 对象
  const { renderer = 'canvas', notMerge = false, lazyUpdate = false, option, instanceHandle } = props

  // 安全地设置图表配置
  const initChartRef = useRef<(dom: HTMLDivElement | null) => void | null>(null)

  const setOption = useCallback(
    (opt: OptionType) => {
      if (!chartRef.current) {
        console.warn('ECharts instance is not available')
        return
      }

      try {
        chartRef.current.setOption(opt, notMerge, lazyUpdate)
      } catch (error) {
        console.error('ECharts setOption error:', error)
        // 尝试重新初始化图表（通过 ref 调用，避免在声明前访问 initChart）
        dispose()
        initChartRef.current?.(drawDomRef.current)
      }
    },
    [notMerge, lazyUpdate, dispose]
  )

  // 初始化图表
  const initChart = useCallback(
    (dom: HTMLDivElement | null) => {
      if (!dom || chartRef.current) return

      try {
        // 确保 DOM 元素有尺寸
        if (dom.clientWidth === 0 || dom.clientHeight === 0) {
          console.warn('Chart container has zero size, delaying initialization')
          return
        }

        chartRef.current = echarts.init(dom, null, {
          renderer,
          width: 'auto',
          height: 'auto',
        })

        isInitializedRef.current = true

        // 执行初始化回调
        if (instanceHandle) {
          instanceHandle(chartRef.current)
        }

        // 设置初始配置
        setOption(option)

        // 设置尺寸观察
        setupResizeObserver()
      } catch (error) {
        console.error('ECharts initialization error:', error)
        chartRef.current = null
        isInitializedRef.current = false
      }
    },
    [renderer, instanceHandle, setOption, setupResizeObserver, option]
  )

  // 将 initChart 绑定到 ref，供 setOption 中安全调用
  useEffect(() => {
    initChartRef.current = initChart
    return () => {
      initChartRef.current = null
    }
  }, [initChart])

  // 处理图表初始化或更新
  const initHandle = useCallback(() => {
    if (!chartRef.current || !isInitializedRef.current) {
      initChart(drawDomRef.current)
    } else {
      setOption(props.option)
    }
  }, [initChart, setOption, props.option])

  // 组件挂载和卸载
  useEffect(() => {
    initHandle()

    // 监听 BigScreen 页面重新初始化事件
    const handleReinit = () => {
      // 延迟执行，确保容器可见
      setTimeout(() => {
        dispose()
        initChart(drawDomRef.current)
      }, 50)
    }
    window.addEventListener('bigscreen-charts-reinit', handleReinit)

    return () => {
      window.removeEventListener('bigscreen-charts-reinit', handleReinit)
      // 清理 ResizeObserver
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }

      // 销毁图表实例
      dispose()
    }
  }, [initHandle, dispose])

  // 当 option 变化时更新图表
  useEffect(() => {
    if (isInitializedRef.current) {
      setOption(props.option)
    }
  }, [props.option, setOption])

  return (
    <div
      className="default-chart"
      ref={drawDomRef}
      style={{
        width: state.width,
        height: state.height,
        minHeight: '200px', // 确保容器有最小高度
      }}
    />
  )
}

export default EChartsCommon
