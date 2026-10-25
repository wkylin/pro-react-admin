# Tracking SDK

SDK 已从 src/lib/tracking 迁到 src/platform/tracking，应用从 `@platform/tracking` 导入。该 SDK 不在 @w.ui/wui-react 的公开包内。

## 模块

| 模块                  | 责任                                                     |
| --------------------- | -------------------------------------------------------- |
| core.ts               | TrackerCore、配置、事件组装与插件生命周期                |
| buffer.ts             | 队列与批量 flush                                         |
| session.ts / utils.ts | 会话、设备与辅助函数                                     |
| transport.ts          | Beacon / Fetch / Image transport、重试与离线缓存         |
| plugins.ts            | PageView、Click、Exposure、Performance、Error            |
| react.tsx             | TrackerProvider、useTrack、usePageView、useExposureTrack |
| types.ts / index.ts   | 契约与公开入口                                           |

```ts
import { TrackerCore, PageViewPlugin } from '@platform/tracking'

const tracker = new TrackerCore({
  appId: 'my-app',
  endpoint: '/api/tracking/collect',
  batchInterval: 1000,
})
tracker.use(PageViewPlugin)
// 业务事件
tracker.track('order_opened', { orderId: 'example' })
// 结束集成时清理
tracker.destroy()
```

默认应用入口只在 development 自动安装 PageViewPlugin，生产不会自动建立该实例。features/tracking 是采集数据展示功能，与底层 SDK 分开；pnpm start 提供本地 collector。

## 集成边界

Transport 优先尝试 sendBeacon，再用 fetch POST；sendBeacon 返回成功仅说明浏览器接受排队，不等于服务端落库确认。Image 兜底使用带 data 的 GET，本地 collector 只支持 POST，该路径目前不具备完整端到端兼容。

TrackerProvider 当前在 render 期创建 TrackerCore、异步安装插件，再由 effect 清理。StrictMode、弃置渲染和动态插件完成后的实例有效性仍需专项验证；对需要确定生命周期的应用，使用显式实例集成并做好创建、销毁控制。

管理查询必须由服务端鉴权。SDK 的 endpoint 与管理 token 是两个概念，不将管理凭据放入采集配置。业务应限制 properties 字段、避免采集凭据或完整敏感内容；采集层不会替业务自动识别这些字段。

API 与存储约束见[API](../operations/API.md)，运行时监控见[可观测性](../operations/OBSERVABILITY.md)。
