// ============================================================
// 埋点 SDK - React 集成
// ============================================================

import { createContext, useContext, useEffect, useCallback, useRef, type ReactNode, type FC } from 'react'
import type { EventType, TrackerConfig, ITrackerCore } from './types'
import { TrackerCore } from './core'

// ===================== Context =====================

const TrackerContext = createContext<ITrackerCore | null>(null)

/** 获取当前追踪器实例的 Hook */
export function useTracker(): ITrackerCore | null {
  return useContext(TrackerContext)
}

// ===================== Provider =====================

interface TrackerProviderProps {
  config: TrackerConfig
  plugins?: {
    pageview?: boolean
    click?: boolean
    exposure?: boolean
    performance?: boolean
    error?: boolean
  }
  children: ReactNode
}

/**
 * 追踪器 Provider
 * 在应用根组件包裹，初始化埋点 SDK
 *
 * @example
 * ```tsx
 * <TrackerProvider
 *   config={{
 *     appId: 'pro-react-admin',
 *     endpoint: '/api/track',
 *     debug: import.meta.env.DEV,
 *   }}
 *   plugins={{ pageview: true, click: true, performance: true }}
 * >
 *   <App />
 * </TrackerProvider>
 * ```
 */
export const TrackerProvider: FC<TrackerProviderProps> = ({ config, plugins, children }) => {
  const trackerRef = useRef<ITrackerCore | null>(null)

  if (!trackerRef.current) {
    trackerRef.current = new TrackerCore(config)

    // 安装插件
    if (plugins) {
      installPlugins(trackerRef.current, plugins)
    }
  }

  useEffect(() => {
    return () => {
      if (trackerRef.current) {
        ;(trackerRef.current as TrackerCore).destroy()
        trackerRef.current = null
      }
    }
  }, [])

  return <TrackerContext.Provider value={trackerRef.current}>{children}</TrackerContext.Provider>
}

/** 动态安装插件 */
async function installPlugins(tracker: ITrackerCore, plugins: TrackerProviderProps['plugins']): Promise<void> {
  if (!plugins) return

  const { PageViewPlugin, ClickPlugin, ExposurePlugin, PerformancePlugin, ErrorPlugin } = await import('./plugins')

  if (plugins.pageview) tracker.use(PageViewPlugin)
  if (plugins.click) tracker.use(ClickPlugin)
  if (plugins.exposure) tracker.use(ExposurePlugin)
  if (plugins.performance) tracker.use(PerformancePlugin)
  if (plugins.error) tracker.use(ErrorPlugin)
}

// ===================== Hooks =====================

/**
 * 埋点 Hook
 *
 * @example
 * ```tsx
 * function LoginPage() {
 *   const { track } = useTrack()
 *
 *   const handleLogin = () => {
 *     track('login_click', { method: 'password' })
 *   }
 * }
 * ```
 */
export function useTrack() {
  const tracker = useTracker()

  const track = useCallback(
    (eventName: string, properties?: Record<string, unknown>, type?: EventType) => {
      if (!tracker) {
        console.warn('[Tracker] 追踪器未初始化，请确保在 <TrackerProvider> 内使用')
        return
      }
      tracker.track(eventName, properties, type)
    },
    [tracker]
  )

  const setUserId = useCallback((userId: string) => tracker?.setUserId(userId), [tracker])

  const clearUserId = useCallback(() => tracker?.clearUserId(), [tracker])

  return { track, setUserId, clearUserId, tracker }
}

/**
 * 页面浏览追踪 Hook
 * 在组件挂载时自动上报 PV
 *
 * @example
 * ```tsx
 * function DashboardPage() {
 *   usePageView('dashboard', { section: 'overview' })
 *   // ...
 * }
 * ```
 */
export function usePageView(pageName?: string, extraProperties?: Record<string, unknown>): void {
  const tracker = useTracker()

  useEffect(() => {
    if (!tracker) return

    tracker.track(
      'page_view',
      {
        page_name: pageName || document.title,
        ...extraProperties,
      },
      'pageview'
    )
  }, [tracker, pageName, extraProperties])
}

/**
 * 曝光追踪 Hook
 * 自动监听元素进入视口
 *
 * @example
 * ```tsx
 * function Banner() {
 *   const ref = useExposureTrack('banner_exposure', { position: 'top' })
 *   return <div ref={ref}>Banner Content</div>
 * }
 * ```
 */
export function useExposureTrack(
  eventName: string,
  properties?: Record<string, unknown>,
  options?: {
    threshold?: number
    once?: boolean
  }
): React.RefObject<HTMLDivElement | null> {
  const tracker = useTracker()
  const ref = useRef<HTMLDivElement | null>(null)
  const tracked = useRef(false)

  useEffect(() => {
    if (!tracker || !ref.current || typeof IntersectionObserver === 'undefined') return

    const { threshold = 0.5, once = true } = options || {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !tracked.current)) {
          tracked.current = true
          tracker.track(
            eventName,
            {
              intersectionRatio: Math.round(entry.intersectionRatio * 100) / 100,
              ...properties,
            },
            'exposure'
          )

          if (once) {
            observer.disconnect()
          }
        }
      },
      { threshold }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [tracker, eventName, properties, options])

  return ref
}

// ===================== 声明式组件 =====================

interface TrackClickProps {
  eventName: string
  properties?: Record<string, unknown>
  className?: string
  style?: React.CSSProperties
  children: ReactNode
}

/**
 * 点击埋点包裹组件
 *
 * @example
 * ```tsx
 * <TrackClick eventName="help_link_click" properties={{ from: 'navbar' }}>
 *   <a href="/help">帮助</a>
 * </TrackClick>
 * ```
 */
export const TrackClick: FC<TrackClickProps> = ({ eventName, properties, className, style, children }) => {
  const { track } = useTrack()

  const handleClick = (e: React.MouseEvent) => {
    track(eventName, {
      tagName: (e.target as HTMLElement).tagName.toLowerCase(),
      textContent: (e.target as HTMLElement).textContent?.trim().slice(0, 200),
      ...properties,
    })
  }

  return (
    <span onClick={handleClick} className={className} style={style}>
      {children}
    </span>
  )
}

interface TrackViewProps {
  eventName: string
  properties?: Record<string, unknown>
  className?: string
  style?: React.CSSProperties
  children: ReactNode
  /** 曝光阈值 */
  threshold?: number
  /** 是否只触发一次 */
  once?: boolean
}

/**
 * 曝光埋点包裹组件
 *
 * @example
 * ```tsx
 * <TrackView eventName="promo_banner_view" once>
 *   <PromoBanner />
 * </TrackView>
 * ```
 */
export const TrackView: FC<TrackViewProps> = ({
  eventName,
  properties,
  className,
  style,
  children,
  threshold = 0.5,
  once = true,
}) => {
  const ref = useExposureTrack(eventName, properties, { threshold, once })

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
