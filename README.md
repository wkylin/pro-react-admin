<div align="center">
  <img src="https://github.com/user-attachments/assets/f4d9bf1d-f45f-4c98-8bde-8c0b7144a120" alt="Pro React Admin" height="120" />
</div>

<div align="center">
  <img src="https://img.shields.io/github/checks-status/wkylin/pro-react-admin/main" alt="CI status" />
  <img src="https://img.shields.io/github/package-json/v/wkylin/pro-react-admin" alt="Version" />
  <img src="https://img.shields.io/github/license/wkylin/pro-react-admin" alt="License" />
</div>

# Pro React Admin

基于 React 19、TypeScript、Ant Design 6 和 Webpack 5 的中后台应用与组件库。当前仓库只用 Webpack 构建应用、Module Federation 和组件库；Storybook 使用 Webpack 5 builder。

## 在线预览

- [主应用](https://wkylin.github.io/pro-react-admin/)
- [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)
- [Vercel 应用](https://pro-react-admin.vercel.app/)

## 技术能力

- RBAC 路由、菜单和页面权限控制
- React 19、KeepAlive、多标签页、主题和国际化
  - 通过 src/projects/registry.json 选择构建入口的多项目架构
- Webpack 5 Module Federation Shell/Remote
- 明确导出 API 的 @w.ui/wui-react 组件库
- Storybook 组件示例与文档
- Jest、Testing Library、Playwright、ESLint 和 Stylelint

## 本地运行

环境要求：Node.js 24.x、pnpm 11.5.2。

```bash
pnpm install
pnpm start
```

打开 http://localhost:8080/。首次运行、环境变量、常见命令和故障排查见[新手入门](./docs/GETTING_STARTED.md)。

## 项目结构

```text
.
├── .storybook/       # Webpack 5 Storybook 配置
├── api/              # pnpm workspace 中的可选 Express API helper
├── config/           # 共享路径别名和构建体积预算
├── docs/             # 新手、架构、构建、微前端和部署文档
├── public/           # 默认 HTML 模板和公共静态资源
├── scripts/          # 构建辅助、优化、校验和发布脚本
├── src/
│   ├── bootstrap/    # 多入口共用的 React 启动逻辑
│   ├── components/   # 应用内部共享组件
│   ├── lib/          # npm 组件库公开导出
│   ├── mfe/          # Host/Remote 事件与状态桥
│   ├── pages/        # 主应用业务页面
│   ├── projects/     # 项目入口、registry.json 和 MFE shell
│   ├── routers/      # 主路由、菜单与权限
│   ├── service/      # 请求与 API
│   ├── store/        # 全局状态
│   └── theme.tsx     # 应用路由和主题入口
└── webpack/          # 应用、MFE 和组件库 Webpack 配置
```

关键约定：src/pages 放主应用页面；src/components 放应用内共享组件；src/projects 放项目差异；src/lib 决定 npm 包公开 API。Story 文件不自动进入组件库。

## 多项目

```bash
pnpm start:projectA
pnpm start:projectB
pnpm run build:production:projectA
pnpm run build:production:projectB
```

PROJECT 按注册表在构建时选择项目入口和路由；未知项目名会直接失败，多项目不是运行时切换。也可用 `pnpm run project:dev -- projectA` 运行通用入口。见[多项目架构](./docs/MULTI_PROJECT.md)。

## 微前端联调

开三个终端，分别运行：

```bash
pnpm run start:mf:projectA
pnpm run start:mf:projectB
pnpm run start:mf:shell
```

访问 http://localhost:8080/#/portal。详见[微前端开发与部署](./docs/MFE_DEPLOYMENT.md)。

## Storybook

```bash
pnpm run storybook
```

开发地址为 http://localhost:6006；静态构建命令为 pnpm run build-storybook。见[Storybook 组件开发指南](./docs/STORYBOOK.md)。

## @w.ui/wui-react

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
```

新项目可以按聚合入口或 /core、/stateful、/stateless、/tracking 子路径导入。构建、类型、样式与发布说明见[组件库指南](./docs/LIBRARY_PUBLISH_GUIDE.md)。

## 部署

- GitHub Pages 的 main 工作流部署主应用和 Storybook，不部署 MFE。
- 根目录 vercel.json 保留当前安装、rewrite 和 headers；vercel.mfe.json 明确配置聚合 MFE 的 Build Command 与 dist-vercel/。Git 集成的 Vercel Dashboard 设置仍需与目标模式匹配。
- Shell、ProjectA、ProjectB 的独立配置分别见 vercel.shell.json、vercel.projectA.json 和 vercel.projectB.json。
- GitHub Actions 检查主应用、Storybook、聚合 MFE 和 bundle 预算；当前构建 stats 可从最近一次 workflow artifact 获取。

## 文档

- [文档索引](./docs/README.md)
- [新手入门](./docs/GETTING_STARTED.md)
- [技术架构与改进建议](./docs/ARCHITECTURE.md)
- [构建配置](./docs/BUILD.md)
- [微前端](./docs/MFE_DEPLOYMENT.md)
- [权限系统](./docs/USER_ROLE_PERMISSION.md)
