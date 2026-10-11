// ============================================================
// 埋点 SDK - 会话管理
// ============================================================

import { generateUUID, getOrCreatePersistedValue } from './utils'

const DEVICE_ID_KEY = '__tkr_did__'
const SESSION_ID_KEY = '__tkr_sid__'
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 分钟
const ACTIVITY_EVENTS = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove']

/**
 * 会话管理器
 * 负责：
 * - 生成和维护匿名设备 ID (持久化到 localStorage)
 * - 生成和维护会话 ID (sessionStorage，超时自动刷新)
 * - 提供 userId 绑定能力
 */
export class SessionManager {
  private anonymousId: string
  private sessionId: string
  private userId: string | null = null
  private lastActivityTime: number
  private activityHandler: () => void

  constructor() {
    // 从 localStorage 获取或生成设备 ID
    this.anonymousId = getOrCreatePersistedValue(DEVICE_ID_KEY, () => generateUUID())

    // 从 sessionStorage 获取或生成会话 ID
    this.sessionId = this.restoreOrCreateSession()
    this.lastActivityTime = Date.now()

    // 监听用户活动以延长会话
    this.activityHandler = () => {
      this.lastActivityTime = Date.now()
    }
    if (typeof window !== 'undefined') {
      ACTIVITY_EVENTS.forEach((event) => {
        window.addEventListener(event, this.activityHandler, { passive: true, capture: true })
      })
    }
  }

  /** 恢复或创建会话 */
  private restoreOrCreateSession(): string {
    try {
      const stored = sessionStorage.getItem(SESSION_ID_KEY)
      const storedTime = sessionStorage.getItem(`${SESSION_ID_KEY}_time`)

      if (stored && storedTime) {
        const elapsed = Date.now() - Number.parseInt(storedTime, 10)
        if (elapsed < SESSION_TIMEOUT) {
          return stored
        }
        // 会话过期，刷新时间
        const newSessionId = generateUUID()
        sessionStorage.setItem(SESSION_ID_KEY, newSessionId)
        sessionStorage.setItem(`${SESSION_ID_KEY}_time`, String(Date.now()))
        return newSessionId
      }
    } catch {
      // sessionStorage 不可用
    }

    return this.createNewSession()
  }

  /** 创建新会话 */
  private createNewSession(): string {
    const newSessionId = generateUUID()
    try {
      sessionStorage.setItem(SESSION_ID_KEY, newSessionId)
      sessionStorage.setItem(`${SESSION_ID_KEY}_time`, String(Date.now()))
    } catch {
      // sessionStorage 不可用
    }
    return newSessionId
  }

  /** 检查并刷新会话 */
  checkAndRefreshSession(): void {
    const now = Date.now()
    if (now - this.lastActivityTime > SESSION_TIMEOUT) {
      // 检查实际的 sessionStorage 时间戳
      try {
        const storedTime = sessionStorage.getItem(`${SESSION_ID_KEY}_time`)
        if (storedTime && now - Number.parseInt(storedTime, 10) < SESSION_TIMEOUT) {
          // sessionStorage 和内存不一致，以 sessionStorage 为准
          const stored = sessionStorage.getItem(SESSION_ID_KEY)
          if (stored) {
            this.sessionId = stored
            this.lastActivityTime = Number.parseInt(storedTime, 10)
            return
          }
        }
      } catch {
        // 忽略
      }
      // 真的过期了
      this.sessionId = this.createNewSession()
    }
    this.lastActivityTime = now
  }

  /** 获取匿名 ID */
  getAnonymousId(): string {
    return this.anonymousId
  }

  /** 获取会话 ID */
  getSessionId(): string {
    this.checkAndRefreshSession()
    return this.sessionId
  }

  /** 获取用户 ID */
  getUserId(): string | null {
    return this.userId
  }

  /** 设置用户 ID */
  setUserId(userId: string): void {
    this.userId = userId
  }

  /** 清除用户 ID */
  clearUserId(): void {
    this.userId = null
  }

  /** 销毁 */
  destroy(): void {
    if (typeof window !== 'undefined') {
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, this.activityHandler, { capture: true })
      })
    }
  }
}
