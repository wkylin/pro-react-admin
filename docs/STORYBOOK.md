# Storybook

Storybook 10 使用 React Webpack5 builder；根 .storybook/main.ts 同时扫描应用 src 和 packages/wui-react/src 的 stories/MDX。公共配置和文档辅助组件留在 .storybook，组件 story 与源码同目录。

```bash
pnpm run storybook
pnpm run build-storybook
pnpm run serve:storybook
```

开发端口 6006，静态预览默认 6007。静态输出 storybook-static，postbuild 脚本处理 base。配置共享应用 aliases，单独注入 Less/CSS Modules 样式；不会把 Storybook 的 style-loader 规则复制给应用/组件库。

## 文档写法

使用 @storybook/addon-docs/blocks 的 Meta、Canvas、ArgTypes，Meta of 指向同目录 stories。示例直接引用已导出的 story，避免过时的仅 name 关联方式。

```mdx
import { Meta, Canvas, ArgTypes } from '@storybook/addon-docs/blocks'
import * as Stories from './Example.stories'

<Meta of={Stories} />

# Example

<Canvas of={Stories.Default} />
<ArgTypes of={Stories} />
```

新增组件应包含 props 类型、基础 story、边界状态（空数据、错误、受控状态等），UI 包还要登记 library-contract。静态文档可以链接源码与维护指南，组件动态参数由 ArgTypes 生成，避免手抄不完整 API。

应用组件可能依赖主题、翻译与资源，需要 preview decorators；Storybook 可构建不代表已通过交互或无障碍审计。生成组件清单见[目录](COMPONENT_CATALOG.md)。
