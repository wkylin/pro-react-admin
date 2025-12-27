**Sentry CI / Build Integration**

这是仓库中针对 Sentry 在 CI 和生产构建中如何配置的说明（用于 `sentry-webpack-plugin` 和运行时代码）。

- 目的：让构建在需要时上传 release / source maps 到 Sentry；在本地或未配置 token 时跳过上传以避免警告。
- 关键环境变量：
  - `SENTRY_AUTH_TOKEN` — Sentry API token，用于 `sentry-webpack-plugin` 上传 source maps / 创建 release（敏感，存为 CI secret）。
  - `SENTRY_ORG` — Sentry 组织 slug（用于插件配置）。
  - `SENTRY_PROJECT` — Sentry 项目 slug（用于插件配置）。
  - `SENTRY_DSN` — 前端运行时使用的 DSN（可通过环境注入到运行时构建或在部署处注入）。
  - `SENTRY_TRACES_SAMPLE_RATE` — 可选，采样率（例如 `0.2`）。

为什么会出现警告
- `sentry-webpack-plugin` 在没有 `authToken` 时会打印警告并不上传 source maps（这是正常的保护行为）。我们的 `webpack/webpack.prod.js` 已修改为：仅当 `SENTRY_AUTH_TOKEN` 存在时才注册该插件；否则构建继续并输出简短提示。

示例：GitHub Actions
```
name: Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install
        run: npm ci
      - name: Build (production)
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
          SENTRY_TRACES_SAMPLE_RATE: 0.2
        run: npm run build:production
```

示例：Vercel / Netlify
- 在项目的 Environment Variables / Build settings 中添加 `SENTRY_AUTH_TOKEN`、`SENTRY_ORG`、`SENTRY_PROJECT` 和 `SENTRY_DSN`。部署构建时这些变量会注入到构建环境。

本地开发
- 不要在本地把 token 写入源码。可在本地 `.env` 文件中临时添加 `SENTRY_DSN`（用于运行时代码），但不要添加 `SENTRY_AUTH_TOKEN`，这样本地构建将跳过上传。

如何创建 `SENTRY_AUTH_TOKEN`
- 前往 https://sentry.io/settings/<ORG>/api/，创建一个具有 `project:releases` 和 `org:read` 权限的 token。将该 token 存入 CI 的 secrets。

注意
- `SENTRY_DSN` 是前端运行时用来发送事件的 DSN；`SENTRY_AUTH_TOKEN` 是 CI 用来上传 artifacts（source maps / releases）的私密 token，两者用途不同，不要混淆。
- 我们的 `src/utils/sentry/index.js` 会优先使用 `process.env.SENTRY_DSN`，并允许在运行时代码中通过环境变量或构建时间注入替换。

如需我：
- 可以把这段内容合并到 `README.md` 的“部署”或“CI”节；或创建更详细的 `docs/` 页面并添加示例 workflow（我可以代为修改）。
