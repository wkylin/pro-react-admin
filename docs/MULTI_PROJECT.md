# 多项目（Multi Project）模式

目标：一套依赖（一个 `node_modules`）承载多个业务项目；启动/构建时通过环境变量选择“当前项目入口”，做到**按项目入口打包**，避免每个项目重复克隆+重复装依赖。

## 你现在得到什么

- 默认（单项目）完全不变：继续用根目录 `index.html` + `src/index.tsx`。
- 多项目模式：通过 `PROJECT=projectA|projectB|...` 选择入口文件 `src/projects/<project>/index.tsx`。
- 项目级 `public`：若存在 `src/projects/<project>/public`，则该目录作为 Vite 的 `publicDir`。
- 项目级路由覆盖：若存在 `src/projects/<project>/routers`，则 `@routers` 会指向该目录；否则回退到默认 `src/routers`。

## 目录约定

推荐结构（可按需增减）：

- `src/projects/<project>/index.tsx`：项目入口（类似你描述的 `app.js`）。
- `src/projects/<project>/routers/`：项目路由（可先用“包装转发”复用默认路由）。
- `src/projects/<project>/public/`：项目静态资源（等价于 Vite 的 `public/`）。

## npm scripts

- 默认项目
  - `npm run dev:vite`
  - `npm run build:vite`
  - `npm run preview:vite`

- Project A
  - `npm run dev:vite:projectA`
  - `npm run build:vite:projectA`
  - `npm run preview:vite:projectA`

- Project B
  - `npm run dev:vite:projectB`
  - `npm run build:vite:projectB`
  - `npm run preview:vite:projectB`

## Webpack 静态预览（dist 自动切换）

以下脚本会根据 `PROJECT` 自动选择 `dist` 或 `dist-<project>`：

- `npm run serve:prod` / `npm run serve:dev` / `npm run serve:test`
- `npm run http:prod` / `npm run http:dev` / `npm run http:test`

示例：

- `PROJECT=projectA npm run build:production:projectA`
- `PROJECT=projectA npm run serve:prod`
- `PROJECT=projectA npm run http:prod`

### Webpack（现有 start/build 链路）

- 默认项目
  - `npm run start`
  - `npm run build:production`
  - `npm run prod:serve`

- Project A
  - `npm run start:projectA`
  - `npm run build:production:projectA`
  - `npm run prod:serve:projectA`

- Project B
  - `npm run start:projectB`
  - `npm run build:production:projectB`
  - `npm run prod:serve:projectB`

构建产物目录：

- 默认：`dist-vite`
- 非默认：`dist-vite-<project>`（例如 `dist-vite-projectA`）

Webpack 构建产物目录：

- 默认：`dist`
- 非默认：`dist-<project>`（例如 `dist-projectA`）

## 新增一个项目（例如 projectC）

1) 创建入口文件：`src/projects/projectC/index.tsx`

2) （可选）创建路由目录：`src/projects/projectC/routers/`

- 如果你想先复用默认路由：
  - `routers/index.jsx` 里写：
    - `export { default } from '@src/routers'`
    - `export * from '@src/routers'`
  - `routers/authRouter.jsx` 里写：
    - `export { default } from '@src/routers/authRouter'`

3) （可选）创建静态资源目录：`src/projects/projectC/public/`

4) 增加脚本（两种方式选一种）

- 推荐：直接照着 `projectA`/`projectB` 在根 `package.json` 里添加：
  - `cross-env PROJECT=projectC vite --host --config vite.config.ts`
  - `cross-env PROJECT=projectC vite build --config vite.config.ts`

## 说明（为什么能做到“按需打包”）

Vite 在构建时只会从 `index.html` 注入的**入口脚本**向下依赖分析。
当前实现会在构建/开发时把 `index.html` 里的默认入口 `/src/index.tsx` 替换为 `/src/projects/<project>/index.tsx`，因此不会把其它项目入口当成必需依赖链去打包。
