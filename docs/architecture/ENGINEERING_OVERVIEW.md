# 工程导览

这页用于快速判断 Pro React Admin 是否适合自己的管理后台，以及从哪里开始修改。仓库包含展示应用、精简企业入口、项目注册、组件库和可选的业务 API。业务领域模型、身份提供方与运维目标仍需由实际项目定义。详细实现见[技术架构](./ARCHITECTURE.md)，逐步运行见[快速上手](../development/GETTING_STARTED.md)。

## 从需求到应用

| 关心的问题         | 当前工程入口                                                                                                                                                                                      | 如何核对                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 应用从哪里来       | [项目注册表](../../src/projects/registry.json)登记 `default`、`enterprise`、`projectA`、`projectB`、`shell` 的入口和输出；[项目解析](../../config/project-registry.mjs)供开发、构建和部署脚本共用 | `pnpm run project:list`、`pnpm run project:doctor`                                                   |
| 业务放在哪里       | [业务模块](../../src/features/administration/module.ts)及其路由、Provider 和页面位于 `src/features/`；[应用装配](../../src/app/modules/default.ts)决定默认项目启用的模块                          | [源码职责](../development/SRC_DIRECTORY_GUIDE.md)、[模块契约](./MODULES.md)                          |
| 页面如何取数和授权 | [数据 Provider](../../src/platform/data/provider.ts)定义资源接口，[路由策略](../../config/route-policy.json)维护菜单和权限；演示 Provider 与真实企业 API 分开                                     | `pnpm run check:route-contract`、[企业资源](../operations/ENTERPRISE.md)                             |
| 如何选择构建器     | [Webpack 配置](../../build/webpack/webpack.common.js)与 [Vite 配置](../../build/vite/app.config.ts)编译同一份应用源码；浏览器变量经[统一读取层](../../src/platform/config/env.ts)访问             | `pnpm run build:webpack`、`pnpm run build:vite`                                                      |
| 如何确认产物       | [Jest 配置](../../tests/unit/config.cjs)、[Playwright 配置](../../tests/e2e/config/app.config.ts)和[CI](../../.github/workflows/build-ci.yml)分别检查源码、浏览器流程和构建                       | `pnpm run test:coverage`、构建后运行 `pnpm run test:e2e:vite`、[质量门禁](../development/QUALITY.md) |
| 如何发布           | [Pages 工作流](../../.github/workflows/deploy-gh-pages.yml)组合公开演示，[Vercel 配置](../../vercel.json)用于默认应用；企业 API 需要单独的持久化部署                                              | [部署与产物](../deployment/DEPLOY.md)、[手动部署](../deployment/MANUAL_DEPLOYMENT.md)                |

## 这套工程提供什么

**两种构建器，一份业务实现。** Webpack 和 Vite 共用项目注册、源码入口、浏览器变量白名单与业务代码。应用、Storybook 和 UI 包均有各自的构建器命令；输出目录、插件和统计格式仍按构建器区分。[构建指南](../development/BUILD.md)列出命令、产物和分析图。默认发布脚本仍按其目标选择构建方式，切换发布构建器需要核对目标产物。

**从演示到真实业务有明确边界。** 默认展示应用提供浏览器演示账号与内存演示数据，适合体验界面和权限；精简企业入口可对接 `api/enterprise/` 的租户身份、服务端授权、SQLite 持久化和事务审计。演示角色编辑不会改变测试账号的登录权限。真实服务当前面向单实例，跨实例事件一致性、OIDC/SSO 和完整账号运营仍待实现。参见[企业资源](../operations/ENTERPRISE.md)与[当前能力和边界](./ARCHITECTURE.md#当前能力与边界)。

**扩展点与检查同处一条开发路径。** 新业务通常先建 `src/features/<领域>/`，声明模块路由、资源和 Provider，再由目标应用选择模块；菜单、标题和权限元数据进入 `config/route-policy.json`。`check:import-boundaries`、`check:route-contract`、类型检查与对应测试约束依赖方向和访问策略。完整步骤分别见[源码职责](../development/SRC_DIRECTORY_GUIDE.md)、[模块契约](./MODULES.md)和[质量门禁](../development/QUALITY.md)。

## 在本地走通一次

要求 Node.js >=24.15.0 且 <25、pnpm 11.5.2。已安装依赖后，选择 Vite 体验完整开发与验证链路：

```bash
pnpm run project:doctor
pnpm run dev:vite
```

停止开发服务后，构建并测试对应产物：

```bash
pnpm run test:coverage
pnpm run build:vite
pnpm run test:e2e:vite
pnpm run test:report
```

`dev:vite` 同时启动本地 API；登录和端口说明见[快速上手](../development/GETTING_STARTED.md#默认应用)。`test:e2e:vite` 验证 `dist-vite`，测试报告在 `tests/reports/`。选择 Webpack 时使用 `dev:webpack`、`build:webpack` 和 `test:e2e`；构建统计、Storybook、组件包和多项目的完整矩阵见[应用构建](../development/BUILD.md)、[Storybook](../development/STORYBOOK.md)与[多项目](../development/MULTI_PROJECT.md)。发布前还需按目标执行[质量门禁](../development/QUALITY.md)和[部署指南](../deployment/DEPLOY.md)。
