# Storybook 组件开发指南

项目使用 Storybook 10 和 @storybook/react-webpack5；开发与静态构建由 Webpack 5 builder 完成。

## 启动和构建

```bash
pnpm run storybook
```

开发地址为 [http://localhost:6006](http://localhost:6006)。生成静态文档：

```bash
pnpm run build-storybook
```

输出目录为 storybook-static/。本地静态预览可运行：

```bash
pnpm run serve:storybook
```

这个脚本使用 6007 端口。Storybook 开发服务器和静态应用产物互相独立。

## 新增 Story

在组件旁边创建 story 文件，例如：

```text
src/components/Notice/Notice.tsx
src/components/Notice/Notice.stories.tsx
```

最小示例：

```tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Notice from './Notice'

const meta = {
  title: 'Components/Notice',
  component: Notice,
  tags: ['autodocs'],
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
```

Storybook 会扫描 src 下的 *.stories.js、jsx、mjs、ts、tsx 和 mdx 文件。组件示例用于开发和文档；要发布到 @w.ui/wui-react，仍需从 src/lib 对应入口显式导出组件。

## 全局上下文与样式

.storybook/preview.tsx 当前提供：

- i18n 的 I18nextProvider
- React Suspense 加载占位
- 使用 MemoryRouter 提供的路由上下文

它不会自动启动完整应用的 renderApp、RootLayout、权限路由或 ProThemeProvider。需要这些上下文的组件应使用 story 局部 decorator/provider，保持示例可独立运行。

.storybook/main.ts 从 config/path-aliases.json 读取与应用、TypeScript、组件库共用的路径 alias；TypeScript 对应文件由 `pnpm run sync:aliases` 生成。Storybook 使用自己的运行时样式注入规则，Less/CSS Modules 的 style-loader 与应用、组件库的 CSS 提取设置不同，这是输出介质不同导致的边界。public/ 与 src/assets/ 注册为静态目录。CI 会独立构建 Storybook。

## 在 GitHub Pages 上部署

GitHub Pages 工作流将静态文件放到 /pro-react-admin/storybook/。构建时设置 STORYBOOK_BASE_HREF=/pro-react-admin/storybook/，build-storybook 完成后由 scripts/add-storybook-base.cjs 注入 base href。普通本地构建不设置该变量，因此不会写入线上子路径。

## 常见问题

### 找不到模块或 alias

检查 import 的路径大小写，并运行 `pnpm run check:aliases` 确认共享 alias 清单和 TypeScript 生成文件一致。

### 页面使用 Router hook 时崩溃

检查该 story 是否处于 MemoryRouter 中。组件如果依赖特殊 route 参数或 location state，应在 story 自己设置 initialEntries/Decorator。

### 组件样式缺失

确认 Less 文件属于组件自身导入链路，并检查样式是否被全局 reset/theme 依赖。Storybook 不会自动运行应用入口中的 CSS 导入和 ConfigProvider。

### 构建后部署子路径资源 404

检查 STORYBOOK_BASE_HREF 的值末尾是否包含斜杠，并确认部署目录和这个路径一致。
