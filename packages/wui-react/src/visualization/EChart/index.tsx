import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'
export type EChartMap = {
  name: string
  data: Parameters<typeof echarts.registerMap>[1]
  specialAreas?: Parameters<typeof echarts.registerMap>[2]
}
export type EChartHandle = { getInstance: () => EChartsType | null; resize: () => void; dispose: () => void }
export type EChartProps<TOption extends EChartsOption = EChartsOption> = {
  option?: TOption
  className?: string
  style?: CSSProperties
  ariaLabel?: string
  renderer?: 'canvas' | 'svg'
  theme?: Parameters<typeof echarts.init>[1]
  initOptions?: Parameters<typeof echarts.init>[2]
  maps?: readonly EChartMap[]
  notMerge?: boolean
  lazyUpdate?: boolean
  silent?: boolean
  autoResize?: boolean
  resizeDebounceMs?: number
  onEvents?: Partial<Record<string, (params: unknown, chart: EChartsType) => void>>
  onInit?: (chart: EChartsType) => void
  onError?: (error: unknown) => void
  loading?: boolean | Parameters<EChartsType['showLoading']>[1]
}
/** Clone caller-owned option arrays/plain objects while preserving callback and platform object identities. */
function cloneOption<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  if (!value || typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value) as T
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype) return value
  const copy: Record<string, unknown> | unknown[] = Array.isArray(value) ? [] : {}
  seen.set(value, copy)
  for (const key of Object.keys(value))
    Object.defineProperty(copy, key, {
      value: cloneOption((value as Record<string, unknown>)[key], seen),
      enumerable: true,
      writable: true,
      configurable: true,
    })
  return copy as T
}
const EChart = forwardRef<EChartHandle, EChartProps>(
  (
    {
      option,
      className,
      style,
      ariaLabel = 'Chart',
      renderer = 'canvas',
      theme = null,
      initOptions,
      maps,
      notMerge = false,
      lazyUpdate = false,
      silent = false,
      autoResize = true,
      resizeDebounceMs = 100,
      onEvents,
      onInit,
      onError,
      loading,
    },
    ref
  ) => {
    const host = useRef<HTMLDivElement>(null)
    const instance = useRef<EChartsType | null>(null)
    const stop = useRef<() => void>(() => {})
    const [chart, setChart] = useState<EChartsType | null>(null)
    const latest = useRef({ onInit, onError })
    latest.current = { onInit, onError }
    const dispose = useCallback(() => {
      stop.current()
      instance.current?.dispose()
      instance.current = null
      setChart(null)
    }, [])
    useImperativeHandle(
      ref,
      () => ({ getInstance: () => instance.current, resize: () => instance.current?.resize(), dispose }),
      [dispose]
    )
    useEffect(() => {
      const element = host.current
      if (!element) return
      let timer: ReturnType<typeof setTimeout> | undefined
      let observer: ResizeObserver | undefined
      let disposed = false
      const initialize = () => {
        if (disposed || instance.current) return
        if (
          (!element.clientWidth || !element.clientHeight) &&
          !(initOptions?.width && initOptions?.height) &&
          typeof ResizeObserver !== 'undefined'
        )
          return
        try {
          maps?.forEach((map) => echarts.registerMap(map.name, map.data, map.specialAreas))
          const next = echarts.init(element, theme, { renderer, ...initOptions })
          instance.current = next
          setChart(next)
          latest.current.onInit?.(next)
        } catch (error) {
          latest.current.onError?.(error)
        }
      }
      const resized = () => {
        initialize()
        if (autoResize) {
          clearTimeout(timer)
          timer = setTimeout(() => instance.current?.resize(), resizeDebounceMs)
        }
      }
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(resized)
        observer.observe(element)
      } else if (autoResize) window.addEventListener('resize', resized)
      const cleanup = () => {
        disposed = true
        observer?.disconnect()
        clearTimeout(timer)
        window.removeEventListener('resize', resized)
      }
      stop.current = cleanup
      initialize()
      return () => {
        cleanup()
        instance.current?.dispose()
        instance.current = null
      }
    }, [renderer, theme, initOptions, maps, autoResize, resizeDebounceMs])
    useEffect(() => {
      if (!chart || chart !== instance.current) return
      try {
        if (option) chart.setOption(cloneOption(option), { notMerge, lazyUpdate, silent })
        else chart.clear()
      } catch (error) {
        latest.current.onError?.(error)
      }
    }, [chart, option, notMerge, lazyUpdate, silent])
    useEffect(() => {
      if (!chart || chart !== instance.current) return
      const bindings = Object.entries(onEvents ?? {}).flatMap(([name, callback]) =>
        callback ? [{ name, handler: (event: unknown) => callback(event, chart) }] : []
      )
      bindings.forEach(({ name, handler }) => chart.on(name, handler))
      return () => {
        if (!chart.isDisposed()) bindings.forEach(({ name, handler }) => chart.off(name, handler))
      }
    }, [chart, onEvents])
    useEffect(() => {
      if (!chart || chart !== instance.current) return
      if (loading) chart.showLoading('default', loading === true ? undefined : loading)
      else chart.hideLoading()
    }, [chart, loading])
    return (
      <div
        ref={host}
        role="img"
        aria-label={ariaLabel}
        className={className}
        style={{ width: '100%', height: 400, ...style }}
      />
    )
  }
)
EChart.displayName = 'EChart'
export default EChart
