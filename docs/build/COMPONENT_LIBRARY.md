# Storybook 与组件库

本仓库用 Storybook 展示组件，用 Vite 构建可发布的 React 组件库 `@w.ui/wui-react`。Storybook 是仓库内的组件预览环境；`dist-lib/` 是供其他项目安装的 npm 包产物。

## 启动 Storybook

先在仓库根目录安装项目依赖，然后启动开发服务器：

```bash
pnpm install --frozen-lockfile
pnpm run storybook
```

打开 <http://localhost:6006/>。配置位于 `.storybook/main.ts` 和 `.storybook/preview.tsx`；故事文件从 `src/**/*.stories.*` 和 `src/**/*.mdx` 加载。开发时修改组件或故事，浏览器会热更新。

要构建静态 Storybook 并在本地查看：

```bash
pnpm run build-storybook
pnpm run serve:storybook
```

构建输出到 `storybook-static/`，本地静态预览地址为 <http://localhost:6007/>。GitHub Pages 部署到 `/pro-react-admin/storybook/` 时，CI 会设置 `STORYBOOK_BASE_HREF`；普通本地预览无需设置该变量。

## 开发组件与维护公开入口

组件实现放在 `src/components`；npm 对外 API 由 `src/lib` 明确维护。新增公开组件时：

1. 在 `src/lib/index.ts` 导出组件；需要分类子路径时，也更新相应的 `core.ts`、`stateful.ts`、`stateless.ts` 或 `tracking/index.ts`。
2. 确认根目录 `package.json#exports` 和 Vite lib 配置对应这些入口。
3. 运行 `pnpm run check:components-index` 检查应用内部 barrel。它检查的是 `src/components/index.ts`，与 npm 对外的 `src/lib` 入口不同。

应用内部可以从 `src/components` 导入；外部项目只能使用下方表格列出的公开入口。

## 构建组件库

组件库源码位于 `src/components`，对外 API 由 `src/lib` 显式导出。构建根入口、分类入口和发布元数据：

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
```

`pnpm run prepublishOnly` 会按顺序执行以上全部步骤。构建产物写入 `dist-lib/`，包括 JavaScript、TypeScript 声明、`style.css`、发布用 `package.json` 和 README。React、React DOM、Ant Design、React Router 是 peer dependencies，由消费项目提供。

| 消费方导入 | 源入口 | 构建命令 |
| --- | --- | --- |
| `@w.ui/wui-react` | `src/lib/index.ts` | `pnpm run build:lib` |
| `@w.ui/wui-react/core` | `src/lib/core.ts` | `pnpm run build:lib:entries` |
| `@w.ui/wui-react/stateful` | `src/lib/stateful.ts` | `pnpm run build:lib:entries` |
| `@w.ui/wui-react/stateless` | `src/lib/stateless.ts` | `pnpm run build:lib:entries` |
| `@w.ui/wui-react/tracking` | `src/lib/tracking/index.ts` | `pnpm run build:lib:entries` |
| `@w.ui/wui-react/style.css` | 构建生成 | `pnpm run build:lib` |

发布前可先检查发布包内容：

```bash
pnpm run prepublishOnly
pnpm publish ./dist-lib --access public --dry-run
```

确认版本、导出路径和包内容后，使用 `pnpm run pub` 发布正式版本，或使用 `pnpm run pub:beta` 发布 beta 版本。发布需要 npm 登录权限；发布前按项目流程更新根目录 `package.json` 的版本号。

## 在新项目中使用 `@w.ui/wui-react`

项目需要 React 19、Ant Design 6 和 React Router DOM 7。新建项目时可安装库和这些运行时依赖：

```bash
pnpm add react react-dom antd react-router-dom @w.ui/wui-react
```

已有 React 项目如果已安装兼容版本，只需添加组件库：

```bash
pnpm add @w.ui/wui-react
```

在应用入口导入组件库样式，再从根入口导入组件：

```tsx
// src/main.tsx
import '@w.ui/wui-react/style.css'
import { ColorfulText, OneTimePasscode } from '@w.ui/wui-react'

function Example() {
  return (
    <>
      <OneTimePasscode variant="compact" />
      <ColorfulText text="Hello" />
    </>
  )
}
```

也可以从分类入口导入：

```tsx
import { KeepAlive } from '@w.ui/wui-react/core'
import { TreeList } from '@w.ui/wui-react/stateful'
import { ColorfulText } from '@w.ui/wui-react/stateless'
import { TrackerCore } from '@w.ui/wui-react/tracking'
import '@w.ui/wui-react/style.css'
```

组件库包含 TypeScript 声明。使用依赖路由、国际化或其他 React Context 的组件时，消费项目需要在组件上层提供对应的 Provider。公开组件和入口清单见[导出约定](../development/COMPONENT_EXPORTS.md)。

### 在本地消费尚未发布的构建

在组件库仓库根目录运行：

```bash
pnpm run prepublishOnly
```

然后在消费项目安装刚生成的 `dist-lib/` 目录：

```bash
pnpm add /path/to/pro-react-admin/dist-lib
```

把路径替换成当前机器上的实际仓库路径。这样可以在发布前验证打包内容和消费项目的导入；验证后，改为安装 registry 中发布的版本。
