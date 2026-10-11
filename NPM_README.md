# `@w.ui/wui-react`

基于 React 19 和 Ant Design 6 的 React 组件库，使用 Webpack 5 构建，提供 ESM、UMD/CJS、子路径入口和 TypeScript 类型。

## 安装

```bash
pnpm add @w.ui/wui-react react react-dom antd react-router-dom framer-motion
```

React、React DOM、Ant Design、React Router 和 Framer Motion 是 peer dependencies，由消费项目提供。

## 使用

```tsx
import { ColorfulText } from '@w.ui/wui-react'
import OneTimePasscode from '@w.ui/wui-react/one-time-passcode'
import AnimatedIcon from '@w.ui/wui-react/animated-icon'
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'

export function Example() {
  return (
    <>
      <OneTimePasscode variant="compact" />
      <ColorfulText text="Hello, colorful world!" />
      <AnimatedIcon variant="pulse">
        <span aria-hidden="true">★</span>
      </AnimatedIcon>
      <ResponsiveTable
        rowKey="key"
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        dataSource={[{ key: 'ada', name: 'Ada Lovelace' }]}
      />
    </>
  )
}
```

## 子路径导入

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { SmartVideoPlayer } from '@w.ui/wui-react/stateless'
import { TrackerProvider } from '@w.ui/wui-react/tracking'
import AnimatedIcon from '@w.ui/wui-react/animated-icon'
import '@w.ui/wui-react/style.css'
```

`AnimatedIcon`、`OneTimePasscode`、`WatermarkProvider` 和 `ResponsiveTable` 已迁入独立 package source，可使用子路径导入。

## 组件分类

- `core`：错误边界、KeepAlive、全局搜索等应用基础组件
- `stateful`：树列表、标签组和其他带状态组件
- `stateless`：动画、展示、输入、媒体和可视化组件
- `tracking`：埋点核心、React Provider、插件和类型
- 独立子路径：`animated-icon`、`one-time-passcode`、`watermark-provider`、`responsive-table`

TypeScript 类型随包提供。若消费项目没有 React 类型，请安装 `@types/react` 和 `@types/react-dom`。

更多组件示例见[Storybook](https://wkylin.github.io/pro-react-admin/storybook/)，源码和公开 API 见[GitHub 仓库](https://github.com/wkylin/pro-react-admin)。
