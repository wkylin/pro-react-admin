# Pro React Admin

React 管理界面与多项目、微前端示例工作区，同时维护独立 UI 组件包 @w.ui/wui-react。运行时采用 React 19、React Router 7 Hash Router、Ant Design 6、Zustand 5，构建采用 Webpack 5 与 TypeScript 6。

## 开始

要求 Node.js >=24.15.0 且 <25、pnpm 11.5.2。

```bash
pnpm install --frozen-lockfile
pnpm start
```

默认打开 http://localhost:8080，启动脚本同时运行本地埋点 API。单独前端使用 `pnpm run start:web`。仓库环境模板开启演示权限，真实部署需设 REACT_APP_USE_MOCK=false 并接入授权服务；空 APP_BASE_URL 表示同源请求。

## 架构入口

- [技术架构](docs/ARCHITECTURE.md)：分层、路由契约、请求核心与剩余迁移。
- [源码职责](docs/SRC_DIRECTORY_GUIDE.md)：features / platform / shared / packages 边界。
- [快速开始](docs/GETTING_STARTED.md)：配置与常用命令。
- [文档索引](docs/README.md)：权限、API、构建、部署、质量与组件指南。
- [实现参考](docs/PROJECT_REFERENCE.md)：自动生成版本、路由、环境变量和脚本。
- [验证记录](docs/VALIDATION.md)：本次本地检查的实际结果。

默认应用的路由权限、标题与菜单元数据由 config/route-policy.json 管理；项目入口由 src/projects/registry.json 管理；组件库契约由 config/library-contract.mjs 管理。生成配置和文档由 CI 校验。

## 构建与验证

```bash
pnpm run ci:quality
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run test:e2e
```

多项目使用 `pnpm run project:dev projectA`；微前端见[指南](docs/MFE_DEPLOYMENT.md)。UI 包使用 `pnpm run prepare:lib:release`，消费文档见 [NPM_README](NPM_README.md)。根应用为 private，不作为 UI 包发布。

本仓库仍有迁移中的 pages/components 和 JS 适配器；新核心边界与 UI 包严格类型检查不代表全仓已 strict。历史发行记录保留在 [CHANGELOG](CHANGELOG.md)。
