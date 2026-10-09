# Sentry 配置

浏览器端 Sentry SDK 在 `src/bootstrap/renderApp.tsx` 初始化。Vite 插件只在显式开启 source map 上传的生产构建中使用。

## 环境变量

- `SENTRY_DSN`：浏览器 SDK 使用的 DSN。
- `SENTRY_AUTH_TOKEN`：CI 中上传 source map 所需的秘密 Token。
- `SENTRY_ORG`、`SENTRY_PROJECT`：组织和项目配置。

`SENTRY_AUTH_TOKEN` 只应保存在 CI secret 中，不要使用 `VITE_*` 前缀或提交到仓库。

## 构建

普通生产构建：

```bash
pnpm run build:production
```

需要上传 source map 时，在 CI secret 配置完成后运行：

```bash
pnpm run build:sentry
```

Source map 上传由 `@sentry/vite-plugin` 处理，Vite 配置位于根目录 `vite.config.ts`。没有上传 Token 时使用普通生产构建。

