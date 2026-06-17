// ============================================================
// 埋点 SDK - 事件缓冲 & 持久化备份
// ============================================================

import type { TrackEvent } from './types'

const STORAGE_KEY = '__tkr_buffer__'

/**
 * 事件缓冲区
 * 提供：
 * - 内存队列（快速存取）
 * - localStorage 持久化备份（页面崩溃不丢数据）
 * - 重放恢复（页面重载后恢复未发送的事件）
 */
export class EventBuffer {
  private queue: TrackEvent[] = []
  private maxSize: number

  constructor(maxSize = 100) {
    this.maxSize = maxSize
    // 恢复上次未发送的事件
    this.restoreFromStorage()
  }

  /** 恢复持久化的事件 */
  private restoreFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const events = JSON.parse(stored) as TrackEvent[]
        if (Array.isArray(events) && events.length > 0) {
          this.queue.push(...events)
          console.debug(`[Tracker] 恢复了 ${events.length} 个未发送的事件`)
        }
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  /** 持久化到 localStorage */
  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue))
    } catch {
      // localStorage 满了或不可用
      console.warn('[Tracker] 无法持久化事件缓冲区')
    }
  }

  /** 添加事件 */
  push(event: TrackEvent): void {
    if (this.queue.length >= this.maxSize) {
      // 丢弃最旧的事件
      this.queue.shift()
      console.debug('[Tracker] 事件缓冲区已满，丢弃最旧事件')
    }
    this.queue.push(event)
    // 实时持久化
    this.persist()
  }

  /** 批量取出事件 */
  drain(batchSize: number): TrackEvent[] {
    const batch = this.queue.splice(0, batchSize)
    // 更新持久化
    this.persist()
    return batch
  }

  /** 查看前 N 个事件（不移除） */
  peek(count: number): TrackEvent[] {
    return this.queue.slice(0, count)
  }

  /** 获取当前队列长度 */
  size(): number {
    return this.queue.length
  }

  /** 是否为空 */
  isEmpty(): boolean {
    return this.queue.length === 0
  }

  /** 清空缓冲区 */
  clear(): void {
    this.queue = []
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  /** 将失败的事件重新放回队列头部 */
  requeue(events: TrackEvent[]): void {
    this.queue.unshift(...events)
    this.persist()
  }
}
