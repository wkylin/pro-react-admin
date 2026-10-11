# 可观测性

## Sentry

app/bootstrap/renderApp.tsx 仅在生产、配置 SENTRY_DSN、非 localhost 且未设置 localStorage SENTRY_DISABLE=1 时动态导入并初始化 Sentry，未启用时不加载该异步模块。SENTRY_TRACES_SAMPLE_RATE 限制 0..1，默认 0.1；Replay 仅在 SENTRY_ENABLE_REPLAY=true 开启，SENTRY_SEND_DEFAULT_PII=true 才开启默认 PII。

未开启默认 PII 时配置关闭 userInfo、cookies、请求头、请求体等默认采集项。业务主动写入错误/日志的内容仍需自行控制。Sentry sourcemap 上传由构建插件与服务端 token 配置负责；build:stats 明确关闭 sourcemap 上传。

## 本地日志与埋点

platform/telemetry/logger 为环境感知日志入口。不要记录 Authorization 或原始 token。请求层现已移除 token 输出，API 管理 token 只存在服务端与开发代理。

Tracking 是业务事件采集，Sentry 是运行时错误与性能；它们配置与生命周期独立。默认生产入口不自动启动 Tracking SDK。详情见[Tracking](TRACKING_SDK_ARCHITECTURE.md)。

## Vercel 与 PWA

renderApp 在生产探测 /_vercel/insights/script.js 是否为 JavaScript 后才加载 Analytics/SpeedInsights，静态服务器返回 HTML fallback 不会被视作支持。PWA 更新由 platform/pwa 管理，问题排查应结合网络缓存、SW scope 与发布资源顺序。

现有 scanner 脚本可运行 Sonar 扫描，需独立服务及凭据；它不替代[本地与 CI 门禁](QUALITY.md)，也不表示仓库已完成线上扫描。
