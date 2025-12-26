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

  // 安全地设置图表配置
  const setOption = useCallback(
    (option: OptionType) => {
      if (!chartRef.current) {
        console.warn('ECharts instance is not available')
        return
      }

      try {
        const { notMerge = false, lazyUpdate = false } = props
        chartRef.current.setOption(option, notMerge, lazyUpdate)
      } catch (error) {
        console.error('ECharts setOption error:', error)
        // 尝试重新初始化图表
        dispose()
        initChart(drawDomRef.current)
      }
    },
    [props.notMerge, props.lazyUpdate, dispose]
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

        const renderer = props.renderer || 'canvas'
        chartRef.current = echarts.init(dom, null, {
          renderer,
          width: 'auto',
          height: 'auto',
        })

        isInitializedRef.current = true

        // 执行初始化回调
        if (props.instanceHandle) {
          props.instanceHandle(chartRef.current)
        }

        // 设置初始配置
        setOption(props.option)

        // 设置尺寸观察
        setupResizeObserver()
      } catch (error) {
        console.error('ECharts initialization error:', error)
        chartRef.current = null
        isInitializedRef.current = false
      }
    },
    [props, setOption, setupResizeObserver]
  )

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
