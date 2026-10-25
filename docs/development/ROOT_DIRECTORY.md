# 根目录文件职责

根目录仅保留工具按约定查找的配置、工作区入口、部署目标配置和项目说明。业务代码在 `src/`；Webpack/Vite 配置在 `build/`；跨构建器契约在 `config/`；一次性命令在 `scripts/`；镜像配置在 `deploy/`。新增业务模块不需要复制根目录配置。

下表列出仓库跟踪的根目录文件。本机的 `.env.local`、`.env.development.local`、`.vercel/`、`.delta/`、`node_modules/` 和 `.DS_Store` 不属于仓库配置，不应提交或在整理时删除用户数据。

| 文件                                       | 作用与使用入口                                 |
| ------------------------------------------ | ---------------------------------------------- |
| `.deepsource.toml`                         | DeepSource 扫描服务读取；不参与本地构建。      |
| `.editorconfig`                            | 编辑器统一缩进和换行。                         |
| `.env`                                     | 各模式共用的公开演示默认值。                   |
| `.env.development.local.example`           | 本地开发变量示例，不直接加载。                 |
| `.env.enterprise.production.local.example` | 企业 API 与 Compose 生产变量模板。             |
| `.env.production`                          | 生产构建的公开配置与 Sentry 项目标识。         |
| `.env.production.local.example`            | 本地生产覆盖与上传凭据示例，不直接加载。       |
| `.gitignore`                               | 排除依赖、产物、缓存与本地凭据。               |
| `.markdownlint.json`                       | `markdownlint` 的规则。                        |
| `.markdownlintignore`                      | 排除生成内容与依赖目录。                       |
| `.npmrc`                                   | 固定包管理器 registry 与 Node engine 检查。    |
| `.prettierignore`                          | 全仓格式化时排除生成目录。                     |
| `.prettierrc`                              | Prettier 规则与 Tailwind 插件。                |
| `.stylelintrc.json`                        | CSS/Less 的 Stylelint 规则。                   |
| `.versionrc.json`                          | `standard-version` 发布与变更日志规则。        |
| `CHANGELOG.md`                             | 版本历史，由发布命令更新。                     |
| `CONTRIBUTING.md`                          | 仓库贡献说明。                                 |
| `LICENSE`                                  | 仓库许可证。                                   |
| `NPM_README.md`                            | UI 组件包的使用说明。                          |
| `README.md`                                | 工作区入口与常用命令。                         |
| `SECURITY.md`                              | GitHub 安全问题报告约定。                      |
| `babel.config.cjs`                         | Webpack、Storybook 和 Jest 的 Babel 转换。     |
| `compose.enterprise.yaml`                  | 企业 API、SQLite 卷和 Caddy 网关。             |
| `eslint.config.js`                         | ESLint 规则。                                  |
| `package.json`                             | 工作区依赖、脚本及应用元数据。                 |
| `pnpm-lock.yaml`                           | 锁定安装结果，CI 使用 frozen lockfile。        |
| `pnpm-workspace.yaml`                      | 工作区成员与 pnpm 配置。                       |
| `postcss.config.js`                        | Webpack/Vite 共用的 PostCSS 配置。             |
| `qodana.yaml`                              | Qodana GitHub Actions 的扫描配置。             |
| `skills-lock.json`                         | 仓库 Agent 技能版本记录；不参与应用构建。      |
| `sonar-project.properties`                 | `pnpm run scanner` 的 Sonar 项目与覆盖率配置。 |
| `tsconfig.api.json`                        | 企业 API 类型检查。                            |
| `tsconfig.json`                            | 应用类型检查。                                 |
| `tsconfig.lib.json`                        | 组件库类型声明与类型检查。                     |
| `tsconfig.paths.json`                      | TypeScript 路径别名的共享底座。                |
| `tsconfig.storybook.json`                  | Storybook 类型检查。                           |
| `tsconfig.strict-boundaries.json`          | 核心架构边界的严格类型检查。                   |
| `vercel.json`                              | 默认应用的 Vercel 构建与响应头。               |
| `vercel.mfe.json`                          | 聚合微前端的 Vercel 构建与响应头。             |
| `vercel.projectA.json`                     | ProjectA 独立部署目标。                        |
| `vercel.projectB.json`                     | ProjectB 独立部署目标。                        |
| `vercel.shell.json`                        | Shell 独立部署目标。                           |
| `vercel.storybook.json`                    | Storybook 独立部署目标。                       |

`build-ci.yml` 验证 Webpack 与 Vite 两套构建；`deploy-gh-pages.yml` 发布聚合 Pages 产物。静态镜像和 API 镜像分别使用各自 Dockerfile 旁的 `.dockerignore`。`SENTRY_AUTH_TOKEN` 只从环境变量读取；仓库不保存 Sentry 认证文件。

## 根目录子目录

| 目录                            | 作用                                                    |
| ------------------------------- | ------------------------------------------------------- |
| `.agents/`、`agent/`、`.qoder/` | Agent 技能的不同工具格式及 Qoder 链接；不参与应用构建。 |
| `.github/`                      | CI、Pages、发布和安全扫描工作流。                       |
| `.husky/`                       | 提交前运行 lint-staged。                                |
| `.storybook/`                   | Webpack/Vite Storybook 配置和专用支持组件。             |
| `.vscode/`                      | 可选的编辑器启动与工作区设置。                          |
| `api/`                          | 企业 API 与持久化业务服务。                             |
| `build/`                        | Webpack/Vite 配置、HTML 入口及共享构建辅助代码。        |
| `config/`                       | 项目注册表及跨构建器规则。                              |
| `deploy/`                       | 静态站点、企业 API 镜像和网关配置。                     |
| `docs/`                         | 按开发、架构、组件、运维、部署和参考分组的项目说明。    |
| `packages/`                     | 可独立发布的 UI 组件包。                                |
| `public/`                       | 不经模块打包的图标、语言包等静态资源。                  |
| `scripts/`                      | 开发、校验、构建和部署命令的实现。                      |
| `src/`                          | 应用和共享业务源码。                                    |
| `tests/`                        | 单测基础设施、E2E 用例与配置、测试报告总览生成器。      |
| `typings/`                      | 全局及第三方模块类型声明。                              |

`artifacts/`、`dist*/`、`tests/reports/`、`storybook-static*/` 为本地产物目录，均被 Git 忽略。`node_modules/` 是依赖安装目录。根目录不再保留失效的 cspell 词典、临时 Storybook 调试夹具和一次性图标迁移脚本。
