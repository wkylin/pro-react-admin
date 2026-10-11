# 架构重构验证记录

验证日期：2026-10-11。记录对应本次本地工作区实现；不是已提交版本、线上监控结果或 GitHub Actions 执行记录。

## 已执行检查

| 范围           | 实际结果                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| Jest           | 14 个 suite、39 个测试通过，同时生成 V8 coverage                                   |
| 类型           | 应用检查、strict 架构边界检查、strict UI 包检查通过                                |
| 代码质量       | ESLint 错误检查、src Prettier、Stylelint 通过                                      |
| 配置契约       | 项目注册表、别名、项目生成契约、部署配置、导入边界通过                             |
| 路由契约       | 60 个路由声明、46 个菜单项通过 AST 检查                                            |
| 默认应用浏览器 | 最终产物的全部 6 个场景各重复 5 次，30/30 通过                                     |
| 微前端浏览器   | 2 个场景通过，随后各重复 5 次，10/10 通过                                          |
| 微前端产物     | Shell、projectA、projectB 构建和组合通过；manifest 与独立 remoteEntry 容器检查通过 |
| 跨项目缓存     | 连续 Shell → projectA → projectB → Shell 构建通过，Shell 路由不再混入默认应用      |
| Storybook      | 生产构建通过，组件 MDX 绑定已有 stories                                            |
| UI 包          | ESM/CJS、声明构建、12 个公开组件及 59 个 exports 目标检查通过                      |
| UI 包消费      | ESM/CJS 根入口与 12 个组件子路径 smoke 通过                                        |
| UI 包体积      | 53 个文件，约 0.05 MiB packed、0.17 MiB unpacked，通过预算                         |
| 文档           | 41 份项目文档的本地链接与命令检查、生成参考一致性及格式检查通过                    |

单测覆盖请求响应、取消与重试、加密失败隔离、权限失败撤权及身份切换、领域数据解码和浏览器环境变量注入。最新增加的身份回归先复现了残留 GitHub 资料及同一资料下更换凭据复用旧授权的问题，再验证凭据绑定修复。coverage 只反映本次测试加载的模块，不能据此声明全仓覆盖率。

默认浏览器场景验证授权、拒绝访问、账户缓存隔离、首页 lazy Tab 与联系表单状态、Node 查询变化，以及部署流程页面。微前端验证真实 Remote 加载及 manifest 503 后两次重试和降级；没有对真实业务授权服务器或生产 OAuth 服务执行集成测试。

## 入口体积

相同默认项目、production、PUBLIC_URL=/、关闭 sourcemap 的 Webpack stats：

| 指标                   | 重构前   | 重构后   |
| ---------------------- | -------- | -------- |
| 初始 entrypoint JS/CSS | 5.89 MiB | 3.33 MiB |

约下降 43%，主要来自首页和作品集按路由加载，以及 Tabs 不再同步引用首页。这里统计原始 JS/CSS 入口产物，不是 gzip 大小、整个首页实际下载量或 Web Vitals；页面首次进入还会请求异步资源，PWA 也有自己的缓存行为。

预算收紧为初始 entrypoint 4 MiB、单个 JS/CSS 资源 3 MiB。检查同时覆盖异步 chunk；使用超限异步资源的临时 stats 验证过门禁会失败。生产 stats 显式列出缓存资源，避免折叠分组遗漏检查。

最终 stats 列出 199 个资源，无折叠分组；初始 JS/CSS 为 3,488,157 bytes。构建无错误，保留 1 项媒体体积警告：3 个 MP3 和 1 个 MP4 超过 Webpack 的 3 MiB 建议值；它们不属于上述 JS/CSS 门禁。

## 执行环境与复现

本地 Node.js 为 v24.19.0。环境中的 pnpm 启动器异常，因此本次使用仓库已安装的 CLI 执行对应检查，没有调整 packageManager 或重新安装依赖。例如：

```bash
node node_modules/jest/bin/jest.js --runInBand
node_modules/.bin/tsc6 --noEmit --project tsconfig.json
node_modules/.bin/tsc6 --noEmit --project tsconfig.strict-boundaries.json
node_modules/.bin/tsc6 --noEmit --emitDeclarationOnly false --project tsconfig.lib.json
node scripts/validate-route-contract.mjs
node scripts/generate-project-reference.mjs --check
node scripts/validate-docs.mjs
node scripts/check-bundle-budget.mjs
```

本地未安装当前 Playwright 对应的 Chromium；使用临时配置选择系统 Chrome、连接本地 5000/5080 预览服务。测试断言仍使用仓库中的 spec；临时配置不交付。CI 使用仓库 Playwright 配置并安装 Chromium，其执行结果需由 CI 确认。本地测试需要启动浏览器并连接本机服务，部分命令使用了沙箱外执行权限。

正常环境的维护命令见[质量门禁](QUALITY.md)、[构建](BUILD.md)、[组件库](LIBRARY_PUBLISH_GUIDE.md)和[微前端](MFE_DEPLOYMENT.md)。

## 实现范围

请求公共核心与业务边界已采用 TypeScript，遗留 Axios/Fetch 适配器仍为 JavaScript；根应用 strict 仍为 false。仓库环境模板仍显式开启 mock，真实部署必须提供权限接口并关闭 mock。Tracking 生命周期和传输兼容问题保留在[架构演进](ARCHITECTURE.md)与[Tracking 指南](TRACKING_SDK_ARCHITECTURE.md)。本次没有发布 npm 包、提交代码或部署站点。
