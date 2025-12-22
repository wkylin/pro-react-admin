# 组件库打包与发布指南

本文档详细说明了 `@w.ui/wui-react` 组件库的打包配置、开发规范及发布流程。

## 0. 先说结论：两套构建、两种使用方式

当前组件库对外发布有 **两套构建配置 / 两套入口形态**：

1) **主包（单入口）**：适合“向后兼容 + 传统 `import { X } from '@w.ui/wui-react'`”。
- 配置文件：`vite.config.lib.ts`
- 构建命令：`npm run build:lib`
- 入口文件：`src/lib/index.ts`
- 产物：`dist-lib/pro-react-components.es.js` + `dist-lib/pro-react-components.umd.js` + `dist-lib/index.d.ts` + `dist-lib/style.css`

2) **子路径（多入口）**：适合“更工程化的按需导入/更细粒度 tree-shaking”。
- 配置文件：`vite.config.lib.entries.ts`
- 构建命令：`npm run build:lib:entries`
- 入口文件：`src/lib/core.ts` / `src/lib/stateful.ts` / `src/lib/stateless.ts`
- 产物：`dist-lib/entries/*`（分别对应 `./core`、`./stateful`、`./stateless` 的 js + d.ts）

> 说明：`src/lib/index.ts` 会聚合导出上述三类入口（并使用 `.js` 扩展名的 re-export 以兼容 TS 的 bundler 解析）。

## 1. 项目配置

### 1.1 构建配置 A：主包单入口 (`vite.config.lib.ts`)

项目使用 Vite 的库模式 (Library Mode) 进行打包。核心配置如下：

- **入口文件**: `src/lib/index.ts`
- **输出目录**: `dist-lib`
- **格式**: 生成 `es` (ESM) 和 `umd` 格式
- **外部依赖**: `react`, `react-dom`, `antd`, `react-router-dom` 等被配置为 `external`，不会打包进库文件中，而是作为 `peerDependencies`。
- **类型定义**: 使用 `vite-plugin-dts` 自动生成 TypeScript 类型定义文件 (`.d.ts`)。
- **路径别名**: 配置了 `@stateless`, `@hooks`, `@utils`, `@assets` 等别名，确保构建时能正确解析。

### 1.2 构建配置 B：子路径多入口 (`vite.config.lib.entries.ts`)

用于将对外 API 按“类别”拆分为多个入口，提升消费者侧 tree-shaking 的粒度。

- **入口文件**:
  - `src/lib/core.ts`
  - `src/lib/stateful.ts`
  - `src/lib/stateless.ts`
- **输出目录**: `dist-lib/entries`
- **格式**: 生成 `es` (ESM) 和 `cjs` 格式（供 `exports.require` 使用）
- **类型定义**: 仍使用 `vite-plugin-dts`，并将 `.d.ts` 输出到 `dist-lib/entries` 以匹配 `package.json#exports` 的子路径 types

> 重要约束：多入口只应导出“对外可用”的组件/类型。对于明确不希望进入 lib 的依赖（例如某些仅用于 demo 的组件），应保持不在 `src/lib/*` 入口导出。

### 1.3 Package.json 配置

关键字段说明：

```json
{
  "name": "@w.ui/wui-react",
  "version": "3.1.0",
  "files": ["dist-lib"],
  "main": "./dist-lib/pro-react-components.umd.js",
  "module": "./dist-lib/pro-react-components.es.js",
  "types": "./dist-lib/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist-lib/index.d.ts",
      "import": "./dist-lib/pro-react-components.es.js",
      "require": "./dist-lib/pro-react-components.umd.js"
    },
    "./core": {
      "types": "./dist-lib/entries/core.d.ts",
      "import": "./dist-lib/entries/core.es.js",
      "require": "./dist-lib/entries/core.cjs.js"
    },
    "./stateful": {
      "types": "./dist-lib/entries/stateful.d.ts",
      "import": "./dist-lib/entries/stateful.es.js",
      "require": "./dist-lib/entries/stateful.cjs.js"
    },
    "./stateless": {
      "types": "./dist-lib/entries/stateless.d.ts",
      "import": "./dist-lib/entries/stateless.es.js",
      "require": "./dist-lib/entries/stateless.cjs.js"
    },
    "./style.css": "./dist-lib/style.css"
  },
  "peerDependencies": {
    "antd": ">=6.0.0",
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  },
  "scripts": {
    "build:lib": "vite build -c vite.config.lib.ts",
    "build:lib:entries": "vite build -c vite.config.lib.entries.ts",
    "prepublishOnly": "npm run build:lib && npm run build:lib:entries",
    "pub": "npm publish --access public",
    "pub:beta": "npm publish --tag beta --access public"
  }
}
```

## 2. 开发规范

### 2.1 组件开发

- **目录结构**:
  - `src/components/stateless/`: 无状态组件（UI 组件）
  - `src/components/stateful/`: 有状态组件（业务组件）
  - `src/components/hooks/`: 自定义 Hooks
- **样式**: 使用 Less Modules (`.module.less`) 避免样式冲突。
- **资源引用**: 图片、视频等资源应放在 `src/assets` 下，并使用别名 `@assets` 引用。

### 2.2 导出组件（对外发布入口）

所有需要发布的组件必须在 `src/lib/*` 入口中导出：

- 默认情况：写在 `src/lib/index.ts`（主包单入口）
- 如果希望支持子路径按需导入：写在 `src/lib/core.ts` / `src/lib/stateful.ts` / `src/lib/stateless.ts` 之一

```typescript
export { default as MyComponent } from './stateless/MyComponent'
// 或者命名导出
export { MyComponent } from './stateless/MyComponent'
```

> 注意：`src/components/index.ts` 是“应用内部 barrel”，不等同于对外发布 API。

## 3. 构建流程

在发布之前，必须先进行构建以生成 `dist-lib` 目录。

```bash
# 主包单入口（向后兼容）
npm run build:lib

# 子路径多入口（按需导入/更细粒度 tree-shaking）
npm run build:lib:entries
```

构建产物包括：

- `pro-react-components.es.js`: ESM 格式（用于现代构建工具）
- `pro-react-components.umd.js`: UMD 格式（用于浏览器直接引入）
- `style.css`: 所有组件的样式汇总
- `index.d.ts`: 类型定义文件

以及（多入口）：

- `dist-lib/entries/core.es.js` / `core.cjs.js` / `core.d.ts`
- `dist-lib/entries/stateful.es.js` / `stateful.cjs.js` / `stateful.d.ts`
- `dist-lib/entries/stateless.es.js` / `stateless.cjs.js` / `stateless.d.ts`

## 3.1 使用方式（入口要写清楚）

### A) 传统用法（主包单入口）

适用于：
- 希望维持过去的导入方式不变
- 业务侧不关心更细粒度的拆分

```ts
import { AutoScrollSection } from '@w.ui/wui-react'
import '@w.ui/wui-react/style.css'
```

### B) 按需导入（子路径多入口）

适用于：
- 业务侧希望更细粒度 tree-shaking（按类别入口）
- 大型项目希望减少“全量入口”带来的聚合导出影响

```ts
import { AutoScrollSection } from '@w.ui/wui-react/stateless'
import { KeepAlive } from '@w.ui/wui-react/core'
import '@w.ui/wui-react/style.css'
```

## 4. 发布流程

### 4.1 准备工作

1. 确保代码已提交并推送到远程仓库。
2. 登录 NPM 账号：
   ```bash
   npm login
   ```

### 4.2 版本管理

使用 `standard-version` 自动更新版本号并生成 CHANGELOG：

```bash
# 发布标准版本 (自动判断版本升级类型)
npm run release

# 手动指定版本升级
npm run release:minor  # 1.0.0 -> 1.1.0
npm run release:patch  # 1.0.0 -> 1.0.1
npm run release:major  # 1.0.0 -> 2.0.0
```

### 4.3 发布到 NPM

```bash
# 发布正式版
npm run pub

# 发布 Beta 版
npm run pub:beta
```

> **注意**: 由于包名为 `@w.ui/wui-react` (Scoped Package)，发布时必须指定 `--access public`（脚本中已配置）。

### 4.4 目前“发布到 npm 官网”到底走哪套逻辑？

发布脚本本质上调用的是 `npm publish`，npm 会在发布前自动执行 `prepublishOnly`。

当前 `prepublishOnly` 配置为：

- 先跑 `npm run build:lib`（生成主包单入口产物）
- 再跑 `npm run build:lib:entries`（生成子路径多入口产物）

因此：**发布到 npm 时两套都会构建，并且都会一起被发布（因为 `files` 仅包含 `dist-lib`，而 `entries` 在其子目录下）**。

消费者具体用到哪套，取决于它的导入方式：

- `import ... from '@w.ui/wui-react'` → 使用主包单入口（`exports["."]`）
- `import ... from '@w.ui/wui-react/stateless'` → 使用多入口子路径（`exports["./stateless"]`）

## 5. 常见问题排查

1. **构建报错 "Cannot find module"**:
   - 检查 `vite.config.lib.ts` 中的 `alias` 配置是否包含该路径。
   - 检查 `tsconfig.json` 中的 `paths` 配置。
   - 确保文件扩展名正确（JSX 文件应为 `.jsx` 或 `.tsx`）。

2. **发布失败 "You do not have permission to publish"**:
   - 检查是否登录了正确的 NPM 账号。
   - 确认是否有 `@w.ui` 组织的发布权限。
   - 如果是个人项目，考虑更改包名为 `@your-username/wui-react`。

3. **样式丢失**:
   - 确保在使用库的项目中引入了样式文件：`import '@w.ui/wui-react/style.css';`
