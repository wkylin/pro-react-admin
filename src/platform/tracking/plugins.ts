// ============================================================
// 埋点 SDK - 内置插件
// ============================================================

import type { TrackerPlugin, ITrackerCore } from './types'
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

// ===================== 页面浏览插件 =====================
/**
 * 自动监听路由变化并上报 PV
 * 支持 History API (pushState/replaceState) 和 hashchange
 */
export const PageViewPlugin: TrackerPlugin = {
  name: 'pageview',
  version: '1.0.0',
  install(tracker: ITrackerCore) {
    // 监听 History API
    const originalPushState = history.pushState.bind(history)
    const originalReplaceState = history.replaceState.bind(history)

    const trackPV = () => {
      tracker.track('page_view', {}, 'pageview')
    }

    history.pushState = function (...args) {
      originalPushState(...args)
      trackPV()
    }

    history.replaceState = function (...args) {
      originalReplaceState(...args)
      trackPV()
    }

    // 监听 hashchange
    window.addEventListener('hashchange', trackPV)

    // popstate (浏览器前进后退)
    window.addEventListener('popstate', trackPV)

    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('hashchange', trackPV)
      window.removeEventListener('popstate', trackPV)
    }
  },
}

// ===================== 点击事件插件 =====================
/**
 * 自动监听全局点击事件，通过 data-track-* 属性声明式埋点
 *
 * 用法：
 * <button data-track-click="btn_submit" data-track-props='{"module":"login"}'>提交</button>
 * <button data-track-ignore>不追踪这个按钮</button>
 */
export const ClickPlugin: TrackerPlugin = {
  name: 'click',
  version: '1.0.0',
  install(tracker: ITrackerCore) {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // 查找最近的带 track 属性的元素
      const trackedElement = target.closest('[data-track-click]') as HTMLElement | null
      if (!trackedElement) return

      // 检查是否忽略
      if (target.closest('[data-track-ignore]')) return

      const eventName = trackedElement.getAttribute('data-track-click') || 'element_click'
      let props: Record<string, unknown> = {
        tagName: trackedElement.tagName.toLowerCase(),
        className: trackedElement.className,
        id: trackedElement.id || undefined,
        textContent: trackedElement.textContent?.trim().slice(0, 200) || '',
      }

      // 解析 data-track-props
      const propsAttr = trackedElement.getAttribute('data-track-props')
      if (propsAttr) {
        try {
          props = { ...props, ...JSON.parse(propsAttr) }
        } catch {
          console.warn('[Tracker] data-track-props 解析失败:', propsAttr)
        }
      }

      tracker.track(eventName, props, 'click')
    }

    document.addEventListener('click', handler, true)

    return () => {
      document.removeEventListener('click', handler, true)
    }
  },
}

// ===================== 元素曝光插件 =====================
/**
 * 基于 IntersectionObserver 的元素曝光追踪
 *
 * 用法：
 * <div data-track-exposure="banner_show" data-track-exposure-threshold="0.5">Banner</div>
 */
export const ExposurePlugin: TrackerPlugin = {
  name: 'exposure',
  version: '1.0.0',
  install(tracker: ITrackerCore) {
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('[Tracker] IntersectionObserver 不可用，曝光插件未启用')
      return
    }

    const exposedElements = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          const el = entry.target as HTMLElement
          if (exposedElements.has(el)) continue

          const eventName = el.getAttribute('data-track-exposure')
          if (!eventName) continue

          // 检查是否忽略
          if (el.closest('[data-track-ignore]')) continue

          exposedElements.add(el)

          let props: Record<string, unknown> = {
            tagName: el.tagName.toLowerCase(),
            className: el.className,
            id: el.id || undefined,
            intersectionRatio: Math.round(entry.intersectionRatio * 100) / 100,
          }

          const propsAttr = el.getAttribute('data-track-props')
          if (propsAttr) {
            try {
              props = { ...props, ...JSON.parse(propsAttr) }
            } catch {
              // ignore
            }
          }

          tracker.track(eventName, props, 'exposure')
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    // 观察所有带 data-track-exposure 属性的元素
    const observeElements = () => {
      const elements = document.querySelectorAll('[data-track-exposure]')
      for (const el of elements) {
        observer.observe(el)
      }
    }

    // 初始观察
    observeElements()

    // 监听 DOM 变化，观察新增元素
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  },
}

// ===================== 性能监控插件 =====================
/**
 * Use the reference Web Vitals implementation. A single page-lifetime observer set
 * fans out to currently mounted trackers so MFE remounts do not add duplicate observers.
 */
const activePerformanceTrackers = new Set<ITrackerCore>()
let performanceObserversInstalled = false

function reportWebVital(metric: Metric) {
  const name = metric.name.toLowerCase()
  const unit = metric.name === 'CLS' ? 'unitless' : 'ms'
  const value = Math.round(metric.value * 100) / 100
  const properties = {
    metric: metric.name,
    value,
    delta: Math.round(metric.delta * 100) / 100,
    unit,
    rating: metric.rating,
    navigationType: metric.navigationType,
  }
  for (const tracker of activePerformanceTrackers) tracker.track(name, properties, 'performance')
}

function installWebVitalObservers() {
  if (performanceObserversInstalled || typeof window === 'undefined') return
  performanceObserversInstalled = true
  // web-vitals reports page-level metrics at its lifecycle boundary and has no unsubscribe API.
  // Keep exactly one set for the page lifetime; plugin cleanup only removes tracker subscribers.
  onCLS(reportWebVital)
  onFCP(reportWebVital)
  onINP(reportWebVital)
  onLCP(reportWebVital)
  onTTFB(reportWebVital)
}

export const PerformancePlugin: TrackerPlugin = {
  name: 'performance',
  version: '3.0.0',
  install(tracker: ITrackerCore) {
    if (typeof window === 'undefined') return
    activePerformanceTrackers.add(tracker)
    installWebVitalObservers()
    return () => activePerformanceTrackers.delete(tracker)
  },
}

// ===================== 错误监控插件 =====================
/**
 * 自动捕获全局 JS 错误和 Promise 异常
 * 注意：本项目已集成 Sentry，此插件仅作为补充轻量方案
 */
export const ErrorPlugin: TrackerPlugin = {
  name: 'error',
  version: '1.0.0',
  install(tracker: ITrackerCore) {
    // 全局 JS 错误
    const onError = (message: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
      tracker.track(
        'js_error',
        {
          message: typeof message === 'string' ? message : (message as ErrorEvent).message,
          source,
          lineno,
          colno,
          errorName: error?.name,
          errorMessage: error?.message,
          stack: error?.stack?.slice(0, 1000),
        },
        'error'
      )
    }

    window.addEventListener('error', onError as EventListener)

    // Promise 异常
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      tracker.track(
        'promise_error',
        {
          reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
          stack: event.reason instanceof Error ? event.reason.stack?.slice(0, 1000) : undefined,
        },
        'error'
      )
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection)

    return () => {
      window.removeEventListener('error', onError as EventListener)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  },
}
