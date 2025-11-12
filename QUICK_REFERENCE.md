# 快速优化参考指南

> 为开发者提供的快速参考，基于项目分析提炼的关键要点

---

## 🚨 紧急问题速查

### 1. 无法安装依赖？
**错误**: `npm error engine Unsupported engine`

**原因**: `react-input-pin-code@2.0.1` 要求 Node >= 22，但项目配置 >= 20.12.1

**快速解决**:
```bash
# 方案 1: 升级 Node 版本
nvm install 22
nvm use 22

# 方案 2: 替换依赖包
npm uninstall react-input-pin-code
npm install react-pin-input  # 或其他替代方案
```

---

### 2. TypeScript 类型错误太多？
**原因**: tsconfig.json 配置过时

**快速修复**:
```json
// tsconfig.json - 最小改动
{
  "compilerOptions": {
    "jsx": "react-jsx",    // 改这个
    "rootDir": "./src",    // 改这个
    "allowJs": false       // 改这个
  }
  // 删除 rules 块 (115-124 行)
}
```

---

### 3. 内存泄漏在哪？
**高危文件列表**:
```
src/pages/chatgpt/index.jsx           - EventSource 未清理
src/components/stateless/IconCloud/   - requestAnimationFrame 未清理
src/pages/layout/fullscreen/          - screenfull 事件未清理
src/utils/aidFn.js                    - addEventListener 未清理
```

**修复模板**:
```typescript
useEffect(() => {
  const source = new EventSource(url)
  
  // 你的逻辑...
  
  return () => {
    source.close()  // 关键！
  }
}, [url])
```

---

## 🎯 代码规范速查

### TypeScript 类型定义

❌ **错误示例**:
```typescript
const response = await api.get('/users') as any
const user = JSON.parse(userData as any)
```

✅ **正确示例**:
```typescript
interface User {
  id: string
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

const response = await api.get<ApiResponse<User[]>>('/users')
const user: User = JSON.parse(userData)
```

---

### 日志记录

❌ **错误示例**:
```typescript
console.log('用户数据:', user)  // 生产环境也会输出
console.log('API 响应:', response)
```

✅ **正确示例**:
```typescript
import { logger } from '@utils/logger'

logger.log('用户数据:', user)  // 开发环境输出，生产环境静默
logger.error('API 错误:', error)  // 所有环境输出
```

---

### React Hooks 依赖

❌ **错误示例**:
```typescript
useEffect(() => {
  fetchData(userId)
}, [])  // ⚠️ 缺少 userId 依赖
```

✅ **正确示例**:
```typescript
useEffect(() => {
  fetchData(userId)
}, [userId])  // ✅ 包含所有依赖

// 或者使用 useCallback
const fetchData = useCallback(async () => {
  const data = await api.get(`/users/${userId}`)
}, [userId])

useEffect(() => {
  fetchData()
}, [fetchData])
```

---

### 错误处理

❌ **错误示例**:
```typescript
try {
  const data = await fetchData()
} catch (error) {
  console.log(error)  // 仅记录，不处理
}
```

✅ **正确示例**:
```typescript
try {
  const data = await fetchData()
  return data
} catch (error) {
  logger.error('获取数据失败:', error)
  
  // 用户友好的错误提示
  message.error('加载失败，请稍后重试')
  
  // 可选：上报到 Sentry
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error)
  }
  
  throw error  // 或返回默认值
}
```

---

## 📦 依赖管理

### 重复依赖清理对照表

| 保留 | 移除 | 原因 |
|------|------|------|
| `js-md5` | `blueimp-md5` | 更新，更轻量 |
| `qs` | `query-string` | 更广泛使用 |
| `react-canvas-confetti` | `canvas-confetti` | React 封装版 |
| `axios` | `cross-fetch`, `fetch-intercept` | 统一 HTTP 客户端 |

### 依赖分类检查

```json
{
  "dependencies": {
    // ✅ 运行时需要的包
    "react": "^19.2.0",
    "antd": "^5.27.6"
  },
  "devDependencies": {
    // ✅ 仅构建时需要
    "webpack": "^5.102.1",
    "typescript": "^5.9.3",
    
    // ⚠️ 这些应该在 devDependencies
    // "esbuild": "^0.25.11",
    // "helmet": "^8.1.0",
    // "postcss-less": "^6.0.0"
  }
}
```

---

## 🏗️ 目录结构规范

### 当前 → 目标

```
❌ 当前混乱结构:
src/
├── components/
│   ├── hooks/          (hooks 不属于 components)
│   ├── stateless/      (命名不清晰)
│   ├── stateful/       (命名不清晰)
│   └── container/      (概念重复)

✅ 推荐清晰结构:
src/
├── components/
│   ├── ui/            (纯 UI 组件，如 Button, Modal)
│   ├── business/      (业务组件，如 UserCard, OrderList)
│   └── layout/        (布局组件，如 Header, Sidebar)
├── hooks/             (所有自定义 hooks)
├── pages/             (页面组件)
├── services/          (API 服务层)
├── utils/             (工具函数)
├── types/             (TypeScript 类型定义)
└── constants/         (常量配置)
```

---

## 🎨 样式方案选择

### 当前问题: 4 种样式方案并存
1. Ant Design (CSS-in-JS)
2. Less
3. Tailwind CSS
4. Styled Components

### 推荐方案

**方案 A - 保守稳健** (推荐):
```
保留: Ant Design + Less
移除: Tailwind CSS + Styled Components

优点:
✅ 改动最小
✅ Ant Design 深度集成
✅ Less 变量系统成熟

适合: 现有项目，快速优化
```

**方案 B - 现代高效**:
```
保留: Ant Design + Tailwind CSS 4
移除: Less + Styled Components

优点:
✅ 开发效率高
✅ 原子化 CSS
✅ 更小的 bundle

适合: 愿意投入迁移成本的团队
```

---

## ⚡ 性能优化速查

### Webpack 分包策略

```javascript
// webpack.prod.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // React 全家桶单独打包
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        name: 'react',
        priority: 20
      },
      // Ant Design 单独打包
      antd: {
        test: /[\\/]node_modules[\\/]antd[\\/]/,
        name: 'antd',
        priority: 20
      },
      // 其他第三方库
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10
      }
    }
  }
}
```

### 懒加载路由

```typescript
// ❌ 同步导入 - 全部打入 bundle
import Dashboard from '@pages/dashboard'
import Settings from '@pages/settings'

// ✅ 异步导入 - 按需加载
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@pages/dashboard'))
const Settings = lazy(() => import('@pages/settings'))

// 使用时包裹 Suspense
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Tree-shaking 配置

```json
// package.json
{
  "sideEffects": [
    "*.css",
    "*.less",
    "*.scss"
  ]  // 从 true 改为数组
}
```

---

## 🧪 测试配置速查

### 最小 Jest 配置

```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|png|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  }
}
```

---

## 🔍 常用命令

### 代码质量检查
```bash
# ESLint 检查
npm run eslint

# TypeScript 类型检查
npx tsc --noEmit

# 运行测试
npm test

# 测试覆盖率
npm run test:coverage
```

### 构建分析
```bash
# 分析 bundle
npm run analyze:build

# 开发环境
npm run dev

# 生产构建
npm run build:production
```

### 依赖管理
```bash
# 检查过期依赖
npm outdated

# 更新依赖
npm run update:npm

# 安全审计
npm audit
npm audit fix
```

---

## 📊 优化目标 KPI

### Phase 1 完成标准
- ✅ 项目可正常安装 (`npm install` 成功)
- ✅ TypeScript 严格模式无错误
- ✅ 生产环境无 console 输出
- ✅ 无内存泄漏警告

### Phase 2 完成标准
- ✅ JS/JSX 文件少于 50 个
- ✅ 'as any' 使用少于 3 处
- ✅ ESLint 无错误和警告
- ✅ 重复依赖已清理

### Phase 3 完成标准
- ✅ 仅使用 2 种样式方案
- ✅ 测试覆盖率 > 50%
- ✅ Bundle 大小减少 > 10%
- ✅ 构建时间减少 > 20%

---

## 🔗 相关文档

- 详细分析: `CODE_QUALITY_ANALYSIS.md`
- 优化方案: `OPTIMIZATION_RECOMMENDATIONS.md`
- 实施清单: `IMPLEMENTATION_CHECKLIST.md`

---

## ❓ 常见问题

**Q: 优化会影响现有功能吗？**  
A: Phase 1 的改动都是非破坏性的，主要是配置优化和代码清理。Phase 2 和 3 建议分批进行，每次改动后充分测试。

**Q: 需要多长时间完成？**  
A: Phase 1 约 2-3 天，Phase 2 约 1-2 周，Phase 3 约 2-4 周。建议优先完成 Phase 1。

**Q: 可以只做部分优化吗？**  
A: 可以。Phase 1 是必须的（解决阻塞问题），Phase 2 和 3 可以根据团队情况选择性实施。

**Q: 如何验证优化效果？**  
A: 运行 `npm run analyze:build` 比较 bundle 大小，使用 Lighthouse 测试页面性能，记录构建时间和测试覆盖率。

---

**快速开始**: 
1. 阅读 `IMPLEMENTATION_CHECKLIST.md`
2. 从 Phase 1 第一项开始
3. 每完成一项就提交代码
4. 遇到问题查看本文档

**最后更新**: 2025-11-12
