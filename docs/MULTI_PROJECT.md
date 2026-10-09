# 多项目架构

一份源码和一套依赖通过构建时 PROJECT 选择一个应用入口，输出独立静态应用。这与 Module Federation 在浏览器运行时加载 Remote 是两种能力。

## 项目注册表

src/projects/registry.json 是项目入口、source root、路由目录、输出目录和 MFE 暴露模块的单一清单。webpack/paths.js 据此选择构建入口和 @routers alias。未知 PROJECT、缺失入口或路由目录会直接报错，不会回退到主应用。

| PROJECT | 入口 | 路由目录 | 输出目录 |
| --- | --- | --- | --- |
| default | src/index.tsx | src/routers | dist/ |
| projectA | src/projects/projectA/index.tsx | src/projects/projectA/routers | dist-projectA/ |
| projectB | src/projects/projectB/index.tsx | src/projects/projectB/routers | dist-projectB/ |
| shell | src/projects/shell/index.tsx | src/projects/shell/routers | dist-shell/ |

ProjectA 的 routers/index.tsx 复用主应用路由；ProjectB 使用独立路由。Shell 仅作为 MFE Host 使用。

## 本地运行与构建

普通应用入口：

- pnpm start
- pnpm start:projectA
- pnpm start:projectB

生产构建：

- pnpm run build:production
- pnpm run build:production:projectA
- pnpm run build:production:projectB

普通 start 命令从 8080 开始选择空闲端口。微前端联调使用固定的 8080/8081/8082 端口，不能与普通项目命令混为一组。

修改注册表后运行 `pnpm run sync:project-contracts`，再运行 `pnpm run check:project-registry` 和 `pnpm run check:project-contracts`。静态 Remote imports 和类型声明由注册表生成，CI 会检查生成文件是否同步。

## 目录职责

```text
src/
├── index.tsx
├── routers/                  # 主应用路由
├── pages/                    # 主应用页面
├── components/               # 共享组件
└── projects/
    ├── registry.json         # 构建和 Remote 配置清单
    ├── projectA/
    │   ├── index.tsx
    │   ├── routers/          # 复用主路由
    │   └── mfe/App.tsx       # Remote 暴露模块
    ├── projectB/
    │   ├── index.tsx
    │   ├── pages/
    │   ├── routers/
    │   └── mfe/App.tsx
    └── shell/
        ├── index.tsx
        └── routers/
```

## Alias 边界

- @app 指向当前项目目录；default 主应用指向 src。
- @routers 指向注册表选择的路由目录。
- @pages、@stateless、@stateful 等共享 alias 仍指向主 src 下的共享能力。
- 项目专属代码可使用相对路径，或通过 @app 指向当前项目。
- PROJECT 是构建时参数，同一个 bundle 内不能切换项目。

路径 alias 由 `config/path-aliases.json` 统一维护，Webpack、Storybook 和组件库读取该清单，TypeScript paths 通过 `pnpm run sync:aliases` 生成。样式 loader 保持工具级配置，因为应用/lib 提取 CSS，而 Storybook 需要运行时注入。

## 新增普通项目

1. 在 src/projects/<name>/ 建立 index.tsx，并使用 renderApp 复用公共启动链。
2. 在 src/projects/registry.json 中注册 sourceRoot、entry、routers 和唯一 output。
3. 需要独立路由时创建 routers/；需要静态资源时创建 public/。
4. 使用通用命令 `pnpm run project:dev -- <name>` 和 `pnpm run project:build -- <name>`；无需复制 webpack 命令。
5. 运行 `pnpm run check:project-registry`，再按部署目标设置 PUBLIC_URL、Vercel 或 GitHub Pages 产物目录。

## 新增 MFE Remote

除普通项目外，还需要：

1. 为注册项目添加 mfeExpose，例如 mfe/App.tsx；组件不要自行创建 Router。
2. 在 registry.json 的 remotes 数组登记名称、标签、路由、开发端口、开发入口、生产路径和 URL 环境变量键。
3. 运行 `pnpm run sync:project-contracts`，生成静态动态 import 和 `typings/module-federation.d.ts` 声明。
4. 配置独立部署所需的 HTTPS Remote URL、manifest/JavaScript CORS、chunk publicPath 和缓存响应头。
5. 运行注册表/生成文件检查并启动 Shell/Remote 完成浏览器联调。

详细命令、协议和部署策略见微前端指南（MFE_DEPLOYMENT.md）。
