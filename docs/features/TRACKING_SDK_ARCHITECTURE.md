# 埋点 SDK 架构设计文档

## 一、整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    应用层 (App Layer)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  React Hooks │  │  指令式 API  │  │  声明式组件  │  │
│  │ useTrack()   │  │ tracker.track│  │ <TrackView>  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
├─────────┼─────────────────┼─────────────────┼───────────┤
│         ▼                 ▼                 ▼           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              核心引擎 (Core Engine)                │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │   │
│  │  │ Pipeline │ │  Session │ │  Plugin Manager  │  │   │
│  │  │ 事件管道  │ │  会话管理 │ │  插件管理器      │  │   │
│  │  └────┬─────┘ └────┬─────┘ └────────┬─────────┘  │   │
│  │       └─────────────┼───────────────┘             │   │
│  │                     ▼                             │   │
│  │  ┌──────────────────────────────────────────┐    │   │
│  │  │           事件队列 (Event Queue)          │    │   │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │    │   │
│  │  │  │Event1│ │Event2│ │Event3│ │ ...  │   │    │   │
│  │  │  └──────┘ └──────┘ └──────┘ └──────┘   │    │   │
│  │  └────────────────┬─────────────────────────┘    │   │
│  └───────────────────┼──────────────────────────────┘   │
├──────────────────────┼──────────────────────────────────┤
│                      ▼                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │            传输层 (Transport Layer)                │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │   │
│  │  │sendBeacon│ │  fetch   │ │  Image Beacon    │  │   │
│  │  │(优先级1) │ │(优先级2) │ │  (降级兜底)      │  │   │
│  │  └──────────┘ └──────────┘ └──────────────────┘  │   │
│  └──────────────────────┬───────────────────────────┘   │
├─────────────────────────┼───────────────────────────────┤
│                         ▼                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │             数据接收端 (Backend)                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 二、核心模块详解

### 2.1 事件模型 (Event Model)

```typescript
interface TrackEvent {
  // 事件标识
  eventId: string;          // 唯一事件 ID
  eventName: string;        // 事件名称
  eventType: EventType;     // 事件类型

  // 时间信息
  timestamp: number;        // 事件发生时间
  sessionId: string;        // 会话 ID

  // 页面信息
  pageUrl: string;          // 当前页面 URL
  pageTitle: string;        // 页面标题
  referrer: string;         // 来源页面

  // 用户信息
  userId?: string;          // 用户 ID
  anonymousId: string;      // 匿名 ID (设备级)

  // 自定义属性
  properties: Record<string, unknown>;

  // 设备/环境信息
  context: DeviceContext;
}
```

### 2.2 事件类型

| 类型 | 说明 | 触发方式 |
|------|------|----------|
| `pageview` | 页面浏览 | 自动 (路由变化) |
| `click` | 点击事件 | 自动 (DOM 代理) |
| `exposure` | 元素曝光 | 自动 (IntersectionObserver) |
| `scroll` | 滚动行为 | 自动 |
| `custom` | 自定义事件 | 手动调用 |
| `performance` | 性能数据 | 自动 |
| `error` | 错误追踪 | 自动 |

### 2.3 数据管道 (Pipeline)

```
  事件产生 → 过滤(filters) → 增强(enrichers) → 队列(buffer)
                                                    ↓
                                              批量发送(transport)
                                                    ↓
                                              失败重试(retry)
                                                    ↓
                                           持久化备份(storage)
```

关键设计：
- **Filter**: 过滤不需要上报的事件、敏感数据脱敏
- **Enricher**: 为事件添加公共属性（用户信息、设备信息等）
- **Buffer**: 内存队列 + localStorage 持久化，防止数据丢失
- **Batch**: 批量发送，减少网络请求
- **Retry**: 指数退避重试机制

### 2.4 传输策略 (Transport Strategy)

优先级降级链：
```
sendBeacon (最可靠，页面关闭也能发送)
    ↓ 降级
fetch keepalive (次选，支持大体积)
    ↓ 降级
Image Beacon (终极降级，兼容性最好)
```

### 2.5 插件系统 (Plugin System)

```typescript
interface TrackerPlugin {
  name: string;
  install(tracker: TrackerCore): void;
  uninstall?(): void;
}

// 内置插件
- PageViewPlugin       // 自动 PV 上报
- ClickPlugin          // 自动点击上报
- ExposurePlugin       // 曝光上报 (基于 IntersectionObserver)
- PerformancePlugin    // 性能监控
- ErrorPlugin          // 错误监控
```

### 2.6 会话管理 (Session Management)

- 使用 `sessionStorage` 存储 sessionId
- 30 分钟无活动视为会话过期
- 页面关闭/刷新重新生成 sessionId
- 跨 tab 共享 sessionId (通过 BroadcastChannel)

### 2.7 用户标识 (User Identity)

三层标识体系：
1. **Device ID** (`anonymousId`): 设备级别，localStorage 持久化
2. **Session ID** (`sessionId`): 会话级别，sessionStorage
3. **User ID** (`userId`): 登录后设置，跨设备关联

### 2.8 数据发送格式

```json
{
  "appId": "pro-react-admin",
  "appVersion": "3.6.2",
  "sdkVersion": "1.0.0",
  "events": [
    {
      "eventId": "evt_xxx",
      "eventName": "page_view",
      "timestamp": 1718640000000,
      "properties": { ... }
    }
  ],
  "sentAt": "2024-06-17T10:00:00Z"
}
```

### 2.9 性能优化

- **异步非阻塞**: 所有操作异步执行，不影响主业务
- **requestIdleCallback**: 非关键操作在空闲时执行
- **Web Worker**: 复杂数据处理放到 Worker 线程
- **Tree Shaking**: 插件化架构，按需引入
- **Bundle Size**: 核心 < 5KB (gzip)

### 2.10 隐私合规

- 默认不采集敏感信息（密码、身份证号等自动过滤）
- 支持 `data-track-ignore` 属性跳过特定元素
- 提供 `optOut()` / `optIn()` 方法
- 数据上报前可注册自定义脱敏规则

### 2.11 与现有基础设施集成

本项目已集成：
- **Sentry**: 错误追踪 → 与埋点 SDK 互补，错误事件可同时发送
- **Vercel Analytics**: Web Vitals → 埋点 SDK 可采集更细粒度的性能数据
- **自定义 HTTP Client**: 可复用其加密、拦截器能力