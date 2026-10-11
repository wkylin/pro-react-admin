// ============================================================
// 埋点 SDK - 统一导出入口
// ============================================================

// 核心
export { TrackerCore } from './core'

// React 集成
export { TrackerProvider, TrackClick, TrackView, useTracker, useTrack, usePageView, useExposureTrack } from './react'

// 内置插件
export { PageViewPlugin, ClickPlugin, ExposurePlugin, PerformancePlugin, ErrorPlugin } from './plugins'

// 类型
export type {
  TrackEvent,
  EventType,
  TransportPriority,
  DeviceContext,
  TrackerConfig,
  TrackerPlugin,
  ITrackerCore,
  UploadPayload,
} from './types'

// 工具（高级用法）
export { generateUUID, getDeviceContext, getPageInfo, sanitizeData, exponentialBackoff } from './utils'
