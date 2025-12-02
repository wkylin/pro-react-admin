# 组件库打包与发布指南

本文档详细说明了 `@w.ui/wui-react` 组件库的打包配置、开发规范及发布流程。

## 1. 项目配置

### 1.1 构建配置 (`vite.config.lib.ts`)

项目使用 Vite 的库模式 (Library Mode) 进行打包。核心配置如下：

- **入口文件**: `src/components/index.ts`
- **输出目录**: `dist-lib`
- **格式**: 生成 `es` (ESM) 和 `umd` 格式
- **外部依赖**: `react`, `react-dom`, `antd`, `react-router-dom` 等被配置为 `external`，不会打包进库文件中，而是作为 `peerDependencies`。
- **类型定义**: 使用 `vite-plugin-dts` 自动生成 TypeScript 类型定义文件 (`.d.ts`)。
- **路径别名**: 配置了 `@stateless`, `@hooks`, `@utils`, `@assets` 等别名，确保构建时能正确解析。

### 1.2 Package.json 配置

关键字段说明：

```json
{
  "name": "@w.ui/wui-react",
  "version": "2.0.0",
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
    "./style.css": "./dist-lib/style.css"
  },
  "peerDependencies": {
    "antd": ">=6.0.0",
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  },
  "scripts": {
    "build:lib": "vite build -c vite.config.lib.ts",
    "prepublishOnly": "npm run build:lib",
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

### 2.2 导出组件
所有需要发布的组件必须在 `src/components/index.ts` 中导出：

```typescript
export { default as MyComponent } from './stateless/MyComponent';
// 或者命名导出
export { MyComponent } from './stateless/MyComponent';
```

## 3. 构建流程

在发布之前，必须先进行构建以生成 `dist-lib` 目录。

```bash
# 执行构建
npm run build:lib
```

构建产物包括：
- `pro-react-components.es.js`: ESM 格式（用于现代构建工具）
- `pro-react-components.umd.js`: UMD 格式（用于浏览器直接引入）
- `style.css`: 所有组件的样式汇总
- `index.d.ts`: 类型定义文件

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

