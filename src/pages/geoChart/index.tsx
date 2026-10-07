import { useState, useRef, useCallback, useMemo } from 'react'
import type { ComponentType, CSSProperties, ReactNode } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'
import type { GeoJSON } from 'echarts/types/src/coord/geo/geoTypes.js'
import type { ElementEvent } from 'zrender'
import FixTabPanel from '@stateless/FixTabPanel'
import EChart from '@stateless/EChart'
import fengxianGeo from './geo/fengxian.json'

type GeoPanelProps = {
  children?: ReactNode
  style?: CSSProperties
}

type ChartEventParams = {
  componentType: string
  name?: unknown
}

const isChartEventParams = (params: unknown): params is ChartEventParams =>
  typeof params === 'object' && params !== null && 'componentType' in params && typeof params.componentType === 'string'

const fengxianGeoJson = fengxianGeo as unknown as GeoJSON
const TypedFixTabPanel = FixTabPanel as unknown as ComponentType<GeoPanelProps>

const GeoChart = () => {
  const chartInstanceRef = useRef<EChartsType | null>(null)
  const zrClickHandlerRef = useRef<((event: ElementEvent) => boolean | void) | null>(null)

  const [geoJson, setGeoJson] = useState<GeoJSON>(fengxianGeoJson)
  const [name, setName] = useState('奉贤')
  const [region, setRegion] = useState('310120')

  const buildOption = useCallback((geoName: string): EChartsOption => {
    const next: EChartsOption = {
      tooltip: {},
      geo: {
        map: geoName,
        label: {
          show: true,
          color: '#fff',
        },
        layoutCenter: ['30%', '30%'],
        roam: true,
        zoom: 1,
        scaleLimit: {
          min: 1,
          max: 5,
        },
        tooltip: {
          show: true, // 是否显示提示框组件，包括提示框浮层和 axisPointer。
          enterable: true, // 鼠标是否可进入提示框浮层中，默认为false，
          triggerOn: 'mousemove', // 提示框触发的条件(mousemove|click|none)
          showDelay: 0, // 浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          padding: [8, 8],
          hideDelay: 10, // 浮层隐藏的延迟
          backgroundColor: 'white', // 提示框浮层的背景颜色。
          borderColor: 'green', // 图形的描边颜色
          borderWidth: 2,
          alwaysShowContent: true,
          transitionDuration: 1, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
        },
        // regions: [{
        //   name: '上海市奉贤区海湾旅游区',
        //   itemStyle: {
        //       areaColor: 'red',
        //       color: 'red'
        //   }
        // }],
        itemStyle: {
          areaColor: '#0C1F30',
          borderColor: 'rgba(6, 93, 255, .5)',
          borderWidth: 1,
          shadowColor: 'rgba(6, 93, 255, .5)',
          shadowBlur: 20,
        },
        emphasis: {
          disabled: false, // 是否关闭高亮状态
          label: {
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#fff',
          },
          itemStyle: {
            areaColor: 'rgba(58, 172, 226, .5)',
          },
        },
        select: {
          itemStyle: {
            areaColor: 'rgba(58, 172, 226, .5)',
          },
        },
      },
      series: [
        {
          name: geoName,
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [],
        },
      ],
    }
    return next
  }, [])

  const handleChartInit = useCallback((chart: EChartsType) => {
    chartInstanceRef.current = chart

    const zr = chart.getZr?.()
    if (!zr) return

    if (zrClickHandlerRef.current) {
      zr.off('click', zrClickHandlerRef.current)
    }

    const handler = (event: ElementEvent) => {
      if (!event?.target) {
        setName('奉贤')
        setGeoJson(fengxianGeoJson)
        setRegion('310120')
      }
    }
    zrClickHandlerRef.current = handler
    zr.on('click', handler)
  }, [])

  const handleChartClick = useCallback((params: unknown) => {
    if (!isChartEventParams(params)) return

    if (params.componentType === 'series') {
      console.log('params', params)
    }
    if (params.componentType === 'geo' && typeof params.name === 'string') {
      const newName = params.name
      const features = fengxianGeoJson.features.filter((item) => item.properties.name === newName)
      if (!features?.length) return
      const feature = features[0]
      if (!feature || feature.id == null) return
      const newGeoJSON: GeoJSON = {
        type: 'FeatureCollection',
        features,
      }
      setName(newName)
      setGeoJson(newGeoJSON)
      setRegion(String(feature.id))
    }
  }, [])

  const option = useMemo(() => {
    echarts.registerMap(name, geoJson)
    return buildOption(name)
  }, [name, geoJson, buildOption, region])

  return (
    <TypedFixTabPanel style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}>
      <EChart
        option={option}
        onInit={handleChartInit}
        onEvents={{ click: handleChartClick }}
        notMerge
        style={{ height: '500px', width: '100%', margin: '0 auto' }}
      />
    </TypedFixTabPanel>
  )
}

export default GeoChart
