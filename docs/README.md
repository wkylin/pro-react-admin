# 项目文档

Pro React Admin 是一个 React 管理应用工作区：同一份业务源码可选择 Webpack 或 Vite 构建，包含默认展示应用、精简企业入口、独立项目、微前端示例和 UI 组件包。它提供可运行的演示，也保留了接入真实业务时必须处理的身份、数据和部署边界。先看[工程导览](architecture/ENGINEERING_OVERVIEW.md)，再按下面的路径深入。

## 1. 选型：确认能力与边界

[工程导览](architecture/ENGINEERING_OVERVIEW.md)把项目、模块、构建、测试和部署连成一条链，并标出各项能力的源码与验证入口。[技术架构](architecture/ARCHITECTURE.md#当前能力与边界)列出已实现行为和仍需建设的部分。默认应用适合体验完整界面；企业入口用于从较小的业务骨架开发，真实企业 API 当前采用单实例 SQLite 部署。[企业资源与数据接入](operations/ENTERPRISE.md)说明演示数据和持久化业务数据的区别。

## 2. 上手：先运行一个应用

[快速上手](development/GETTING_STARTED.md)给出 Node/pnpm 版本、环境文件、演示账号及默认应用、企业项目、微前端的启动步骤。最短路径是在仓库根目录安装依赖，然后选择一个构建器：

```bash
pnpm install --frozen-lockfile
pnpm run dev:webpack
# 或 pnpm run dev:vite
```

这两个开发命令均启动前端与本地 API；浏览器地址以终端输出为准。只启动前端、接入真实租户、使用 GitHub 演示登录等场景，请按[快速上手](development/GETTING_STARTED.md#默认应用)配置。

## 3. 开发：找到业务扩展点

按[源码职责与扩展入口](development/SRC_DIRECTORY_GUIDE.md)定位 `app`、`features`、`platform`、`projects` 和 `api`。新增业务先看[业务模块](architecture/MODULES.md)与[路由、菜单和授权](architecture/USER_ROLE_PERMISSION.md)；跨项目复用或新建独立项目看[多项目与脚手架](development/MULTI_PROJECT.md)。组件开发看[Storybook](development/STORYBOOK.md)和[组件目录](components/COMPONENT_CATALOG.md)。项目、环境变量、路由和命令的当前清单见[生成参考](reference/PROJECT_REFERENCE.md)。

## 4. 测试：验证功能和工程契约

[质量门禁](development/QUALITY.md)解释单元测试、API 测试、Playwright 场景、类型与依赖边界检查，以及 CI 对应的报告。常用入口：

```bash
pnpm run test:coverage
pnpm run test:api
pnpm run test:tooling
pnpm run test:report
```

E2E 需要先构建对应应用，再运行 `pnpm run test:e2e` 或 `pnpm run test:e2e:vite`。Jest 覆盖率和各场景 Playwright 报告保存在被 Git 忽略的 `tests/reports/`；报告不会把浏览器测试计入 Jest 覆盖率。

## 5. 构建与部署：验证将要发布的产物

[应用构建](development/BUILD.md)说明 Webpack/Vite 配置、共享环境变量、统计图和 Sentry source map 上传。第一次发布可从[GitHub Pages 与 Vercel 部署实操](deployment/PAGES_VERCEL_GUIDE.md)开始；选择平台后阅读[部署与产物](deployment/DEPLOY.md)，再按目标使用[GitHub Pages](deployment/GITHUB_DEPLOYMENT.md)、[Vercel GitHub 登录](deployment/VERCEL_GITHUB_LOGIN.md)、[微前端部署](deployment/MFE_DEPLOYMENT.md)或[手动部署](deployment/MANUAL_DEPLOYMENT.md)。企业 API 的 SQLite 持久化和恢复要求见[Vercel 与 SQLite](deployment/VERCEL_SQLITE.md)及[恢复 runbook](runbooks/ENTERPRISE_RECOVERY.md)。

静态页面发布不会自动部署企业 API；项目应先针对目标构建、测试同一份产物，再上传或组合。构建分析报告写入 `artifacts/build/`，不随应用部署。

## 6. 深入架构：理解运行时行为

从[技术架构](architecture/ARCHITECTURE.md)阅读依赖方向和项目边界，再看[运行时链路与信任边界](architecture/ARCHITECTURE_RUNTIME.md)、[请求层](architecture/REQUESTS.md)、[安全通信实验室](architecture/SECURE_COMMUNICATION.md)、[用户角色权限](architecture/USER_ROLE_PERMISSION.md)、[RBAC 与独立审批](architecture/RBAC_RESOURCE_APPROVAL.md)、[企业账号登录验证器](operations/ENTERPRISE.md#企业账号登录验证器-totp)和[可观测性](operations/OBSERVABILITY.md)。仓库顶层配置的用途见[根目录文件职责](development/ROOT_DIRECTORY.md)；组件包发布见[组件库发布指南](deployment/LIBRARY_PUBLISH_GUIDE.md)。[架构决策](decisions/ADR-001-oidc-identity-and-tenant-roles.md)仍有待确认事项，[历史发布记录](releases/v5.1.0.md)不作为当前配置依据。

## 维护约定

修改配置或公开组件后运行 `pnpm run generate:docs`，再运行 `pnpm run check:docs` 和 `pnpm run check:component-catalog`。文档校验检查本地链接、标题锚点与命令名；行为是否与代码一致仍须结合构建和测试结果核对。历史发布记录保留当时语义，不作为当前配置依据。
