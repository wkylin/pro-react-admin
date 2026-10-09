# Sentry 配置

运行时监控由 `@sentry/react` 初始化，Webpack 生产构建使用 `@sentry/webpack-plugin` 上传 release 和 source maps。

## 运行时 DSN

src/bootstrap/renderApp.tsx 只在生产环境、非 localhost 且提供 DSN 时初始化 Sentry。SENTRY_DSN 被显式加入 webpack/client-env.js，它是浏览器端的项目标识，不是上传凭据。

默认不发送默认 PII，不启用 Session Replay，性能采样率为 0.1。确有产品和隐私审批需要时，才能在构建环境设置 SENTRY_SEND_DEFAULT_PII=true 或 SENTRY_ENABLE_REPLAY=true；SENTRY_TRACES_SAMPLE_RATE 可设置 0 到 1 之间的采样率。浏览器 localStorage 中的 SENTRY_DISABLE=1 仍可关闭 Sentry。

## Release 和 source map 上传

`webpack/webpack.prod.js` 只在 `SENTRY_SOURCE_MAP=map` 且存在 `SENTRY_AUTH_TOKEN` 时注册插件。组织、项目和 token 只供 Node 构建过程使用：

```text
SENTRY_AUTH_TOKEN  # CI secret
SENTRY_ORG         # CI/build environment
SENTRY_PROJECT     # CI/build environment
SENTRY_DSN         # browser runtime DSN
```

生产构建命令已设置 `SENTRY_SOURCE_MAP=map`：

```bash
pnpm run build:production
```

若未设置 token，构建会继续，但跳过 Sentry 上传。不要把 SENTRY_AUTH_TOKEN 加入 webpack/client-env.js，也不要提交 token 到仓库。仓库旧 Git 历史可能保留曾经提交的 token，应轮换该凭据。

## CI 配置

在 GitHub Actions 或 Vercel 的构建环境中设置 `SENTRY_AUTH_TOKEN`、`SENTRY_ORG` 和 `SENTRY_PROJECT`；需要生产运行时上报时，再设置 `SENTRY_DSN`。所有上传凭据应通过 CI Secret 或部署平台的环境变量提供。

相关实现：

- [`webpack/webpack.prod.js`](../webpack/webpack.prod.js)
- [`webpack/webpack.common.js`](../webpack/webpack.common.js)
- [`src/bootstrap/renderApp.tsx`](../src/bootstrap/renderApp.tsx)
