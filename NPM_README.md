# @w.ui/wui-react

面向 React 19 与 Ant Design 6 项目的共享组件库，包含通用 UI、状态组件和埋点 SDK。样式通过独立 CSS 入口导入。

## 安装

确保项目已安装 React、React DOM、Ant Design 和 React Router，再安装组件库：

```bash
pnpm add react react-dom antd react-router-dom @w.ui/wui-react
```

也可以使用 npm 或 yarn 安装。

## 使用

从根入口导入组件：

```tsx
import { OneTimePasscode, ColorfulText } from '@w.ui/wui-react'
import '@w.ui/wui-react/style.css'

export function Example() {
  return (
    <>
      <OneTimePasscode variant="compact" />
      <ColorfulText text="Hello" />
    </>
  )
}
```

## 导入路径

| 导入路径 | 内容 |
| --- | --- |
| `@w.ui/wui-react` | 聚合组件入口 |
| `@w.ui/wui-react/core` | 核心组件 |
| `@w.ui/wui-react/stateful` | 有状态组件 |
| `@w.ui/wui-react/stateless` | 展示与交互组件 |
| `@w.ui/wui-react/tracking` | 埋点 SDK |
| `@w.ui/wui-react/style.css` | 组件样式 |

按类别导入示例：

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { TrackerCore } from '@w.ui/wui-react/tracking'
import '@w.ui/wui-react/style.css'
```

## 依赖要求

库构建会将以下运行时依赖留给消费项目提供：

- React 与 React DOM 19 或兼容版本
- Ant Design 6
- React Router DOM 7

## 组件和类型

TypeScript 类型随包提供。完整公开导出以各入口为准：根入口见 `src/lib/index.ts`，分类入口见 `src/lib/core.ts`、`src/lib/stateful.ts`、`src/lib/stateless.ts` 和 `src/lib/tracking/index.ts`。

本仓库的构建和发布流程见[组件库指南](https://github.com/wkylin/pro-react-admin/blob/vite/docs/build/COMPONENT_LIBRARY.md)。
