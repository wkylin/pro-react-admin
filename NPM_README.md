# @w.ui/wui-react

基于 React 19 和 Ant Design 6 的高质量组件库，提供 100+ 可复用的业务组件。

## ✨ 特性

- 🚀 基于 **React 19** 和 **Ant Design 6** 构建
- 📦 开箱即用的高质量 React 组件
- 🛡 使用 TypeScript 开发，提供完整的类型定义
- 🎨 支持主题定制和暗黑模式
- 📱 响应式设计，完美适配移动端
- 🌐 国际化支持

## 📦 安装

```bash
npm install @w.ui/wui-react
# 或
yarn add @w.ui/wui-react
# 或
pnpm add @w.ui/wui-react
```

## 🔨 使用

```jsx
import React from 'react'
import { DescBox, RadioInput, Exception } from '@w.ui/wui-react'
import '@w.ui/wui-react/style.css'

const App = () => {
  return (
    <div>
      <DescBox title="示例标题" description="这是一个描述框组件" />
      <RadioInput
        options={[
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ]}
        onChange={(value) => console.log(value)}
      />
    </div>
  )
}

export default App
```

## 入口与按需导入（推荐理解）

本包同时支持两种导入方式：

- **主包单入口**：`@w.ui/wui-react`（向后兼容，导出聚合）
- **子路径多入口**：`@w.ui/wui-react/core | /stateful | /stateless`（更细粒度 tree-shaking）

| 源入口（源码）         | 使用方 import 路径          | 对应产物（发布后）                                                                |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| `src/lib/index.ts`     | `@w.ui/wui-react`           | `pro-react-components.es.js` / `pro-react-components.umd.js` / `index.d.ts`       |
| `src/lib/core.ts`      | `@w.ui/wui-react/core`      | `entries/core.es.js` / `entries/core.cjs.js` / `entries/core.d.ts`                |
| `src/lib/stateful.ts`  | `@w.ui/wui-react/stateful`  | `entries/stateful.es.js` / `entries/stateful.cjs.js` / `entries/stateful.d.ts`    |
| `src/lib/stateless.ts` | `@w.ui/wui-react/stateless` | `entries/stateless.es.js` / `entries/stateless.cjs.js` / `entries/stateless.d.ts` |
| （样式）               | `@w.ui/wui-react/style.css` | `style.css`                                                                       |

### 子路径按需导入示例

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { SmartVideoPlayer } from '@w.ui/wui-react/stateless'
import '@w.ui/wui-react/style.css'
```

## 📚 组件列表

本库包含 100+ 组件，包括但不限于：

### 核心组件

- ErrorBoundary - 错误边界
- WatermarkProvider - 水印
- KeepAlive - 页面缓存
- ResponsiveTable - 响应式表格
- GlobalSearch - 全局搜索

### 有状态组件（stateful）

- CheckableTags - 可勾选标签组
- MarkmapHooks - Markmap 思维导图 Hooks
- MermaidHooks - Mermaid 渲染 Hooks
- TreeList - 树形列表

### 无状态组件（stateless）

stateless 组件较多（动画/展示/输入/媒体等）。下面列出部分常用组件名（按导出名）：

- AutoScrollSection
- DescBox
- RadioInput
- CodeHighlighter
- ReMarkdown
- PDFExport
- SmartVideoPlayer
- FixMusicPlayer
- Loading
- OneTimePasscode

完整清单建议查看仓库：`src/lib/stateless.ts`（导出即组件清单），或访问 Storybook。

### UI 组件

- AdvancedCodeBlock - 高级代码块
- AnimatedList - 动画列表
- BackgroundBeams - 背景光束效果
- BorderBeam - 边框动画
- ColorfulText - 彩色文字
- DescBox - 描述框
- RadioInput - 单选/多选输入

### 动画组件

- AnimateOnScreen - 进入视口动画
- AnimateRipple - 波纹动画
- BlurFade - 模糊渐显
- ScrollAnimation - 滚动动画
- TypeWriter - 打字机效果

完整组件列表请访问 [在线文档](https://wkylin.github.io/pro-react-admin/storybook/)

## 🔗 依赖

### Peer Dependencies

```json
{
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0",
  "antd": ">=6.0.0"
}
```

确保你的项目中已安装这些依赖。

## 🌍 浏览器支持

- 现代浏览器
- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 📖 文档

- [在线演示](https://wkylin.github.io/pro-react-admin/)
- [Storybook 组件文档](https://wkylin.github.io/pro-react-admin/storybook/)
- [GitHub 仓库](https://github.com/wkylin/pro-react-admin)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

详见 [贡献指南](https://github.com/wkylin/pro-react-admin/blob/main/CONTRIBUTING.md)

## 📄 License

MIT © [wkylin](https://github.com/wkylin)

## 👨‍💻 作者

**wkylin**

- GitHub: [@wkylin](https://github.com/wkylin)
- Email: wkylin.w@gmail.com

## ⭐️ Star History

如果这个项目对你有帮助，请给一个 ⭐️ 支持一下！
