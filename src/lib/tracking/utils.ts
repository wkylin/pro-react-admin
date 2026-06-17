// ============================================================
// 埋点 SDK - 工具函数
// ============================================================

import type { DeviceContext } from './types'

const SDK_VERSION = '1.0.0'

/** 生成 UUID v4 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** 获取当前页面信息 */
export function getPageInfo(): { pageUrl: string; pageTitle: string; referrer: string } {
  return {
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    pageTitle: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  }
}

/** 获取设备上下文 */
export function getDeviceContext(): DeviceContext {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      screenWidth: 0,
      screenHeight: 0,
      viewportWidth: 0,
      viewportHeight: 0,
      devicePixelRatio: 1,
      language: 'unknown',
      timezone: 'unknown',
      userAgent: 'unknown',
      platform: 'unknown',
    }
  }

  const nav = navigator as Navigator & { connection?: { effectiveType?: string } }

  return {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    language: navigator.language || 'unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
    userAgent: navigator.userAgent,
    platform: navigator.platform || 'unknown',
    connectionType: nav.connection?.effectiveType,
  }
}

/** 安全地序列化 JSON */
export function safeStringify(obj: unknown, maxLength = 10240): string {
  try {
    const seen = new WeakSet()
    const json = JSON.stringify(obj, (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular]'
        seen.add(value)
      }
      if (value instanceof Error) {
        return { name: value.name, message: value.message, stack: value.stack }
      }
      if (typeof value === 'function') return '[Function]'
      if (typeof value === 'symbol') return value.toString()
      return value
    })
    return json.length > maxLength ? json.slice(0, maxLength) + '...' : json
  } catch {
    return '[Serialization Error]'
  }
}

/** 从 localStorage 获取或生成值 */
export function getOrCreatePersistedValue(key: string, generator: () => string): string {
  try {
    const stored = localStorage.getItem(key)
    if (stored) return stored
    const value = generator()
    localStorage.setItem(key, value)
    return value
  } catch {
    return generator()
  }
}

/** 敏感数据脱敏 */
export function sanitizeData(data: Record<string, unknown>, sensitiveFields: RegExp[]): Record<string, unknown> {
  if (!sensitiveFields || sensitiveFields.length === 0) return data

  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    const isSensitive = sensitiveFields.some((pattern) => pattern.test(key))
    if (isSensitive) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeData(value as Record<string, unknown>, sensitiveFields)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

/** 指数退避延迟计算 */
export function exponentialBackoff(attempt: number, baseDelay: number): number {
  const delay = baseDelay * Math.pow(2, attempt)
  const jitter = Math.random() * 1000
  return Math.min(delay + jitter, 60000)
}

/** 延时 Promise */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 节流函数 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      lastTime = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(
        () => {
          lastTime = Date.now()
          timer = null
          fn(...args)
        },
        wait - (now - lastTime)
      )
    }
  }
}

/** 获取 SDK 版本 */
export function getSDKVersion(): string {
  return SDK_VERSION
}

/** 安全的 idle callback 包装 */
export function requestIdleCallbackPolyfill(callback: () => void, timeout?: number): number {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return (window as Window & typeof globalThis).requestIdleCallback(callback, { timeout }) as unknown as number
  }
  return globalThis.setTimeout(callback, timeout || 1) as unknown as number
}
