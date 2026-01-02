import { useCallback, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import china from '@assets/map/china.json'
import { GeoJSONCompressed } from 'echarts/types/src/coord/geo/geoTypes.js'
import EChart, { type EChartHandle } from '../EChart'
import useBigScreenChartsReinit from '@/components/hooks/useBigScreenChartsReinit'

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
  renderer?: 'canvas' | 'svg'
  notMerge?: boolean
  lazyUpdate?: boolean
  option: OptionType
  instanceHandle?: (instance: EChartsType) => void
}) => {
  const chartHandleRef = useRef<EChartHandle | null>(null)
  const [reinitKey, setReinitKey] = useState(0)
  const reinitSeqRef = useRef(0)

  const { renderer = 'canvas', notMerge = false, lazyUpdate = false, option, instanceHandle } = props

  const handleInit = useCallback(
    (chart: EChartsType) => {
      instanceHandle?.(chart)
    },
    [instanceHandle]
  )

  const bumpReinitKey = useCallback(() => {
    reinitSeqRef.current += 1
    setReinitKey(reinitSeqRef.current)
  }, [])

  useBigScreenChartsReinit(chartHandleRef, {
    onMissingInstance: bumpReinitKey,
  })

  // 组件挂载和卸载
  useEffect(() => {
    return () => {
      chartHandleRef.current?.dispose()
    }
  }, [bumpReinitKey])

  return (
    <EChart
      key={reinitKey}
      ref={(handle) => {
        chartHandleRef.current = handle
      }}
      className="default-chart"
      renderer={renderer}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      option={option as any}
      onInit={handleInit}
      style={{
        width: state.width,
        height: state.height,
        minHeight: '200px', // 确保容器有最小高度
      }}
    />
  )
}

export default EChartsCommon
