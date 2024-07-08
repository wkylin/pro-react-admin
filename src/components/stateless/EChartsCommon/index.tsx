import { debounce } from 'lodash'
import React, { useCallback, useEffect, useRef } from 'react'
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

echarts.registerMap('china', china as unknown as GeoJSONCompressed)

const EChartsCommon = (props: {
  renderer?: RendererType
  notMerge?: boolean
  lazyUpdate?: boolean
  option: OptionType
  // eslint-disable-next-line no-unused-vars
  instanceHandle?: (instance: EChartsType) => void
}) => {
  const drawDomRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<EChartsType | null>(null)

  const dispose = () => {
    if (!chartRef.current) {
      return
    }
    chartRef.current.dispose()
    chartRef.current = null
  }

  const resize = debounce(() => {
    // eslint-disable-next-line no-unused-expressions
    chartRef.current && chartRef.current.resize()
  }, 100)

  const setOption = useCallback(
    (option: OptionType) => {
      if (!chartRef.current) {
        return
      }
      const { notMerge } = props
      const { lazyUpdate } = props
      chartRef.current.setOption(option, notMerge, lazyUpdate)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.notMerge, props.lazyUpdate]
  )

  // 初始化组件
  const initChart = (dom: HTMLDivElement | null) => {
    if (chartRef.current) return
    if (!dom) return
    // renderer 用于配置渲染方式 可以是 svg 或者 canvas
    const renderer = props.renderer || 'canvas'
    chartRef.current = echarts.init(dom, null, {
      renderer,
      width: 'auto',
      height: 'auto',
    })
    // 执行初始化的任务，例如注册地图
    if (props.instanceHandle) props.instanceHandle(chartRef.current)
    setOption(props.option)
    // 监听屏幕缩放，重新绘制 echart 图表
    window.addEventListener('resize', resize)
  }

  const initHandle = () => {
    // 还没实例走初始化
    if (!chartRef.current) {
      initChart(drawDomRef.current)
    } else {
      setOption(props.option)
    }
  }

  useEffect(
    () =>
      // 组件卸载
      () => {
        window.removeEventListener('resize', resize)
        dispose()
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // 每次更新组件都重置
  useEffect(() => {
    initHandle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.option])

  return <div className="default-chart" ref={drawDomRef} style={{ width: state.width, height: state.height }}></div>
}

export default EChartsCommon
