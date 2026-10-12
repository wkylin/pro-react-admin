# 项目文档

本文档集按当前源码重建。重复的权限迁移、加密入门和构建优化文章已合并到下面的维护入口；历史版本变化保留在根目录 CHANGELOG.md。

| 主题                                                      | 文档                                     |
| --------------------------------------------------------- | ---------------------------------------- |
| 默认/企业/多项目/微前端预览、lib 构建、真实登录与权限设置 | [快速上手](GETTING_STARTED.md)           |
| 开源产品对标与产品差距                                    | [开源对标](BENCHMARKS.md)                |
| 企业入口、用户/角色/审计与 REST 接入                      | [企业资源](ENTERPRISE.md)                |
| 模块路由、Provider、资源目录与插槽                        | [业务模块](MODULES.md)                   |
| 架构与剩余演进工作                                        | [技术架构](ARCHITECTURE.md)              |
| 目录职责与依赖规则                                        | [源码目录](SRC_DIRECTORY_GUIDE.md)       |
| 权限、路由、菜单契约                                      | [身份与授权](USER_ROLE_PERMISSION.md)    |
| Axios / Fetch、错误、取消、并发                           | [请求层](REQUESTS.md)                    |
| 可选加密协议与兼容限制                                    | [请求加密](REQUEST_ENCRYPTION.md)        |
| Express、租户/RBAC、审计、OAuth、埋点                     | [API](API.md)                            |
| 埋点 SDK                                                  | [Tracking](TRACKING_SDK_ARCHITECTURE.md) |
| Webpack、环境、体积预算                                   | [构建](BUILD.md)                         |
| 静态部署、缓存、PWA                                       | [部署](DEPLOY.md)                        |
| 手动 Actions、本地 Pages、Vercel、Release、核验与回退     | [手动部署](MANUAL_DEPLOYMENT.md)         |
| Vercel 演示登录、SQLite 持久 API、Docker 与 HTTPS         | [Vercel / SQLite](VERCEL_SQLITE.md)      |
| GitHub Pages 各应用、Storybook 与 v5 标签/Release         | [GitHub 部署](GITHUB_DEPLOYMENT.md)      |
| 构建时项目选择                                            | [多项目](MULTI_PROJECT.md)               |
| Shell、Remote、manifest 与降级                            | [微前端](MFE_DEPLOYMENT.md)              |
| ESLint、类型、单测、浏览器回归                            | [质量门禁](QUALITY.md)                   |
| Story 与 MDX                                              | [Storybook](STORYBOOK.md)                |
| 组件库打包与发布                                          | [组件库](LIBRARY_PUBLISH_GUIDE.md)       |
| 表格数据接入                                              | [ResponsiveTable](RESPONSIVE_TABLE.md)   |
| 编辑器、视频、电子书、SVG、图表                           | [应用组件](UI_COMPONENTS.md)             |
| 媒体预处理                                                | [FFmpeg](FFMPEG_INSTALLATION.md)         |
| Sentry 与运行时日志                                       | [可观测性](OBSERVABILITY.md)             |
| 版本、路由、环境变量、全部命令                            | [自动生成参考](PROJECT_REFERENCE.md)     |
| 应用组件与 npm 组件边界                                   | [自动生成目录](COMPONENT_CATALOG.md)     |
| 本次本地验证结果与范围                                    | [验证记录](VALIDATION.md)                |

修改配置或公开组件后运行 `pnpm run generate:docs`，再运行 `pnpm run check:docs` 和 `pnpm run check:component-catalog`。生成文档检查不能代替人工核对接口行为；本地链接检查不访问外部网站，也不验证页内锚点。
