# Sentry 配置指南

## 概述

本文档详细介绍 pro-react-admin 项目中 Sentry 的配置和使用方法。Sentry 是一个开源的错误跟踪和性能监控平台，帮助开发者实时监控和修复生产环境中的问题。

## 安装依赖

项目中已安装以下 Sentry 相关依赖：

```json
{
  "@sentry/react": "^10.29.0",
  "@sentry/webpack-plugin": "^4.6.1",
  "@sentry/vite-plugin": "^4.6.1"
}
```

- `@sentry/react`: React 应用的 Sentry SDK
- `@sentry/webpack-plugin`: 用于在 Webpack 构建时上传 source maps
- `@sentry/vite-plugin`: 用于在 Vite 构建时上传 source maps

## 环境变量配置

在 `.env.production` 文件中配置 Sentry 相关环境变量：

```dotenv
# Sentry Configuration
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=wkylin
SENTRY_PROJECT=pro-react-admin
SENTRY_DSN=https://3d8db323c44ddb1f24ba4ba3f60e01c6@o64827.ingest.us.sentry.io/4510499314860032
```

### 环境变量说明：

- `SENTRY_AUTH_TOKEN`: Sentry 认证令牌（从 Sentry 项目设置中获取）
- `SENTRY_ORG`: Sentry 组织名称
- `SENTRY_PROJECT`: Sentry 项目名称
- `SENTRY_DSN`: Sentry 项目 DSN

### Webpack 环境变量加载

**重要说明**：对于 Webpack 构建，需要在 `webpack.prod.js` 文件顶部显式加载环境变量：

```javascript
// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.production') })
```

如果不添加此配置，webpack 构建时会显示 "No auth token provided" 警告，即使环境变量文件存在。

## 应用配置

### 1. Sentry 初始化配置

在 `src/index.tsx` 中进行 Sentry 初始化：

```typescript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://3d8db323c44ddb1f24ba4ba3f60e01c6@o64827.ingest.us.sentry.io/4510499314860032',
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/wkylin\.sentry\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
})
```

## Webpack 构建配置

在 `webpack/webpack.prod.js` 中配置 Sentry Webpack 插件：

```javascript
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

if (process.env.SENTRY_SOURCE_MAP === 'map') {
  prodWebpackConfig.plugins.push(
    sentryWebpackPlugin({
      release: packageJson.version,
      include: path.join(__dirname, '../dist/static/js'),
      urlPrefix: '~/static/js',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      telemetry: false,
    })
  )
}
```

## Vite 构建配置

在 `vite.config.ts` 中添加 Sentry 插件：

```typescript
import { sentryVitePlugin } from '@sentry/vite-plugin'
import packageJson from './package.json'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'
  const useSentry = env.SENTRY_SOURCE_MAP === 'map' && isProd

  return {
    plugins: [
      // ... 其他插件
      ...(useSentry
        ? [
            sentryVitePlugin({
              org: env.SENTRY_ORG || 'wkylin',
              project: env.SENTRY_PROJECT || 'pro-react-admin',
              authToken: env.SENTRY_AUTH_TOKEN,
              release: {
                name: packageJson.version,
              },
              sourcemaps: {
                assets: './dist-vite/assets/**',
              },
              bundleSizeOptimizations: {
                excludeDebugStatements: true,
                excludeTracing: false,
                excludeReplayIframe: true,
                excludeReplayShadowDom: true,
                excludeReplayWorker: true,
              },
            }),
          ]
        : []),
    ],
    build: {
      sourcemap: useSentry ? 'hidden' : false,
    },
  }
})
```

## 构建脚本

### Webpack 构建

```json
{
  "scripts": {
    "build:production": "cross-env SENTRY_SOURCE_MAP=map BUILD_GOAL=production NODE_ENV=production webpack --config ./webpack/webpack.prod.js --stats-error-details"
  }
}
```

### Vite 构建

```json
{
  "scripts": {
    "build:vite": "vite build --config vite.config.ts",
    "build:vite:sentry": "cross-env SENTRY_DISABLE_TELEMETRY=1 SENTRY_SOURCE_MAP=map vite build --config vite.config.ts"
  }
}
```

## 遥测设置

Sentry 插件默认会发送遥测数据。要禁用遥测：

### Webpack

```javascript
sentryWebpackPlugin({
  // ... 其他配置
  telemetry: false,
})
```

### Vite

```bash
# 使用环境变量
cross-env SENTRY_DISABLE_TELEMETRY=1 vite build --config vite.config.ts
```

## 使用方法

### 手动发送事件

```typescript
import * as Sentry from '@sentry/react'

// 发送消息
Sentry.captureMessage('Something went wrong!')

// 发送异常
Sentry.captureException(new Error('Something broke!'))

// 发送自定义事件
Sentry.captureEvent({
  message: 'Custom event',
  level: 'info',
  tags: {
    custom_tag: 'value',
  },
})
```

### 错误边界

项目使用自定义的 ErrorBoundary 组件：

```tsx
import ErrorBoundary from '@/components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <YourAppComponents />
    </ErrorBoundary>
  )
}
```

## 常见问题

### 1. 看不到统计消息

**原因：**

- 应用在开发环境中运行
- 没有触发错误或事件
- DSN 配置错误

**解决方案：**

1. 确保在生产环境中运行
2. 手动触发测试事件
3. 检查 DSN 配置

### 2. Source Map 上传失败

**原因：**

- Auth Token 无效
- 网络连接问题

**解决方案：**

1. 检查 Auth Token 是否正确
2. 验证网络连接

### 3. 构建时出现敏感信息警告

**原因：**

- Token 直接写在代码中

**解决方案：**

1. 使用环境变量存储敏感信息
2. 不要将包含敏感信息的文件提交到版本控制

## 安全注意事项

1. **永远不要将敏感信息提交到版本控制**
2. **使用环境变量存储 Auth Token 和 DSN**
3. **定期轮换 Auth Token**
4. **限制 Auth Token 的权限范围**

## 更新日志

- 2025-12-09: 重新配置 Sentry，使用环境变量存储敏感信息
- 2025-12-09: 支持 Webpack 和 Vite 构建的 Sentry 配置
