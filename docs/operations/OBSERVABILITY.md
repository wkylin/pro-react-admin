# 可观测性

## Sentry

`app/bootstrap/renderApp.tsx` 仅在生产、配置 `SENTRY_DSN`、非 localhost 且未设置 localStorage `SENTRY_DISABLE=1` 时动态导入并初始化 Sentry，然后渲染应用；未启用时不加载该异步模块。React 19 根错误回调使用 `reactErrorHandler()`。`SENTRY_TRACES_SAMPLE_RATE` 限制 0..1，默认 0.1；Replay 仅在 `SENTRY_ENABLE_REPLAY=true` 开启，`SENTRY_SEND_DEFAULT_PII=true` 才开启默认 PII。同源请求使用 SDK 默认的 trace 传播目标。

未开启默认 PII 时配置关闭 userInfo、cookies、请求头、请求体等默认采集项。业务主动写入错误/日志的内容仍需自行控制。Webpack/Vite 使用各自的 Sentry 构建插件注入 Debug ID 和上传 source map；需要 `SENTRY_SOURCE_MAP=map`、`SENTRY_AUTH_TOKEN`、生产组织与项目配置。上传成功后删除产物中的 `.map`；`build:stats` 明确关闭上传。步骤见[构建与统计](../development/BUILD.md#sentry-发布)。Sentry 后台登录不会自动授予本地构建插件权限。

## 本地日志与埋点

platform/telemetry/logger 为环境感知日志入口。不要记录 Authorization、原始 token 或密码。企业登录请求隐藏 payload，取消重复请求只记录 method/URL，默认 headers 更新不输出值；会话注销失败只输出 message。API 管理 token 只存在服务端与开发代理。

Tracking 是业务事件采集，Sentry 是运行时错误与性能；它们配置与生命周期独立。默认生产入口不自动启动 Tracking SDK。详情见[Tracking](../architecture/TRACKING_SDK_ARCHITECTURE.md)。

## Vercel 与 PWA

renderApp 在生产探测 /_vercel/insights/script.js 是否为 JavaScript 后才加载 Analytics/SpeedInsights，静态服务器返回 HTML fallback 不会被视作支持。PWA 更新由 platform/pwa 管理，问题排查应结合网络缓存、SW scope 与发布资源顺序。

现有 scanner 脚本可运行 Sonar 扫描，需独立服务及凭据；它不替代[本地与 CI 门禁](../development/QUALITY.md)，也不表示仓库已完成线上扫描。

## 当前信号与盲区

| 链路         | 已有信号                                                                                     | 尚未实现或确认                                                                              |
| ------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 浏览器运行时 | 按配置启用的 Sentry 错误/性能、Vercel Insights、Tracking 业务事件                            | 默认生产入口不启动 Tracking；不能假定每次会话都有埋点                                       |
| 页面性能     | `web-vitals` 采集 TTFB、FCP、LCP、INP、CLS，Tracking stats 汇总最近 24 小时的 p75 和评级数量 | 真实设备样本、分项目/版本基线、发布阈值尚未建立；MongoDB 不支持 `$percentile` 时 p75 会缺席 |
| 企业 HTTP/WS | API 错误输出及 WS 协议状态；401/403、4401、`reset` 的行为已有契约                            | 没有跨浏览器、网关、API 的统一 request/trace ID，也没有结构化的 WS 重连、回放丢失指标       |
| SQLite 恢复  | `api:db` 的 status、校验、备份和单卷 `drill` 输出                                            | 生产备份年龄、异地副本、系统级 RPO/RTO 与演练记录需部署方提供                               |

Web Vitals 的字段与统计边界见[API](./API.md#web-vitals-字段)；业务写入和资源失效的故障路径见[运行时链路](../architecture/ARCHITECTURE_RUNTIME.md#写入与资源失效)。本表是能力盘点，不代表下列待实施指标已经在生产采集。

## 待实施的关联与指标契约

Axios 适配器已支持把调用方传入的 `requestId` 放进 `X-Request-ID`；当前没有自动生成、API 回传与日志关联的闭环。为下一阶段的端到端排障，建议由入口网关/API 生成或规范化 `requestId`，在响应头和服务端结构化日志中回传；浏览器错误报告只记录该 ID、项目/版本和脱敏的操作名。若接入分布式追踪，再按标准 `traceparent` 贯通浏览器请求、网关和 API。不得在日志、追踪属性或 WS 消息中写入 bearer、一次性票据、密码、完整请求体或原始租户资料。

| 待定义 SLI | 统计口径                                                         | 需要关联的排障入口                                                     |
| ---------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 登录可用性 | 区分有效请求的 5xx/超时、无效凭据 401 和限速 429；按部署版本观察 | 网关/API 错误与数据库状态                                              |
| 管理读写   | `/api/admin/*` 的 5xx 比例与延迟分位数，区分权限拒绝和事务失败   | requestId、服务层错误、SQLite 磁盘/锁状态                              |
| 资源事件   | 票据失败、WS 非正常关闭、重连和 `reset` 次数，区分 4401 会话撤销 | API 实例、事件日志 epoch、浏览器版本                                   |
| 恢复能力   | 最近可验证备份年龄、异地副本状态、真实事故路径恢复耗时           | [恢复 runbook](../runbooks/ENTERPRISE_RECOVERY.md) 的 owner 和演练记录 |
| 页面体验   | 真实设备 LCP/INP/CLS p75，按页面与发布版本分组并注明样本数       | Tracking stats 与部署版本                                              |

SLO 数值、采样比例、告警阈值和负责人必须由实际部署流量及业务容忍度确定。发布前至少把上述口径写入监控看板和响应手册，并记录一次真实部署环境的告警到处置演练；本地构建、fixture 或单卷 `drill` 不构成这项验收。

## 排查入口

1. 登录或管理接口异常：先区分 401/403、429 和 5xx，再检查当前身份、活动组织、API 实例与 SQLite schema/卷状态；不要把权限拒绝计入服务故障。
2. 列表数据未更新：核对 WS 是否已认证、是否出现 `reset`/4401、页面是否仍在旧会话；断线期间已渲染页面不会因缓存 TTL 自动刷新。
3. Remote 不可用：检查 manifest、协议和共享依赖，再检查 entry/chunk 缓存与部署顺序；操作路径见[微前端部署](../deployment/MFE_DEPLOYMENT.md#协议与失败处理)。
4. 恢复超时或备份校验失败：停止写入，按[恢复 runbook](../runbooks/ENTERPRISE_RECOVERY.md)检查备份 manifest、目标卷和已批准的 RPO/RTO；不得用未验证快照覆盖生产库。
