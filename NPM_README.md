# @w.ui/wui-react

面向 React 19 与 Ant Design 6 项目的共享组件库，包含通用 UI、状态组件和埋点 SDK。样式通过独立 CSS 入口导入，TypeScript 声明随包提供。

## 安装

组件库将 React、React DOM、Ant Design 和 React Router 作为 peer dependencies。新项目可以一次安装这些依赖：

```bash
pnpm add react react-dom antd react-router-dom @w.ui/wui-react
```

已有 React 项目可先确认以下 peer dependency 版本兼容，再安装 `@w.ui/wui-react`：

| 依赖 | 版本范围 |
| --- | --- |
| `react`、`react-dom` | `^19.3.0` |
| `antd` | `^6.4.3` |
| `react-router-dom` | `^7.18.3` |

如果项目已安装这些依赖，只需执行 `pnpm add @w.ui/wui-react`。npm 和 yarn 项目也可以使用对应的安装命令。

## 使用

从根入口导入组件：

```tsx
import '@w.ui/wui-react/style.css'
import { OneTimePasscode, ColorfulText } from '@w.ui/wui-react'

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

按需选择一个入口即可；所有入口都提供 TypeScript 类型。使用需要路由、国际化或其他 React Context 的组件时，请在应用中提供相应的 Provider。

## 本地构建产物接入

在组件库仓库中运行 `pnpm run prepublishOnly`，生成并准备 `dist-lib/`。然后在消费项目中安装本地构建目录：

```bash
pnpm add /绝对路径/pro-react-admin/dist-lib
```

这适合发布前验证；日常接入应安装 npm registry 中发布的版本。

## 组件和类型

完整公开导出见下方导入路径表；库源码和各入口维护说明见[仓库组件导出文档](https://github.com/wkylin/pro-react-admin/blob/vite/docs/development/COMPONENT_EXPORTS.md)。

本仓库的 Storybook、构建、本地验证和发布流程见[组件库指南](https://github.com/wkylin/pro-react-admin/blob/vite/docs/build/COMPONENT_LIBRARY.md)。
