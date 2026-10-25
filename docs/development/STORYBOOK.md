# Storybook 本地预览与部署

Storybook 10.6 是组件开发与文档站，Webpack5 和 Vite builder 直接编译同一份组件源码与 stories；不读取 `packages/wui-react/dist`。组件 story 与源码同目录，`.storybook/main.ts` 是 Webpack 配置，`.storybook/vite/main.ts` 是 Vite 配置，两者共用 `.storybook/preview.tsx` 的 Provider。查看或修改组件无需先构建 lib。

Storybook 的静态目录用于预览，不是可安装的 npm 包。要构建和发布 `@w.ui/wui-react`，请走[组件包发布指南](../deployment/LIBRARY_PUBLISH_GUIDE.md)；站点的手动发布步骤见[手动部署指南](../deployment/MANUAL_DEPLOYMENT.md)。

## 本地开发与预览

在仓库根目录使用 Node.js >=24.15.0 且 <25、pnpm 11.5.2，先运行 `pnpm install --frozen-lockfile`。选择一套 builder；它们展示相同的 stories，只影响本地编译速度和构建实现。

| 任务                   | Webpack（默认）                             | Vite                                                              |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| 开发并自动刷新         | `pnpm run storybook:webpack`，端口 6006     | `pnpm run storybook:vite`，端口 6008                              |
| 构建静态站             | `pnpm run build-storybook:webpack`          | `pnpm run build-storybook:vite`                                   |
| 构建输出               | `storybook-static/`                         | `storybook-static-vite/`                                          |
| 本地预览已构建的文件   | `pnpm run serve:storybook`，端口 6007       | `pnpm exec serve storybook-static-vite -p 6009`                   |
| 检查实际构建的组件索引 | `node scripts/validate-stories.mjs --built` | `node scripts/validate-stories.mjs --built=storybook-static-vite` |

首次使用建议先启动开发服务，在浏览器打开终端输出的地址，从左侧导航进入 `WUI / Components`、`Shared`、`Components / Stateless` 或 `Components / Stateful`。修改同目录的 `*.stories.tsx` 或组件源码后，开发服务自动更新；构建出的静态目录不会自动更新，需重新执行对应构建命令。两个静态输出目录独立，切换 builder 无需清理另一套产物。

发布前应预览刚构建的静态目录，而不是把开发服务地址作为部署产物。`serve:storybook` 只预览 Webpack 产物；Vite 产物用上表中的 `pnpm exec serve` 命令。端口被占用时改用 `pnpm exec serve <输出目录> -p <空闲端口>`，以终端实际地址为准。Story 类型统一从 `@storybook/react` 导入。

端口被占用时可以选择另一个端口：

```bash
pnpm exec cross-env BABEL_ENV=storybook storybook dev -p 6010 --no-open
```

上例只用于改 Webpack 开发端口；Vite 使用 `pnpm exec storybook dev -c .storybook/vite -p 6010 --no-open`。`$RefreshSig$ is not defined` 的原因是根 Babel 开发配置注入了 React Refresh，但 Storybook 没有应用的 Refresh runtime。`.storybook/main.ts` 为 Babel loader 指定独立的 `envName: storybook`，`storybook:webpack` 也通过 cross-env 显式设置 `BABEL_ENV=storybook`；应用开发构建继续保留 Refresh。

已经运行的进程不会自动采用新的启动环境或主配置。更新配置后，先在旧终端按 Ctrl+C 停止 Storybook，再清理专用缓存并重新启动：

```bash
pnpm run storybook:reset
# 打开 http://localhost:6006，并刷新原来的浏览器页面
```

单独清理缓存使用 `pnpm run storybook:clean`。不要在服务运行时清缓存；同一工作区同时启动多个 Storybook 进程会共享开发输出目录，可能引起 HMR 持续重载，应先停止旧进程再改端口。不要给 window 写空的 Refresh 函数来遮蔽异常。生产静态构建不走相同的开发运行时，构建通过还需要验证开发预览。

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

ScrollableSections 的 Default 示例自动识别最近的滚动容器，滚动到哪个区块就高亮对应导航；Explicit Container 示例通过 `scrollContainerRef` 指定嵌套容器。无滚动祖先时组件监听窗口。点击导航会在吸顶导航下方留出 20px 间距并平滑定位，滚到最后一个区块时导航保持可见。

MagicTrail 的 Default 示例在深色区域展示鼠标轨迹与粒子，需要移动鼠标触发；停下或移出后效果逐渐消退。Explicit Container 示例演示外层 `containerRef` 和 RGB/HSL/命名颜色，Trail Only 将 `particleCount` 设为 0。覆盖层不拦截底层按钮。实际使用时将组件放在有明确尺寸且 `position: relative` 的容器中；不传 ref 时默认监听父容器，绘制位置以 Canvas 为原点。

TransferHistory 的 Default 默认显示 3 家公司，分支短线以箭头连接公司卡片；“展开全部公司”旁显示向下箭头，展开后改为向上箭头并可收起。Single Company / All Companies 分别展示 1 家和全部公司，Controls 可调整 `defaultDisplayCount`。左侧主连接线仅覆盖首末可见公司，不延伸至展开按钮；时间轴超宽时可横向滚动。

ScrollProgressBar 的 Default / Gradient 使用 ScrollArea，进度条吸附在示例自身滚动区域的顶部；FixTabPanel 也使用容器内的 sticky 定位。需要滚动示例内部区域，顶部进度为 0，中间约 50%，底部 100%；Empty 内容无需滚动，因此宽度保持为零。独立 ScrollProgressBar 省略 container 时仍支持页面进度，默认 fixed。

ShootingStars 的 Default 自动在深色区域生成流星，无需鼠标操作；示例使用 500～1000ms 间隔和较长尾迹，Warm Colors 展示暖色效果，Compact 展示 320px 窄容器。组件按自身 SVG 尺寸生成和移除流星，随容器大小变化调整，不使用浏览器窗口尺寸。实际使用时放在有明确尺寸且 `position: relative` 的容器中。

## 修改组件后的检查

```bash
pnpm run check:stories
pnpm run typecheck:storybook
pnpm run test:tooling
pnpm run build-storybook:webpack
node scripts/validate-stories.mjs --built
pnpm run serve:storybook
```

这是默认 Webpack 的提交前路径，静态预览地址为 http://localhost:6007。使用 Vite 时将构建、索引检查和预览三步换成上表的 Vite 命令；`check:stories`、`typecheck:storybook` 与 `test:tooling` 不变。`check:stories` 检查每个 UI 入口是否有 story；`--built` 进一步确认每个组件进入实际构建索引。`test:tooling` 包含真实 Storybook Babel compiler addon 与 Webpack 开发转译回归，验证 store/theme 模块能够加载。CI 与 Pages workflow 也会执行源码覆盖、类型及构建索引检查；索引检查不能代替浏览器交互验证。

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
import type { Meta, StoryObj } from '@storybook/react'
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

[Storybook 预览入口](https://wkylin.github.io/pro-react-admin/storybook/) 是该仓库的 Pages 发布地址。当前 Actions 工作流使用默认 Webpack builder；本地可用 `BUILD_TOOL=vite` 构建同一目录结构，但 workflow 没有 builder 选择输入。两种本地产物在聚合构建后都位于 `dist-combined/storybook/`，不会同时部署两份。新增示例上线需推送代码并等待 workflow 成功；地址本身不代表最新版本已经发布。Fork 使用自己的用户名和仓库名。各应用完整发布命令见 [GitHub 部署指南](../deployment/GITHUB_DEPLOYMENT.md)。

```bash
PAGES_TARGET=storybook pnpm run build:pages
pnpm run check:pages
```

上述命令只构建到 `dist-combined`，不会上传；实际发布由 `.github/workflows/deploy-gh-pages.yml` 在 push `main` 或手动触发时完成。Pages 构建将 base 写入 manager 和 iframe HTML；默认值 `/pro-react-admin/storybook/`，实际 Actions 从 Pages 配置读取域名和 base path，支持改名、Fork 与自定义域名。要本地验证 Pages 的 Vite 版本，运行 `BUILD_TOOL=vite PAGES_TARGET=storybook pnpm run build:pages` 后再执行 `pnpm run check:pages`。

## Vercel 独立组件站

组件站使用独立 Vercel 项目，避免沿用根 `.vercel/project.json` 的应用关联。先在 Vercel 新建 `pro-react-admin-storybook` 项目；已有账户授权可以复用。

使用已经验证的静态产物上传：

```bash
# 在域名根部署，不设置 STORYBOOK_BASE_HREF
pnpm run build-storybook:webpack
pnpm run vercel:prepare:storybook

# CLI 未登录时执行；已登录无需重复
npx vercel login
npx vercel link --cwd artifacts/vercel-storybook --project pro-react-admin-storybook
npx vercel deploy --cwd artifacts/vercel-storybook --prebuilt --prod
```

准备命令固定读取 Webpack 的 `storybook-static/`，只写入 Git 忽略的 `artifacts/vercel-storybook/.vercel/output`，保留根应用关联；`storybook-static-vite/` 目前仅供本地构建与预览。若产物包含 Pages base，准备命令会拒绝它，需先取消终端中的 `STORYBOOK_BASE_HREF` 并重建。把部署命令返回的真实 production URL 加入 README；未实际部署前不填猜测域名。

也可以在独立 checkout 中关联组件站 Vercel 项目，Node 选 24.x，构建与部署时明确指定 `--local-config vercel.storybook.json`。该配置使用 `pnpm install --frozen-lockfile`、`pnpm run build-storybook` 和 `storybook-static`；根 `vercel.json` 默认构建后台应用，不能将其作为组件站配置。静态 Storybook 不需要 API rewrite 或 SPA fallback。
