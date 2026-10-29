# @w.ui/wui-react

面向 React 19 的 UI 组件库：12 个可直接使用的基础组件，以及布局、表单、数据展示等 7 个按场景导入的组件组。提供 TypeScript 类型、ESM / CommonJS 入口和统一样式。

[在线预览与组件说明](https://wkylin.github.io/pro-react-admin/storybook/) · [完整组件目录](https://github.com/wkylin/pro-react-admin/blob/main/docs/components/COMPONENT_CATALOG.md) · [源码](https://github.com/wkylin/pro-react-admin) · [反馈问题](https://github.com/wkylin/pro-react-admin/issues)

## 快速开始

项目需要 React 19、Ant Design 6 和 Framer Motion 12～14。安装组件库及基础 peer 依赖：

```bash
pnpm add @w.ui/wui-react react@^19 react-dom@^19 antd@^6 framer-motion@^12
```

使用 npm 时，将 `pnpm add` 换成 `npm install`。

在应用入口引入一次样式：

```tsx
// main.tsx
import '@w.ui/wui-react/style.css'
```

然后在组件中使用：

```tsx
import { useState } from 'react'
import { OneTimePasscode } from '@w.ui/wui-react'

export function CodeInput() {
  const [code, setCode] = useState('')

  return <OneTimePasscode length={6} value={code} onChange={setCode} />
}
```

包支持的 Node.js 版本为 `^22.22.2 || ^24.15.0 || >=26.0.0`。组件库不包含后台应用、业务鉴权或请求客户端；涉及业务数据的组件由使用方接入自己的服务。

## 从哪里导入

| 需求                 | 导入方式             | 示例                                                              |
| -------------------- | -------------------- | ----------------------------------------------------------------- |
| 使用基础组件         | 从包根路径按名称导入 | `import { OneTimePasscode } from '@w.ui/wui-react'`               |
| 单独导入一个基础组件 | 从组件子路径默认导入 | `import OneTimePasscode from '@w.ui/wui-react/one-time-passcode'` |
| 使用扩展组件组       | 从组路径按名称导入   | `import { PageContainer } from '@w.ui/wui-react/layout'`          |

扩展组件组不从包根路径导出，也没有默认导出。组件 Props 类型从对应入口导入；`ResponsiveTable` 的 `useTable` 同时从包根路径和 `responsive-table` 子路径导出。

### 12 个基础组件

| 组件                 | 适合做什么                         | 单组件子路径          |
| -------------------- | ---------------------------------- | --------------------- |
| `AnimatedIcon`       | 给现有图标添加轻量动效             | `animated-icon`       |
| `IconFrame`          | 统一图标与文字并排时的对齐         | `icon-frame`          |
| `MoveChecker`        | 拖动滑块完成可见的确认步骤         | `move-checker`        |
| `OneTimePasscode`    | 输入一次性验证码或 PIN             | `one-time-passcode`   |
| `OverflowText`       | 截断溢出文字并按需显示完整内容     | `overflow-text`       |
| `PortalTooltip`      | 在可能裁剪内容的容器上显示提示层   | `portal-tooltip`      |
| `ResponsiveTable`    | 展示本地或远程数据，支持分页与选择 | `responsive-table`    |
| `SafeHtml`           | 清理 HTML 字符串后显示内容         | `safe-html`           |
| `ScrollLayout`       | 组合固定头部、滚动内容与底部       | `scroll-layout`       |
| `ScrollableSections` | 让区块导航与滚动位置同步           | `scrollable-sections` |
| `SliderCaptcha`      | 提供拼图滑块的前端验证交互         | `slider-captcha`      |
| `WatermarkProvider`  | 为指定容器的内容添加文字水印       | `watermark-provider`  |

组件的可交互示例、Props 含义和使用注意见 [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)。

### 7 个扩展组件组

| 组路径：`@w.ui/wui-react/…` | 用途                        | 示例导出                                        |
| --------------------------- | --------------------------- | ----------------------------------------------- |
| `layout`                    | 页面结构、导航与标签页      | `PageContainer`、`FixTabs`、`Footer`            |
| `forms`                     | 输入、签名与聊天交互        | `IntervalInput`、`ReactSignature`、`SmartChat`  |
| `data-display`              | 列表、状态、导出与水印      | `TreeList`、`PDFExport`、`Watermark`            |
| `animation`                 | 文字、背景与交互动效        | `FlipLink`、`MagicTrail`、`TypeWriter`          |
| `media`                     | 音乐、视频、轮播与 PDF 阅读 | `MusicPlayer`、`Video`、`InteractiveBook`       |
| `visualization`             | 图表、思维导图与 Mermaid    | `EChart`、`MarkmapHooks`、`MermaidHooks`        |
| `editor`                    | Markdown、代码与在线编辑    | `MdxEditor`、`CodeHighlighter`、`SandpackBasic` |

```tsx
import { PageContainer } from '@w.ui/wui-react/layout'
import { TreeList } from '@w.ui/wui-react/data-display'
```

上表仅列出代表组件；所有导出见 [完整组件目录](https://github.com/wkylin/pro-react-admin/blob/main/docs/components/COMPONENT_CATALOG.md)。按组导入时需要安装该组使用的可选 peer 依赖，见下节。

## 按需安装扩展依赖

只用基础组件或 `layout` 时，无需安装本节的依赖。导入其他组件组前，安装对应组的 peer；`data-display` 的 PDF 导出，以及 `visualization` 的思维导图和 Mermaid，按实际使用场景安装。

| 使用范围                        | 需要额外安装                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `animation`                     | `motion`、`@react-spring/web`、`@tsparticles/react`、`@tsparticles/engine`、`@tsparticles/slim`             |
| `forms`                         | `@uiw/react-signature`、`highlight.js`、`react-markdown`、`rehype-highlight`、`remark-breaks`、`remark-gfm` |
| `media`                         | `react-pdf`、`pdfjs-dist`、`video.js`、`hls.js`、`i18next`、`react-i18next`                                 |
| `visualization`                 | 导入组时需要 `echarts`；使用思维导图需加 `markmap-lib`、`markmap-view`，使用 Mermaid 需加 `mermaid`         |
| `editor`                        | Tiptap、Sandpack、Markdown、代码高亮相关依赖，安装命令见下方                                                |
| `data-display` 中的 `PDFExport` | 执行 PDF 导出时需要 `html2canvas`、`jspdf`                                                                  |

以下命令使用与包声明兼容的版本；项目已有符合范围的依赖时无需重复安装。

### 动画组

```bash
pnpm add motion@^12 @react-spring/web@^10 \
  @tsparticles/react@^4.4 @tsparticles/engine@^4.4 @tsparticles/slim@^4.4
```

### 表单组

```bash
pnpm add @uiw/react-signature@^1.3.5 highlight.js@^11 react-markdown@^10 \
  rehype-highlight@^7 remark-breaks@^4 remark-gfm@^4
```

### 媒体组

```bash
pnpm add react-pdf@^11 pdfjs-dist@^6.3.289 video.js@^8.24.1 \
  hls.js@^1.7.3 i18next@^26 react-i18next@^17
```

使用 `Video` 时，还需在浏览器入口引入播放器样式：

```tsx
import 'video.js/dist/video-js.css'
```

### 可视化组

```bash
pnpm add echarts@^6.1.0
# 使用 MarkmapHooks 时
pnpm add markmap-lib@^0.18.12 markmap-view@^0.18.12
# 使用 MermaidHooks 时
pnpm add mermaid@^12.1.0
```

### PDF 导出

```bash
pnpm add html2canvas@^1.4.1 jspdf@^4.2.1
```

`PDFExport` 在发起导出时才加载这两个依赖；仅使用 `data-display` 的其他组件无需安装它们。

### 编辑器组

```bash
pnpm add @codesandbox/sandpack-react@^2.20.0 \
  @tiptap/core@3.31.4 @tiptap/react@^3.31.4 @tiptap/starter-kit@^3.31.4 \
  @tiptap/extension-code-block-lowlight@^3.31.4 @tiptap/extension-image@^3.31.4 \
  @tiptap/extension-link@^3.31.4 @tiptap/extension-placeholder@^3.31.4 \
  @tiptap/extension-table@^3.31.4 @tiptap/extension-task-item@^3.31.4 \
  @tiptap/extension-task-list@^3.31.4 @tiptap/extension-text-align@^3.31.4 \
  @tiptap/extension-underline@^3.31.4 highlight.js@^11 katex@^0.19.0 \
  lowlight@^3.3.0 marked@^18.1.0 prism-react-renderer@^2.4.1 \
  react-markdown@^10 rehype-highlight@^7 rehype-katex@^7.0.1 \
  remark-breaks@^4 remark-gfm@^4 remark-math@^6.0.0 shiki@^4.5.0 turndown@^7.2.4
```

## 使用前留意

- **远程数据与鉴权：**`ResponsiveTable` 的远程请求应通过 `requestLib` 或 `fetchData` 接入业务客户端；`autoLoad` 默认关闭。`TreeList` 和 `UserIP` 也由调用方提供加载函数或数据。
- **验证结果：**`MoveChecker` 和 `SliderCaptcha` 提供前端交互；需要做安全判断时，由服务端验证结果。
- **交互语义：**`RadioInput` 是只读的视觉指示器；需要用户选择时使用可交互的表单控件。
- **内容与资源：**`SafeHtml` 会清理 HTML，但仍需按业务检查允许的标签、属性和 URL。`Watermark` 是会返回清理函数的命令式 API，使用后应调用该函数移除水印。
- **PDF 阅读：**`InteractiveBook` 的 PDF worker 由应用创建或沿用宿主配置，worker 文件版本应与 `react-pdf` 使用的 PDF.js 版本一致；卸载后由创建方销毁。配置示例见 [InteractiveBook 文档](https://github.com/wkylin/pro-react-admin/blob/main/packages/wui-react/src/media/InteractiveBook/InteractiveBook.mdx)。
- **编辑器内容：**`MdxEditor` 编辑的是 Markdown，并不执行 MDX 组件代码。示例和更多边界见 [MdxEditor 文档](https://github.com/wkylin/pro-react-admin/blob/main/packages/wui-react/src/editor/MdxEditor/MdxEditor.mdx)。

## 更多资料

- [Storybook：可交互示例、Props 说明和注意事项](https://wkylin.github.io/pro-react-admin/storybook/)
- [完整组件与分组导出目录](https://github.com/wkylin/pro-react-admin/blob/main/docs/components/COMPONENT_CATALOG.md)
- [包声明：准确的 peer 版本范围](https://github.com/wkylin/pro-react-admin/blob/main/packages/wui-react/package.json)
- [MIT 许可证](https://github.com/wkylin/pro-react-admin/blob/main/LICENSE)
