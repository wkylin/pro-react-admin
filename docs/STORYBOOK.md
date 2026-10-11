# Storybook 本地预览与部署

Storybook 10.6 使用 React Webpack5 builder，直接编译当前源码；不读取旧 npm 包或 `packages/wui-react/dist`。组件 story 与源码同目录，`.storybook` 保存公共配置、开发指南和 Provider。查看新版本无需先构建 lib。

## 本地启动

在仓库根目录使用 Node.js >=24.15.0 且 <25，先安装仓库锁定的依赖：

```bash
pnpm install --frozen-lockfile
npm run storybook
```

打开 http://localhost:6006。等价命令是 `pnpm run storybook`。已有旧进程时先 Ctrl+C 停止，再重新启动；浏览器刷新后查看 `WUI / Components`、`Shared`、`Components / Stateless` 和 `Components / Stateful`。

端口被占用时可以选择另一个端口：

```bash
npm run storybook -- --port 6008 --no-open
```

`$RefreshSig$ is not defined` 的原因是根 Babel 开发配置注入了 React Refresh，但 Storybook 没有应用的 Refresh runtime。`.storybook/main.ts` 为 Storybook 指定独立的 Babel `envName: storybook`；应用开发构建继续保留 Refresh。不要通过给 window 写空函数来遮蔽异常。配置改动后需要重启进程；怀疑旧构建缓存时，先停止服务，再删除 Storybook 专用缓存：

```bash
node --input-type=module -e "import fs from 'node:fs'; for (const p of ['node_modules/.cache/storybook', 'node_modules/.cache/.storybook', 'node_modules/.cache/storybook-babel']) fs.rmSync(p, { recursive: true, force: true })"
npm run storybook
```

根 Babel 的类型导入应显式使用 `import type`。例如 ECharts 的 GeoJSON 类型没有可执行 `.js` 文件，不能让 Babel 将它保留为运行时 import。

## 组件覆盖与分组

| 分组                   | 当前源码                   | 内容                                                                               |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| WUI / Components       | `packages/wui-react/src`   | 12 个公开组件，契约以 `config/library-contract.mjs` 为准                           |
| Shared                 | `src/shared/ui`            | FixTabPanel、ScrollProgressBar                                                     |
| Components / Stateless | `src/components/stateless` | 139 个直接 UI 入口，包括图表、动画、代码、编辑器、媒体、页面片段和命令式 Watermark |
| Components / Stateful  | `src/components/stateful`  | CheckableTags、TreeList、markmap、mermaidHooks                                     |

合计 157 个 UI 入口都有 stories。Hooks 不是独立可渲染的组件，通过使用它们的示例展示；编辑器内部 Header/Toolbar、部署流程的阶段卡片等私有实现由父组件示例覆盖，不将内部辅助组件作为独立公开 API。

Storybook 全局提供应用 store、翻译、MemoryRouter、主题、Ant Design ConfigProvider/App。样式使用应用 Tailwind 源文件，Less 的 CSS Modules 保留默认导出，SVG 组件按应用规则转译。示例不启动企业 API；TreeList 和 SmartChat 提供本地模拟响应。外部视频、图片、IP 和 Sandpack 示例仍可能访问第三方服务，离线浏览不保证这些资源可用。

## 构建与检查

```bash
pnpm run check:stories
pnpm run typecheck:storybook
pnpm run test:tooling
npm run build-storybook
node scripts/validate-stories.mjs --built
npm run serve:storybook
```

静态输出为 `storybook-static`，预览 http://localhost:6007。`check:stories` 检查每个 UI 入口是否有 story；`--built` 进一步确认每个组件进入实际构建索引。Webpack CI 和 Pages workflow 同时执行源码覆盖、类型及构建索引检查。索引检查不能代替浏览器交互验证。

正常环境优先使用 package scripts；包管理器启动器出现异常时，可以用已安装的 Node CLI 复现：

```bash
node node_modules/storybook/dist/bin/dispatcher.js dev -p 6006 --no-open
NODE_ENV=production node node_modules/storybook/dist/bin/dispatcher.js build -o storybook-static
node scripts/add-storybook-base.cjs
node node_modules/typescript/bin/tsc6 --project tsconfig.storybook.json
```

## 新增或修改示例

基础示例、空数据、禁用、加载、错误与受控交互应依据组件实际能力选择。使用 `satisfies Meta<typeof Component>` 和 `StoryObj<typeof meta>`，直接导入当前目录的组件，避免 `ComponentType<any>` 遮蔽已经存在的 props 类型。

```tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/Example',
  component: Component,
  tags: ['autodocs'],
  args: { text: '当前源码示例' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
```

MDX 使用 `@storybook/addon-docs/blocks` 的 Meta、Canvas、ArgTypes，绑定同目录导出的 Story；已有手写 MDX 的组件沿用该文档入口，无需重复生成 autodocs。

```mdx
import { Meta, Canvas, ArgTypes } from '@storybook/addon-docs/blocks'
import * as Stories from './Example.stories'

<Meta of={Stories} />

# Example

<Canvas of={Stories.Default} />
<ArgTypes of={Stories} />
```

资源可以直接 import，或用 `new URL('./assets/example.pdf', window.location.href).href` 指向 Storybook 静态资源目录。避免 `/assets/...` 的域名根路径写法，它在 GitHub Pages 仓库子路径下会返回 404。命令式组件示例需要在 effect 返回清理函数，防止切换示例后残留 DOM/观察器。

## GitHub Pages

仓库的 `.github/workflows/deploy-gh-pages.yml` 默认发布全部演示入口和 Storybook。首次启用仓库 Settings → Pages → Source → GitHub Actions，推送 `main` 后自动构建；也可以在 Actions 手动选择 `storybook`，仅发布组件站和入口导航。

[Storybook 预览入口](https://wkylin.github.io/pro-react-admin/storybook/) 是该仓库的 Pages 发布地址。新增示例上线需本次代码推送并等待 workflow 成功；地址本身不代表最新版本已经发布。Fork 使用自己的用户名和仓库名。各应用完整发布命令见 [GitHub 部署指南](GITHUB_DEPLOYMENT.md)。

```bash
PAGES_TARGET=storybook pnpm run build:pages
```

上述命令只构建到 `dist-combined`，不会上传。Pages 构建将 base 写入 manager 和 iframe HTML；默认值 `/pro-react-admin/storybook/`，实际 Actions 从 Pages 配置读取域名和 base path，支持改名、Fork 与自定义域名。

## Vercel 独立组件站

组件站使用独立 Vercel 项目，避免沿用根 `.vercel/project.json` 的应用关联。先在 Vercel 新建 `pro-react-admin-storybook` 项目；已有账户授权可以复用。

使用已经验证的静态产物上传：

```bash
# 在域名根部署，不设置 STORYBOOK_BASE_HREF
npm run build-storybook
npm run vercel:prepare:storybook

# CLI 未登录时执行；已登录无需重复
npx vercel login
npx vercel link --cwd artifacts/vercel-storybook --project pro-react-admin-storybook
npx vercel deploy --cwd artifacts/vercel-storybook --prebuilt --prod
```

准备命令只写入 Git 忽略的 `artifacts/vercel-storybook/.vercel/output`，保留根应用关联。若产物包含 Pages base，准备命令会拒绝它，需先取消终端中的 `STORYBOOK_BASE_HREF` 并重建。把部署命令返回的真实 production URL 加入 README；未实际部署前不填猜测域名。

也可以在独立 Vercel 项目导入同一个 GitHub 仓库，Framework 选 Other，Node 选 24.x，Install Command 为 `pnpm install --frozen-lockfile`，Build Command 为 `pnpm run build-storybook`，Output Directory 为 `storybook-static`。项目配置可参考根 `vercel.storybook.json`；仓库根 `vercel.json` 默认构建后台应用，需要在组件站项目设置中明确覆盖这三个命令/目录。静态 Storybook 不需要 API rewrite 或 SPA fallback。
