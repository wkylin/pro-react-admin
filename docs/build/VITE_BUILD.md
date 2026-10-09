# Vite 构建

Vite 是仓库当前唯一的构建工具。应用、多项目、组件库、Storybook 和 Module Federation 都从各自的 Vite 配置构建。

## 常用命令

| 目标 | 命令 | 默认产物目录 |
| --- | --- | --- |
| 主应用开发/生产构建 | `pnpm run dev` / `pnpm run build:production` | `dist/` |
| GitHub Pages 子路径构建 | `pnpm run build:pages` | `dist-pages/` |
| ProjectA 独立构建 | `pnpm run build:production:projectA` | `dist-projectA/` |
| ProjectB 独立构建 | `pnpm run build:production:projectB` | `dist-projectB/` |
| 微前端宿主和远程应用 | `pnpm run build:mf:vercel` | `dist-vercel/` |
| Storybook 开发预览 | `pnpm run storybook` | <http://localhost:6006/> |
| Storybook 静态构建/预览 | `pnpm run build-storybook` / `pnpm run serve:storybook` | `storybook-static/`，<http://localhost:6007/> |
| 组件库 | `pnpm run prepublishOnly` | `dist-lib/` |

本地开发、预览和端口说明见[本地开发指南](../getting-started/LOCAL_DEVELOPMENT.md)。微前端细节见[微前端部署](./MFE_DEPLOYMENT.md)。Storybook 启动、静态预览、组件库构建和新项目接入步骤见[Storybook 与组件库指南](./COMPONENT_LIBRARY.md)。

## 配置入口

- `vite.config.ts`：应用、项目入口、资源路径、应用产物和可选微前端插件。
- `vite.config.lib.ts`：组件库根入口。
- `vite.config.lib.entries.ts`：组件库分类子路径入口。
- `.storybook/main.ts`、`.storybook/preview.tsx`：Storybook 配置和全局预览装饰器。
- `build/`：Vite 配置使用的环境、入口和 Module Federation 辅助模块。

应用构建通过 `PROJECT` 选择默认应用或 `src/projects/<project>`。普通项目构建使用独立产物目录；`MFE_ROLE=host|remote` 时启用联邦构建配置。设置 `PUBLIC_URL` 调整静态资源 base，设置 `VITE_OUT_DIR` 覆盖输出目录。

## 资源与环境变量

- `build/public-env.js` 控制哪些构建变量可以进入浏览器。不要把密码、私钥、访问令牌等秘密变量加入前端白名单。
- 生产构建会生成压缩资源。媒体优化使用 `pnpm run optimize:media`；CI 默认跳过会改写素材的步骤，明确需要时设置 `OPTIMIZE_MEDIA=1`。
- `pnpm run analyze:build` 生成应用依赖体积分析报告；`pnpm run build:lib:analyze` 分析组件库产物。

## 构建与预览验证

`pnpm run verify:vite:preview` 会对本地产物进行 HTTP 检查。GitHub Actions 的 `.github/workflows/vite-build-preview.yml` 为应用、Pages 子路径、多项目和微前端构建运行预览验证。

```bash
pnpm run build:production
pnpm run verify:vite:preview
```

## 部署配置

GitHub Pages 的子路径由 `build:pages` 设置。Vercel 微前端组合构建由 `vercel-build` 调用 `build:mf:vercel`，输出 `dist-vercel/`。修改构建命令、base 或产物目录时，应同步检查 GitHub Actions、根目录配置和 Vercel 项目面板的 Build Command 与 Output Directory。

