# Vite 构建流程

本分支统一使用 Vite 作为应用、组件库、Storybook 和微前端的构建工具。Webpack 配置和构建脚本已从本分支移除。

## 常用命令

    pnpm run dev
    pnpm run build:production
    pnpm run preview

多项目入口：

    pnpm run dev:projectA
    pnpm run build:production:projectA
    pnpm run preview:projectA

    pnpm run dev:projectB
    pnpm run build:production:projectB
    pnpm run preview:projectB

GitHub Pages 子路径产物：

    pnpm run build:pages
    PUBLIC_URL=/pro-react-admin/ VITE_OUT_DIR=dist-pages pnpm run verify:vite:preview

## 配置约定

- Vite 配置位于根目录的 vite.config.ts。
- 项目入口由 PROJECT 选择，默认为 src/index.tsx；子项目入口位于 src/projects/<project>/index.tsx。
- 默认应用构建输出到 dist；ProjectA 和 ProjectB 分别输出到 dist-projectA、dist-projectB。
- PUBLIC_URL 控制部署 base；VITE_OUT_DIR 可覆盖输出目录。
- 浏览器环境变量通过 build/public-env.js 的显式白名单注入。OAuth secret、账号密码等敏感值不能加入白名单。
- 模块联邦配置位于 build/module-federation.ts，只在 MFE_ROLE=host 或 MFE_ROLE=remote 时启用。

## CI 预览验证

.github/workflows/vite-build-preview.yml 构建主应用、Pages 子路径、独立项目和微前端 host/remotes，并通过 Vite preview 对入口 HTML、资源及 remoteEntry.js 执行 HTTP 检查。默认应用输出到 `dist/`。

本地可分别构建后运行：

    pnpm run build:production
    pnpm run verify:vite:preview

构建配置和子路径切换前，应先确认部署平台的构建命令及产物目录设置。
