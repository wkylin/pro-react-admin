# Sentry 配置

本分支的浏览器 SDK 配置位于应用代码，构建 source map 上传由 @sentry/vite-plugin 完成。

## 环境变量

- SENTRY_DSN：浏览器 SDK 的 DSN，可公开。
- SENTRY_AUTH_TOKEN：上传 source map 和创建 release 的 CI secret。
- SENTRY_ORG、SENTRY_PROJECT：可选的组织和项目覆盖值。

不要把 SENTRY_AUTH_TOKEN 放进 VITE_* 变量、前端白名单或提交的 .env 文件。

## 构建 source maps

普通部署构建不上传 source maps。设置 CI secret 后可执行：

    pnpm run build:sentry

该命令在 Vite production build 中生成 hidden source maps，并通过 Sentry Vite 插件上传。主构建配置位于 vite.config.ts。

CI 配置示意：

    - name: Build with Sentry source maps
      run: pnpm run build:sentry
      env:
        SENTRY_AUTH_TOKEN: secrets.SENTRY_AUTH_TOKEN
        SENTRY_ORG: wkylin
        SENTRY_PROJECT: pro-react-admin

## 无 token 情况

没有 SENTRY_AUTH_TOKEN 时，使用 pnpm run build:production。该构建继续生成 Vite 产物，不尝试上传 source maps。
