# Vite 与 Webpack 双构建维护要点

> 面向本仓库当前配置（`vite.config.ts`、`webpack/webpack.common.js`）。重点是统一入口、环境变量、SVG 处理和脚本命令，方便后续维护。

## 入口与 HTML

- 单一入口文件：`public/index.html`。Webpack 的 `HtmlWebpackPlugin` 直接使用该文件；Vite dev/preview/build 也通过 `rollupOptions.input` 指向它。
- Vite 开发服务器中间件将 `/` 与 `/index.html` 映射到 `/public/index.html`，`open` 关闭，启动后直接访问 http://localhost:5173/ 即可。
- 该 HTML 不包含模板变量，title/description 为固定值，确保两端一致。

## 环境变量与注入

- Vite：`envPrefix` 覆盖 `VITE_`/`APP_`/`REACT_APP_`/`IFRAME_`/`AUTH_`/`DEPLOYED_`，并通过 `define: { 'process.env': clientEnv }` 注入到浏览器代码。
- Webpack：`dotenv-webpack` 按 `BUILD_GOAL` 选择 `.env.*`。代码侧请统一使用 `src/utils/env.ts` 的 `getEnv/getEnvBool/getEnvNumber` 读取，避免直接依赖 `process.env`/`import.meta.env` 区分。
- 如新增变量，需同时在 `.env.*` 写入，并在 `vite.config.ts` 的 `clientEnv` 映射中补充（或通过 `getEnv` 读取）。

## SVG 处理

- 统一为“默认导出 React 组件”模式，无需 `?react`：
  - Vite：`vite-plugin-svgr` 配置 `include: '**/*.svg'` + `exportType: 'default'`。直接 `import Icon from '.../icon.svg'`，在 JSX 中 `<Icon />` 使用。
  - Webpack：`@svgr/webpack` 规则同样将 `.svg` 转为组件，默认导出。
- 若需图片 URL，请使用 `import iconUrl from './icon.svg?url'`（Vite 内置）或在 Webpack 中使用资源加载规则，避免误当组件。

## 路径别名

- 两端保持一致：`@`/`@src`/`@stateless`/`@stateful`/`@hooks`/`@app-hooks`/`@container`/`@assets`/`@pages`/`@routers`/`@utils`/`@theme`。

## 构建与输出

- Vite：`npm run dev:vite`（5173），`npm run build:vite` 输出 `dist-vite`，`npm run preview:vite`（5174）。
- Webpack：`npm run start`（dev，端口 8080 起），`npm run build:production|test|dev` 输出 `dist`。

## 常见改动指南

- 新增页面/组件：引用 SVG 时直接 `import Icon from './x.svg'`；如需 URL，用 `?url`。
- 新增环境变量：先在 `.env.*` 写入，再在 `vite.config.ts` 的 `clientEnv` 映射或在代码里用 `getEnv('YOUR_KEY')`。
- 不要新增根级 `index.html`；所有入口与静态资源放在 `public/`。

## 验证矩阵（变更后建议跑）

1. `npm run dev:vite -- --clearScreen=false --host --port 5173` → 页面可打开，无控制台报错。
2. `npm run build:vite` → 产物生成 `dist-vite`，无错误。
3. `npm run start` 或对应 build serve → Webpack 本地运行正常。
