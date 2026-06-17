// ============================================================
// 埋点 SDK - 类型定义
// ============================================================

/** 事件类型 */
export type EventType =
  | 'pageview'
  | 'click'
  | 'exposure'
  | 'scroll'
  | 'custom'
  | 'performance'
  | 'error'
  | 'input'
  | 'share'
  | 'video'

/** 传输优先级 */
export type TransportPriority = 'high' | 'normal' | 'low'

/** 设备上下文 */
export interface DeviceContext {
  screenWidth: number
  screenHeight: number
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio: number
  language: string
  timezone: string
  userAgent: string
  platform: string
  connectionType?: string
}

/** 追踪事件 */
export interface TrackEvent {
  /** 唯一事件 ID (UUID v4) */
  eventId: string
  /** 事件名称 */
  eventName: string
  /** 事件类型 */
  eventType: EventType
  /** 事件发生时间戳 (ms) */
  timestamp: number
  /** 会话 ID */
  sessionId: string
  /** 当前页面 URL */
  pageUrl: string
  /** 页面标题 */
  pageTitle: string
  /** 来源页面 */
  referrer: string
  /** 用户 ID (登录后) */
  userId?: string
  /** 匿名设备 ID */
  anonymousId: string
  /** 自定义属性 */
  properties: Record<string, unknown>
  /** 设备上下文 */
  context: DeviceContext
  /** 传输优先级 */
  priority?: TransportPriority
}

/** SDK 配置 */
export interface TrackerConfig {
  /** 应用 ID */
  appId: string
  /** 应用版本 */
  appVersion?: string
  /** 数据上报地址 */
  endpoint: string
  /**
   * 批量发送的最大事件数量
   * @default 10
   */
  batchSize?: number
  /**
   * 批量发送间隔 (ms)
   * @default 5000
   */
  batchInterval?: number
  /**
   * 使用 sendBeacon 的最小事件优先级
   * @default 'high'
   */
  beaconMinPriority?: TransportPriority
  /**
   * 最大重试次数
   * @default 3
   */
  maxRetries?: number
  /**
   * 重试基础延迟 (ms)
   * @default 1000
   */
  retryBaseDelay?: number
  /**
   * 是否启用调试日志
   * @default false
   */
  debug?: boolean
  /**
   * 采样率 (0-1)
   * @default 1
   */
  sampleRate?: number
  /**
   * 用户是否选择退出追踪
   * @default false
   */
  optOut?: boolean
  /**
   * 自定义请求头
   */
  headers?: Record<string, string>
  /**
   * 在发送前对数据进行处理
   */
  beforeSend?: (events: TrackEvent[]) => TrackEvent[] | false
  /**
   * 敏感字段过滤规则 (正则)
   */
  sensitiveFields?: RegExp[]
}

/** 追踪器插件接口 */
export interface TrackerPlugin {
  /** 插件名称 */
  name: string
  /** 插件版本 */
  version: string
  /** 安装插件 */
  install: (tracker: ITrackerCore) => void | (() => void)
  /** 卸载插件 */
  uninstall?: () => void
}

/** 追踪器核心接口 */
export interface ITrackerCore {
  /** 追踪事件 */
  track: (eventName: string, properties?: Record<string, unknown>, type?: EventType) => void
  /** 设置用户 ID */
  setUserId: (userId: string) => void
  /** 清除用户 ID */
  clearUserId: () => void
  /** 设置公共属性 */
  setCommonProperties: (properties: Record<string, unknown>) => void
  /** 获取配置 */
  getConfig: () => TrackerConfig
  /** 注册插件 */
  use: (plugin: TrackerPlugin) => void
  /** 立即刷新队列 */
  flush: () => Promise<void>
  /** 退出追踪 */
  optOut: () => void
  /** 恢复追踪 */
  optIn: () => void
}

/** 上传请求体 */
export interface UploadPayload {
  appId: string
  appVersion: string
  sdkVersion: string
  events: TrackEvent[]
  sentAt: string
}
