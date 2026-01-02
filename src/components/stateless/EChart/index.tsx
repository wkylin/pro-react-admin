import cloneDeep from 'lodash/cloneDeep'
import { type CSSProperties, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'

type LoadingOption = Parameters<EChartsType['showLoading']>[1]

type OnEvents = Partial<Record<string, (params: unknown, chart: EChartsType) => void>>

export type EChartHandle = {
  getInstance: () => EChartsType | null
  resize: () => void
  dispose: () => void
}

export type EChartProps<TOption extends EChartsOption = EChartsOption> = {
  option?: TOption
  className?: string
  style?: CSSProperties

  renderer?: 'canvas' | 'svg'
  theme?: Parameters<typeof echarts.init>[1]
  initOptions?: Parameters<typeof echarts.init>[2]

  notMerge?: boolean
  lazyUpdate?: boolean
  silent?: boolean

  autoResize?: boolean
  resizeDebounceMs?: number

  onEvents?: OnEvents
  onInit?: (chart: EChartsType) => void

  loading?: boolean | LoadingOption
}

const useStableLatest = <T,>(value: T) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}

const getContainerSizeOk = (el: HTMLElement) => el.clientWidth > 0 && el.clientHeight > 0

const EChart = forwardRef<EChartHandle, EChartProps>((props, ref) => {
  const {
    option,
    className,
    style,
    renderer = 'canvas',
    theme = null,
    initOptions,
    notMerge = false,
    lazyUpdate = false,
    silent = false,
    autoResize = true,
    resizeDebounceMs = 100,
    onEvents,
    onInit,
    loading,
  } = props

  const domRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<EChartsType | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const resizeTimerRef = useRef<number | null>(null)
  const initObserverRef = useRef<ResizeObserver | null>(null)

  const onInitRef = useStableLatest(onInit)
  const onEventsRef = useStableLatest(onEvents)

  const dispose = useCallback(() => {
    if (initObserverRef.current) {
      initObserverRef.current.disconnect()
      initObserverRef.current = null
    }
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
      resizeObserverRef.current = null
    }
    if (resizeTimerRef.current) {
      window.clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = null
    }
    chartRef.current?.dispose()
    chartRef.current = null
  }, [])

  const resize = useCallback(() => {
    chartRef.current?.resize()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      getInstance: () => chartRef.current,
      resize,
      dispose,
    }),
    [dispose, resize]
  )

  // Init / Re-init when renderer/theme/initOptions changes.
  const initKey = useMemo(() => {
    let themeKey = 'null-theme'
    if (typeof theme === 'string') {
      themeKey = theme
    } else if (theme) {
      themeKey = 'object-theme'
    }
    const rendererKey = typeof renderer === 'string' ? renderer : 'renderer'
    return `${rendererKey}__${themeKey}`
  }, [renderer, theme])

  useEffect(() => {
    const el = domRef.current
    if (!el) return

    const doInit = () => {
      // Re-init safely.
      dispose()

      const chart = echarts.init(el, theme, {
        renderer,
        ...initOptions,
      })
      chartRef.current = chart
      onInitRef.current?.(chart)
    }

    // If container has no size yet, delay init.
    if (!getContainerSizeOk(el)) {
      // Observe once until it becomes measurable.
      initObserverRef.current?.disconnect()
      initObserverRef.current = new ResizeObserver(() => {
        if (!domRef.current) return
        if (!getContainerSizeOk(domRef.current)) return
        initObserverRef.current?.disconnect()
        initObserverRef.current = null
        doInit()
      })
      initObserverRef.current.observe(el)
      return () => {
        initObserverRef.current?.disconnect()
        initObserverRef.current = null
      }
    }

    doInit()

    return () => {
      chartRef.current?.dispose()
      chartRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initKey, dispose, initOptions])

  // Auto resize.
  useEffect(() => {
    if (!autoResize) return
    const el = domRef.current
    if (!el) return
    if (!chartRef.current) return

    if (resizeObserverRef.current) resizeObserverRef.current.disconnect()

    resizeObserverRef.current = new ResizeObserver(() => {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current)
      }
      resizeTimerRef.current = window.setTimeout(() => {
        resize()
      }, resizeDebounceMs)
    })

    resizeObserverRef.current.observe(el)

    return () => {
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current)
        resizeTimerRef.current = null
      }
    }
  }, [autoResize, resizeDebounceMs, resize])

  // Apply option.
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    if (!option) {
      chart.clear()
      return
    }

    const next = cloneDeep(option) as unknown

    // ECharts v6: prefer object-style opts.
    try {
      chart.setOption(
        next as EChartsOption,
        {
          notMerge,
          lazyUpdate,
          silent,
        } as any
      )
    } catch (error) {
      // Keep the app alive even if the provided option is invalid.
      console.error('EChart setOption error:', error)
    }
  }, [option, notMerge, lazyUpdate, silent])

  // Bind events.
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const events = onEvents
    if (!events) return

    const bindings = Object.entries(events).filter(([, fn]) => typeof fn === 'function') as Array<
      [string, (params: unknown, chart: EChartsType) => void]
    >

    for (const [eventName] of bindings) {
      chart.off(eventName as any)
      chart.on(eventName as any, (params: unknown) => {
        const handler = onEventsRef.current?.[eventName]
        if (typeof handler === 'function') handler(params, chart)
      })
    }

    return () => {
      for (const [eventName] of bindings) {
        chart.off(eventName as any)
      }
    }
  }, [onEvents])

  // Loading.
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    if (loading) {
      chart.showLoading('default', loading === true ? undefined : loading)
      return
    }
    chart.hideLoading()
  }, [loading])

  return <div ref={domRef} className={className} style={style} />
})

EChart.displayName = 'EChart'

export default EChart
