// ============================================================
// 埋点 SDK - 核心引擎
// ============================================================

import type { TrackEvent, EventType, TrackerConfig, ITrackerCore, TrackerPlugin } from './types'
import { generateUUID, getPageInfo, getDeviceContext, sanitizeData, requestIdleCallbackPolyfill } from './utils'
import { SessionManager } from './session'
import { EventBuffer } from './buffer'
import { Transport } from './transport'

/** 默认配置 */
const DEFAULT_CONFIG: Required<Omit<TrackerConfig, 'beforeSend' | 'headers'>> = {
  appId: '',
  appVersion: '0.0.0',
  endpoint: '',
  batchSize: 10,
  batchInterval: 5000,
  beaconMinPriority: 'high',
  maxRetries: 3,
  retryBaseDelay: 1000,
  debug: false,
  sampleRate: 1,
  optOut: false,
  sensitiveFields: [],
}

/**
 * 核心追踪器
 * 协调会话管理、事件缓冲、插件系统和传输层
 */
export class TrackerCore implements ITrackerCore {
  private config: Required<Omit<TrackerConfig, 'beforeSend' | 'headers'>> &
    Pick<TrackerConfig, 'beforeSend' | 'headers'>
  private session: SessionManager
  private buffer: EventBuffer
  private transport: Transport
  private plugins: Map<string, TrackerPlugin> = new Map()
  private flushing = false
  private flushTimer: ReturnType<typeof setTimeout> | null = null
  private commonProperties: Record<string, unknown> = {}
  private destroyed = false

  constructor(config: TrackerConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      sensitiveFields: config.sensitiveFields || DEFAULT_CONFIG.sensitiveFields,
    }

    if (this.config.debug) {
      console.debug('[Tracker] 初始化配置:', this.config)
    }

    this.session = new SessionManager()
    this.buffer = new EventBuffer()
    this.transport = new Transport(this.config as TrackerConfig)

    // 启动定时刷新
    this.startFlushTimer()

    // 页面关闭前发送所有事件
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', this.handleBeforeUnload)
      // 页面隐藏时也尝试发送
      document.addEventListener('visibilitychange', this.handleVisibilityChange)
      // 页面冻结时（移动端）也发送
      document.addEventListener('freeze', this.handlePageFreeze)
      // 网络恢复时尝试发送（resume 事件配合 freeze）
      document.addEventListener('resume', this.handlePageResume)

      // 初始 PV
      this.trackPageView()
    }
  }

  // ==================== 公共 API ====================

  /** 追踪事件 */
  track(eventName: string, properties?: Record<string, unknown>, type: EventType = 'custom'): void {
    if (this.destroyed || this.config.optOut) return

    // 采样控制
    if (Math.random() > this.config.sampleRate) return

    const event = this.createEvent(eventName, properties, type)
    this.buffer.push(event)

    if (this.config.debug) {
      console.debug(`[Tracker] 事件入队: ${eventName}`, event)
    }

    // 实时检查是否需要发送
    this.checkFlush()
  }

  /** 设置用户 ID */
  setUserId(userId: string): void {
    this.session.setUserId(userId)
    if (this.config.debug) {
      console.debug('[Tracker] 用户 ID 已设置:', userId)
    }
  }

  /** 清除用户 ID */
  clearUserId(): void {
    this.session.clearUserId()
    if (this.config.debug) {
      console.debug('[Tracker] 用户 ID 已清除')
    }
  }

  /** 设置公共属性（所有事件自动附加） */
  setCommonProperties(properties: Record<string, unknown>): void {
    this.commonProperties = { ...this.commonProperties, ...properties }
  }

  /** 获取配置 */
  getConfig(): TrackerConfig {
    return this.config as TrackerConfig
  }

  /** 注册插件 */
  use(plugin: TrackerPlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`[Tracker] 插件 ${plugin.name} 已注册，跳过`)
      return
    }

    if (this.config.debug) {
      console.debug(`[Tracker] 注册插件: ${plugin.name}`)
    }

    const cleanup = plugin.install(this)
    this.plugins.set(plugin.name, {
      ...plugin,
      uninstall: cleanup
        ? () => {
            cleanup()
            plugin.uninstall?.()
          }
        : plugin.uninstall,
    })
  }

  /** 立即刷新队列 */
  async flush(): Promise<void> {
    if (this.flushing || this.buffer.isEmpty()) return

    this.flushing = true

    try {
      const batchSize = this.config.batchSize
      const events = this.buffer.drain(batchSize)

      if (events.length === 0) return

      // 应用 beforeSend 钩子
      let eventsToSend = events
      if (this.config.beforeSend) {
        const result = this.config.beforeSend(eventsToSend)
        if (result === false) {
          if (this.config.debug) {
            console.debug('[Tracker] beforeSend 返回 false，丢弃事件')
          }
          return
        }
        eventsToSend = result
      }

      if (this.config.debug) {
        console.debug(`[Tracker] 刷新队列: ${eventsToSend.length} 个事件`)
      }

      const success = await this.transport.sendWithRetry(eventsToSend)

      if (!success) {
        // 失败的事件放回队列
        this.buffer.requeue(eventsToSend)
        if (this.config.debug) {
          console.warn(`[Tracker] ${eventsToSend.length} 个事件发送失败，已放回队列`)
        }
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('[Tracker] 刷新队列异常:', error)
      }
    } finally {
      this.flushing = false

      // 如果缓冲区还有事件，继续发送
      if (!this.buffer.isEmpty()) {
        this.scheduleNextFlush()
      }
    }
  }

  /** 退出追踪 */
  optOut(): void {
    this.config.optOut = true
    this.buffer.clear()
    if (this.config.debug) {
      console.debug('[Tracker] 已退出追踪')
    }
  }

  /** 恢复追踪 */
  optIn(): void {
    this.config.optOut = false
    if (this.config.debug) {
      console.debug('[Tracker] 已恢复追踪')
    }
  }

  /** 销毁追踪器 */
  destroy(): void {
    this.destroyed = true

    if (this.flushTimer) {
      clearTimeout(this.flushTimer)
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
      document.removeEventListener('visibilitychange', this.handleVisibilityChange)
      document.removeEventListener('freeze', this.handlePageFreeze)
      document.removeEventListener('resume', this.handlePageResume)
    }

    // 卸载所有插件
    for (const [name, plugin] of this.plugins) {
      try {
        plugin.uninstall?.()
        if (this.config.debug) {
          console.debug(`[Tracker] 卸载插件: ${name}`)
        }
      } catch (error) {
        console.error(`[Tracker] 卸载插件 ${name} 失败:`, error)
      }
    }
    this.plugins.clear()

    this.session.destroy()

    // 最后刷新一次
    this.flush()
  }

  // ==================== 内部方法 ====================

  /** 追踪页面浏览 */
  trackPageView(): void {
    this.track('page_view', {}, 'pageview')
  }

  /** 创建事件对象 */
  private createEvent(
    eventName: string,
    rawProperties?: Record<string, unknown>,
    type: EventType = 'custom'
  ): TrackEvent {
    const pageInfo = getPageInfo()
    const deviceContext = getDeviceContext()

    // 合并公共属性
    let properties = {
      ...this.commonProperties,
      ...rawProperties,
    }

    // 敏感数据脱敏
    if (this.config.sensitiveFields && this.config.sensitiveFields.length > 0) {
      properties = sanitizeData(properties, this.config.sensitiveFields)
    }

    return {
      eventId: generateUUID(),
      eventName,
      eventType: type,
      timestamp: Date.now(),
      sessionId: this.session.getSessionId(),
      pageUrl: pageInfo.pageUrl,
      pageTitle: pageInfo.pageTitle,
      referrer: pageInfo.referrer,
      userId: this.session.getUserId() || undefined,
      anonymousId: this.session.getAnonymousId(),
      properties,
      context: deviceContext,
    }
  }

  /** 启动定时刷新 */
  private startFlushTimer(): void {
    const interval = this.config.batchInterval
    this.flushTimer = setInterval(() => {
      this.checkFlush()
    }, interval)
  }

  /** 检查是否需要刷新 */
  private checkFlush(): void {
    if (this.buffer.size() >= this.config.batchSize) {
      this.flush()
    }
  }

  /** 安排下一次刷新（利用空闲时间） */
  private scheduleNextFlush(): void {
    requestIdleCallbackPolyfill(() => {
      this.flush()
    })
  }

  /** 页面关闭前处理 */
  private handleBeforeUnload = (): void => {
    // 页面关闭时，立即发送所有未发送事件
    const events = this.buffer.drain(this.buffer.size())
    if (events.length > 0) {
      // 使用 sendBeacon 确保发送
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        this.transport.send(events)
      }
    }
  }

  /** 页面可见性变化处理 */
  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      // 页面隐藏时刷新队列
      this.flush()
    }
  }

  /** 页面冻结处理（移动端） */
  private handlePageFreeze = (): void => {
    this.flush()
  }

  /** 页面恢复处理（移动端） */
  private handlePageResume = (): void => {
    // 网络恢复后检查是否需要发送
    this.checkFlush()
  }
}
