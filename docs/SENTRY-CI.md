# Sentry CI 构建配置

应用构建使用 Vite 和 @sentry/vite-plugin。普通生产构建通过 SENTRY_SOURCE_MAP=no 禁用 source map 上传；需要上传时运行：

    SENTRY_AUTH_TOKEN=... pnpm run build:sentry

CI 中将 SENTRY_AUTH_TOKEN 保存为加密 secret，不要写入代码或提交到环境文件。没有 token 时不要开启 source map 上传。

Vite 配置位于 vite.config.ts。只有 production mode 且 SENTRY_SOURCE_MAP=map 时才会注册 Sentry 插件。source map 使用 hidden 模式，并匹配当前输出目录中的 assets。
