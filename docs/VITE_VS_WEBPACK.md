# Vite 与 Webpack 双构建维护要点

> 面向本仓库当前配置（`vite.config.ts`、`webpack/webpack.common.js`）。重点是统一入口、环境变量、SVG 处理和脚本命令，方便后续维护。

## 入口与 HTML

- 当前有两份入口 HTML：Webpack 的 `HtmlWebpackPlugin` 使用 `public/index.html`，Vite 的 `rollupOptions.input` 使用根目录 `index.html`。在完成模板合并前，两份文件都需要纳入变更检查。
- Vite 开发服务器直接使用根目录 `index.html`，`open` 关闭，启动后访问 http://localhost:5173/。
- Vite 始终复制根级 `public/`；项目级 `src/projects/<project>/public/` 文件会覆盖同名资源，行为与 Webpack 的静态文件合并一致。

## 环境变量与注入

- Vite 只隐式公开 `VITE_*`；两种构建器共享 `build/public-env.js` 的显式公开变量清单，并通过 `__APP_ENV__` 和 `src/utils/env.ts` 提供一致读取方式。
- Webpack：`dotenv-webpack` 按 `BUILD_GOAL` 选择 `.env.*`。任何浏览器可访问的变量都视为公开值；OAuth client secret、账号密码等私密值必须由服务端持有。
- 新增公开变量时，优先使用 `VITE_*` 命名；需要兼容旧变量名时，必须在 `build/public-env.js` 的 allowlist 中显式添加。

## SVG 处理

- 统一为“默认导出 React 组件”模式，无需 `?react`：
  - Vite：`vite-plugin-svgr` 配置 `include: '**/*.svg'` + `exportType: 'default'`。直接 `import Icon from '.../icon.svg'`，在 JSX 中 `<Icon />` 使用。
  - Webpack：`@svgr/webpack` 规则同样将 `.svg` 转为组件，默认导出。
- 若需图片 URL，请使用 `import iconUrl from './icon.svg?url'`（Vite 内置）或在 Webpack 中使用资源加载规则，避免误当组件。

## 路径别名

- 两端保持一致：`@`/`@src`/`@stateless`/`@stateful`/`@hooks`/`@app-hooks`/`@assets`/`@pages`/`@routers`/`@utils`/`@theme`。

## 构建与输出

- Vite：`pnpm run dev:vite`（5173），`pnpm run build:vite` 输出 `dist-vite`，`pnpm run preview:vite`（5174）。`BUILD_TOOL=vite pnpm run serve:dist` 可静态预览默认 Vite 产物；`pnpm run build:vite:pages` 与 `pnpm run preview:vite:pages` 使用独立的 `dist-vite-pages` 目录，验证 Pages 子路径，不覆盖 Webpack 的 `dist`。
- Webpack：`npm run start`（dev，端口 8080 起），`npm run build:production|test|dev` 输出 `dist`。

## Vite CI 与预览

- `.github/workflows/vite-build-preview.yml` 在 `vite` 分支的 push、PR 和手动触发时构建默认应用、GitHub Pages 子路径应用、projectA 与 projectB。
- 每个产物都通过 `pnpm run verify:vite:preview` 启动 Vite preview，并检查入口 HTML、版本清单、Service Worker、入口资源文件和 HTTP 响应。
- CI 将通过检查的四组目录上传为 7 天有效的 Actions artifact。当前验证不触发 Vercel 或 GitHub Pages 部署；Webpack 微前端 shell/remote 也尚未纳入 Vite 覆盖范围。

## 常见改动指南

- 新增页面/组件：引用 SVG 时直接 `import Icon from './x.svg'`；如需 URL，用 `?url`。
- 新增公开环境变量：使用 `VITE_*`，或将确认可公开的旧变量名加入 `build/public-env.js` allowlist，再通过 `getEnv('YOUR_KEY')` 读取。
- 新增页面/组件不要将私密环境变量放进浏览器配置；Vite 的 `VITE_*` 前缀表示变量可公开。

## 验证矩阵（变更后建议跑）

1. `pnpm run dev:vite -- --clearScreen=false --host --port 5173` → 页面可打开，无控制台报错。
2. `pnpm run build:vite && pnpm run verify:vite:preview` → 默认产物可由 Vite preview 提供。
3. `pnpm run build:vite:pages && PUBLIC_URL=/pro-react-admin/ VITE_OUT_DIR=dist-vite-pages pnpm run verify:vite:preview` → Pages 子路径入口与资源可访问。
4. `pnpm run start` 或对应 build serve → Webpack 本地运行正常。
