// ============================================================
// 埋点 SDK - 传输层
// ============================================================

import type { TrackEvent, UploadPayload, TrackerConfig } from './types'
import { getSDKVersion, delay, exponentialBackoff } from './utils'

/**
 * 传输层
 * 提供三级降级策略：
 * 1. sendBeacon - 最可靠 (页面关闭也能发送，适合高优先级事件)
 * 2. fetch keepalive - 次选 (支持大体积数据，适合批量)
 * 3. Image Beacon - 终极降级 (兼容性最好，但只能 GET)
 */
export class Transport {
  private config: TrackerConfig

  constructor(config: TrackerConfig) {
    this.config = config
  }

  /** 更新配置 */
  updateConfig(config: Partial<TrackerConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * 发送事件
   * 根据事件优先级自动选择传输方式
   */
  async send(events: TrackEvent[]): Promise<boolean> {
    if (events.length === 0) return true

    const payload = this.buildPayload(events)
    const body = JSON.stringify(payload)

    // 判断是否应该使用 sendBeacon
    const hasHighPriority = events.some((e) => (e.priority ?? 'normal') === 'high')
    const beaconMinPriority = this.config.beaconMinPriority ?? 'high'

    if (hasHighPriority || beaconMinPriority === 'normal') {
      return this.sendViaBeacon(body)
    }

    return this.sendViaFetch(body)
  }

  /**
   * 带重试的发送
   */
  async sendWithRetry(events: TrackEvent[]): Promise<boolean> {
    const maxRetries = this.config.maxRetries ?? 3
    const baseDelay = this.config.retryBaseDelay ?? 1000

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const success = await this.send(events)
      if (success) return true

      if (attempt < maxRetries) {
        const waitTime = exponentialBackoff(attempt, baseDelay)
        if (this.config.debug) {
          console.debug(`[Tracker] 发送失败，${waitTime}ms 后重试 (${attempt + 1}/${maxRetries})`)
        }
        await delay(waitTime)
      }
    }

    if (this.config.debug) {
      console.error('[Tracker] 发送失败，已达到最大重试次数')
    }

    return false
  }

  /** 方式 1: sendBeacon (最高优先级) */
  private sendViaBeacon(body: string): boolean {
    if (typeof navigator === 'undefined' || !navigator.sendBeacon) {
      // 降级到 fetch
      return false
    }

    try {
      const blob = new Blob([body], { type: 'application/json' })
      const sent = navigator.sendBeacon(this.config.endpoint, blob)

      if (this.config.debug) {
        console.debug(`[Tracker] sendBeacon 发送${sent ? '成功' : '失败'}`)
      }

      return sent
    } catch (error) {
      if (this.config.debug) {
        console.error('[Tracker] sendBeacon 异常:', error)
      }
      return false
    }
  }

  /** 方式 2: fetch keepalive (支持大体积) */
  private async sendViaFetch(body: string): Promise<boolean> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
        },
        body,
        keepalive: true,
      })

      const success = response.ok

      if (this.config.debug) {
        console.debug(`[Tracker] fetch 发送${success ? '成功' : '失败'} (${response.status})`)
      }

      return success
    } catch (error) {
      // fetch 失败，尝试 Image Beacon 降级
      if (this.config.debug) {
        console.warn('[Tracker] fetch 发送失败，降级到 Image Beacon:', error)
      }
      return this.sendViaImage(body)
    }
  }

  /** 方式 3: Image Beacon (终极降级) */
  private sendViaImage(body: string): boolean {
    try {
      // Image Beacon 只支持 GET，将数据编码到 URL（适合小体积）
      const encoded = encodeURIComponent(body)
      const url = `${this.config.endpoint}?data=${encoded}`

      // 使用 sendBeacon 发送（如果能用的话就是方式1了，这里是极端情况）
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        return navigator.sendBeacon(url)
      }

      // 纯粹 Image 降级
      const img = new Image()
      img.src = url

      if (this.config.debug) {
        console.debug('[Tracker] Image Beacon 发送')
      }

      return true
    } catch (error) {
      if (this.config.debug) {
        console.error('[Tracker] 所有传输方式均失败:', error)
      }
      return false
    }
  }

  /** 构建上报数据体 */
  private buildPayload(events: TrackEvent[]): UploadPayload {
    return {
      appId: this.config.appId,
      appVersion: this.config.appVersion || '0.0.0',
      sdkVersion: getSDKVersion(),
      events,
      sentAt: new Date().toISOString(),
    }
  }
}
