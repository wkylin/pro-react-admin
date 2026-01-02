import { useEffect } from 'react'

const DEFAULT_BIGSCREEN_CHARTS_REINIT_EVENT = 'bigscreen-charts-reinit'
const DEFAULT_REINIT_DELAY_MS = 50

export type ResizeCapableHandle = {
  getInstance?: () => unknown
  resize?: () => void
}

export type UseBigScreenChartsReinitOptions = {
  enabled?: boolean
  /** 仅在特殊场景需要覆盖，默认使用 50ms */
  delayMs?: number
  /** 仅在特殊场景需要覆盖，默认使用 `bigscreen-charts-reinit` */
  eventName?: string
  onMissingInstance?: () => void
}

/**
 * BigScreen 专用：监听 `bigscreen-charts-reinit`，在布局稳定后触发一次图表自适应（优先 resize）。
 *
 * 约定：
 * - 不做 dispose/remount（除非调用方通过 onMissingInstance 自己兜底）
 * - 允许延迟执行，避免容器仍在缩放/渲染中
 */
export default function useBigScreenChartsReinit(
  chartHandleRef: React.RefObject<ResizeCapableHandle | null>,
  options: UseBigScreenChartsReinitOptions = {}
) {
  const {
    enabled = true,
    delayMs = DEFAULT_REINIT_DELAY_MS,
    eventName = DEFAULT_BIGSCREEN_CHARTS_REINIT_EVENT,
    onMissingInstance,
  } = options

  useEffect(() => {
    if (!enabled) return

    const handleReinit = () => {
      window.setTimeout(() => {
        const handle = chartHandleRef.current
        if (!handle) {
          onMissingInstance?.()
          return
        }

        const hasInstance = typeof handle.getInstance === 'function' ? Boolean(handle.getInstance()) : true
        if (hasInstance && typeof handle.resize === 'function') {
          handle.resize()
          return
        }

        onMissingInstance?.()
      }, delayMs)
    }

    window.addEventListener(eventName, handleReinit)
    return () => window.removeEventListener(eventName, handleReinit)
  }, [chartHandleRef, delayMs, enabled, eventName, onMissingInstance])
}
