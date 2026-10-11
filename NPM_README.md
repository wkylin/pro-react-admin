# `@w.ui/wui-react`

面向 React 19 和 Ant Design 6 的通用组件库。v5 的运行时代码全部位于 `packages/wui-react/src`，提供 ESM、CJS、TypeScript 类型、统一样式入口和按组件导入能力。

## 安装

```bash
pnpm add @w.ui/wui-react react react-dom antd framer-motion
```

React、React DOM、Ant Design 和 Framer Motion 是 peer dependencies，由消费项目提供。图标、HTML 清理和 class 工具由本包管理，不需要逐个安装。

## 版本矩阵

| 组件库版本 | React      | React DOM  | Ant Design | Framer Motion | Node.js      |
| ---------- | ---------- | ---------- | ---------- | ------------- | ------------ |
| v5.x       | `>=19 <20` | `>=19 <20` | `>=6 <7`   | `>=12 <15`    | 见 `engines` |

TypeScript 声明随包发布。消费端和 SSR 支持 `^22.22.2 || ^24.15.0 || >=26.0.0`，该范围来自 `package.json#engines.node` 和运行时依赖要求。仓库贡献者使用 Node.js 24.15.0 或更高的 24.x 与 pnpm 11.5.2，并应使用能够解析 package conditional exports 的现代构建工具。

## 使用

从主入口导入组件，并在应用入口只引入一次样式：

```tsx
import { AnimatedIcon, OneTimePasscode, OverflowText, SafeHtml } from '@w.ui/wui-react'
import '@w.ui/wui-react/style.css'

export function Example() {
  return (
    <section>
      <AnimatedIcon variant="pulse">
        <span aria-hidden="true">★</span>
      </AnimatedIcon>
      <OneTimePasscode variant="compact" />
      <OverflowText text="A very long piece of content" maxWidth={180} />
      <SafeHtml html="<strong>Sanitized HTML</strong>" />
    </section>
  )
}
```

也可以使用独立子路径缩小解析范围：

```tsx
import AnimatedIcon from '@w.ui/wui-react/animated-icon'
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'
```

## 公共组件

| 组件                 | 子路径                                | 用途                       |
| -------------------- | ------------------------------------- | -------------------------- |
| `AnimatedIcon`       | `@w.ui/wui-react/animated-icon`       | 图标动效                   |
| `IconFrame`          | `@w.ui/wui-react/icon-frame`          | 统一图标尺寸与对齐         |
| `MoveChecker`        | `@w.ui/wui-react/move-checker`        | 拖动确认交互               |
| `OneTimePasscode`    | `@w.ui/wui-react/one-time-passcode`   | 一次性验证码输入           |
| `OverflowText`       | `@w.ui/wui-react/overflow-text`       | 溢出检测与提示             |
| `PortalTooltip`      | `@w.ui/wui-react/portal-tooltip`      | Portal 浮层提示            |
| `ResponsiveTable`    | `@w.ui/wui-react/responsive-table`    | 可注入请求客户端的数据表格 |
| `SafeHtml`           | `@w.ui/wui-react/safe-html`           | HTML 清理与安全渲染        |
| `ScrollLayout`       | `@w.ui/wui-react/scroll-layout`       | 固定头尾的滚动布局         |
| `ScrollableSections` | `@w.ui/wui-react/scrollable-sections` | 分区滚动与导航             |
| `SliderCaptcha`      | `@w.ui/wui-react/slider-captcha`      | 滑块验证                   |
| `WatermarkProvider`  | `@w.ui/wui-react/watermark-provider`  | 内容水印                   |

v5 不再提供 `/core`、`/stateful`、`/stateless` 和 `/tracking` 入口。应用布局、路由、状态、埋点业务和演示组件属于 Pro React Admin 应用，不属于公共组件包。

## 样式与主题

- 在应用入口引入一次 `@w.ui/wui-react/style.css`。
- Ant Design 组件读取其语义 token，可跟随消费项目的 `ConfigProvider` 亮色、暗色和品牌主题。
- 自有样式使用 CSS Modules 或公开 CSS 变量，消费项目不应依赖组件内部类名和 DOM 层级。
- 若使用服务端渲染，请让服务端和客户端加载相同的样式文件。

## SSR 与浏览器能力

包可以在服务端被导入。依赖 DOM、Portal、尺寸测量或动画的行为会在客户端挂载后启用；使用 Next.js App Router 等 React Server Components 环境时，请在调用交互组件的文件中声明 `'use client'`。

`PortalTooltip`、`OverflowText`、`MoveChecker`、`ScrollableSections` 和 `SliderCaptcha` 需要浏览器环境才能获得完整交互。SSR 输出不应依赖客户端测量结果。

## 模块格式

- `import` 条件加载 ESM。
- `require` 条件加载 CJS。
- `exports` 只开放主入口、12 个组件子路径、`style.css` 和只读的 `package.json` 元数据。
- TypeScript 会通过相同的 export map 解析声明文件。

更多示例见 [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)，源码和发布指南见 [GitHub 仓库](https://github.com/wkylin/pro-react-admin)。
