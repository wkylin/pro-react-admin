# 项目文档

这套文档按当前 `main` 分支的代码组织。新增业务通常从[快速上手](development/GETTING_STARTED.md)、[源码目录](development/SRC_DIRECTORY_GUIDE.md)和[业务模块](architecture/MODULES.md)开始；构建器选择、测试与报告在 `development/`，部署路径在 `deployment/`。

| 目录                                                             | 内容                                                             |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [development](development/GETTING_STARTED.md)                    | 本地开发、Webpack/Vite 构建、Storybook、项目注册、测试与质量门禁 |
| [architecture](architecture/ARCHITECTURE.md)                     | 系统架构、模块、请求层、授权与运行时边界                         |
| [components](components/UI_COMPONENTS.md)                        | 应用组件、组件库目录和具体组件实现                               |
| [operations](operations/API.md)                                  | 企业 API、持久化业务服务、Sentry 与运行时观测                    |
| [deployment](deployment/DEPLOY.md)                               | 静态站点、企业服务、微前端、Pages、Vercel 与 npm 发布            |
| [reference](reference/PROJECT_REFERENCE.md)                      | 从项目注册表和 `package.json` 生成的版本、变量、路由与命令清单   |
| [decisions](decisions/ADR-001-oidc-identity-and-tenant-roles.md) | 尚待确认的架构决策                                               |
| [runbooks](runbooks/ENTERPRISE_RECOVERY.md)                      | 企业数据库升级与恢复门禁                                         |
| [releases](releases/v5.1.0.md)                                   | 已发布版本的历史记录                                             |

常用入口：[构建与统计](development/BUILD.md)、[测试与报告](development/QUALITY.md)、[根目录职责](development/ROOT_DIRECTORY.md)、[手动部署](deployment/MANUAL_DEPLOYMENT.md)、[可观测性](operations/OBSERVABILITY.md)。

## 维护约定

修改配置或公开组件后运行 `pnpm run generate:docs`，再运行 `pnpm run check:docs` 和 `pnpm run check:component-catalog`。文档校验检查本地链接、标题锚点与命令名；行为是否与代码一致仍须结合构建和测试结果核对。历史发布记录保留当时语义，不作为当前配置依据。
