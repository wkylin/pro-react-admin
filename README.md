# Pro React Admin

React 企业管理应用与组件工作区，基于 React 19、Ant Design 6、React Router 7、Zustand 5、Webpack 5 和 TypeScript 6。提供完整展示应用、精简企业入口、多项目构建、Module Federation Host/Remote，以及独立 UI 包 @w.ui/wui-react。

## 开始

要求 Node.js >=24.15.0 且 <25、pnpm 11.5.2。

```bash
pnpm install --frozen-lockfile
pnpm run start:enterprise
```

企业入口包含工作台、用户、角色和审计管理；`pnpm start` 启动完整展示应用与本地 Tracking helper。环境模板开启演示权限，演示数据只保留在当前应用实例中；正式业务需关闭 REACT_APP_USE_MOCK 并接入真实权限与数据服务。

## 工程能力

- 明确的 app/features/platform/shared/UI 包边界，类型与依赖方向门禁。
- 一处维护权限、标题和菜单元数据；导航与搜索同步授权，已挂载页面响应撤权。
- 每个应用根独立 Store 和页面缓存，项目偏好按命名空间保存。
- 注册表驱动开发、构建、预览、清理和部署，支持 doctor、dry-run 与项目脚手架。
- 可替换的类型化 DataProvider、REST adapter、用户/角色 CRUD 和只读审计示例。
- 编译期业务模块契约，统一路由、Provider、资源目录、依赖和权限控制的 Header 插槽。
- 展示与企业路由独立，重型页面和可选效果按需加载，生产包体积门禁。

## 常用命令

```bash
pnpm run project:doctor
pnpm run project:create customer --dry-run
pnpm run project:dev projectA
pnpm run build:enterprise:stats
pnpm run test:e2e:enterprise
pnpm run ci:quality
```

微前端、Docker 静态镜像、Vercel/GitHub Pages 与组件库发布见文档。根应用为 private，UI 包独立构建和发布。

## 维护入口

- [架构与边界](docs/ARCHITECTURE.md)、[源码职责](docs/SRC_DIRECTORY_GUIDE.md)。
- [企业资源接入](docs/ENTERPRISE.md)、[权限与导航](docs/USER_ROLE_PERMISSION.md)。
- [业务模块扩展](docs/MODULES.md)。
- [多项目](docs/MULTI_PROJECT.md)、[微前端](docs/MFE_DEPLOYMENT.md)、[构建与部署](docs/DEPLOY.md)。
- [GitHub 开源对标](docs/BENCHMARKS.md)、[实测验证](docs/VALIDATION.md)。
- [文档索引](docs/README.md)、[自动生成参考](docs/PROJECT_REFERENCE.md)。
- [贡献指南](CONTRIBUTING.md)、[安全说明](SECURITY.md)、[组件包用法](NPM_README.md)。

工程正在从展示模板向可扩展业务产品演进。真实租户/RBAC 后端、服务端审计与缓存、插件系统及全仓 strict 仍需继续完善，详见架构和对标文档。
