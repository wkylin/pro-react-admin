# 工程重构验证记录

验证日期：2026-10-11。记录对应本轮工程重构，包括应用层迁移、项目工具链、导航与授权响应、根实例隔离、企业资源、业务模块装配和部署配置。本记录反映本地验证，不表示远端 CI 或站点部署已完成，也不是线上监控结果。

## 已执行检查

| 范围              | 实际结果                                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| Jest              | 22 个 suite、67 个测试通过；本轮最终运行关闭 coverage，没有重新生成覆盖率报告    |
| 项目工具          | Node test runner 的 5 个测试通过                                                 |
| 类型              | 应用检查、strict 架构边界检查、strict UI 包检查通过                              |
| 代码质量          | ESLint 错误检查、src Prettier、Stylelint 通过                                    |
| 配置契约          | 项目注册表、别名、项目生成契约、部署生成契约、部署配置、导入边界通过             |
| 路由契约          | 63 个路由声明、50 个菜单项通过检查                                               |
| 默认应用浏览器    | 最终产物的 7 个场景各重复 5 次，35/35 通过                                       |
| 企业入口浏览器    | 最终产物的 6 个场景各重复 5 次，30/30 通过                                       |
| 微前端浏览器      | 最终产物的 2 个场景各重复 5 次，10/10 通过                                       |
| 项目产物          | default、enterprise、Shell、projectA、projectB 生产构建通过                      |
| 微前端组合        | Shell 与 2 个 Remote 按注册表组合；manifest 与独立 remoteEntry 容器检查通过      |
| Storybook         | 上一阶段生产构建通过，预览装配已使用应用 Store Provider；模块装配阶段未重跑      |
| GitHub Pages 组合 | 使用已有应用和 Storybook 产物组合通过；本轮再次组合最新应用产物                  |
| 文档              | 47 份项目文档的本地链接与命令检查、生成参考与组件目录一致性检查通过              |
| Docker            | 部署模板已提供；本机 daemon 未运行，镜像构建、Nginx 配置加载及容器健康检查未验证 |

UI 包源码本轮没有修改，执行了 strict 类型检查和导入边界检查；上一轮 UI 包构建、exports、消费 smoke 与打包体积结果不计入本轮新执行项。CI 配置包含这些检查，其远端结果需由 CI 确认。

## 行为覆盖

单测覆盖已有请求响应、取消与重试、加密失败隔离、身份切换和领域解码；新增回归覆盖双根 Store/KeepAlive 隔离、LRU 与定时器清理、实际参数路径、导航权限过滤、多个已挂载消费者同步撤权、跨标签页切号、demo 角色引用/唯一性/审计，以及 REST unknown parser 和列表并发。模块回归增加依赖 Provider 顺序、声明冲突与权限失败关闭、插槽选择、根实例状态和卸载清理，并验证通知数据不再共享全局 Store。

项目工具测试检查注册输出一致性、路径越界/重叠与端口冲突、Remote 地址覆盖、脚手架草案和固定应用别名。它没有穷举所有操作系统、所有项目扩展或第三方插件组合。

默认应用浏览器场景验证授权、拒绝访问、身份缓存隔离、首页 lazy Tab 与表单状态、Node 查询变化，部署流程页面，以及通知模块的 Header 插槽与 lazy 详情路由。企业场景验证用户 CRUD 和审计、角色引用保护、同页跨标签页撤权、移动布局，以及撤权后清除已缓存角色页面并保留仍授权的用户页面，并检查未启用通知模块的按钮与页面不存在。微前端验证真实 Remote 加载及 manifest 503 后的重试和降级。最终重复运行共 75/75 通过；没有对真实 RBAC、业务持久化或生产 OAuth 服务执行集成测试。

## 产物体积

默认应用与企业入口使用 production、PUBLIC_URL=/、关闭 sourcemap 的 Webpack stats。数据为原始 JS/CSS 字节，不是 gzip 大小、首次页面完整下载量或 Web Vitals。

| 指标                      |                      default |                 enterprise |
| ------------------------- | ---------------------------: | -------------------------: |
| 初始 entrypoint JS/CSS    |   2,992,273 bytes / 2.85 MiB | 2,808,754 bytes / 2.68 MiB |
| 全部 JS/CSS，包括异步资源 | 20,682,459 bytes / 19.72 MiB | 3,669,987 bytes / 3.50 MiB |
| stats 资源数              |                          210 |                         39 |
| 编译错误 / 警告           |                        0 / 1 |                      0 / 0 |

上一轮 default 初始 JS/CSS 为 3,488,157 bytes / 3.33 MiB，本轮继续下降约 14.2%。enterprise 的全部 JS/CSS 比展示应用少约 82.3%，主要来自独立路由树排除图表、媒体、编辑器等展示依赖；这不能解释为首屏提速 82.3%。相较模块装配前，默认初始入口增加 6,294 bytes，企业入口减少 14,992 bytes；通用装配有成本，排除未启用的通知插槽抵消了企业入口的这部分成本。两者初始产物仍超过 2 MiB，后续需要真实设备的 LCP/INP/CLS 和运行时下载数据指导优化。

默认应用的 1 项警告来自 3 个 MP3 和 1 个 MP4 超过 Webpack 媒体资源建议值，不属于 JS/CSS 预算。MFE Remote 构建仍有共享容器入口体积和内嵌 runtime 的建议提示；常规应用体积结果不能当作所有 Remote 都满足相同预算。

`config/bundle-budget.json` 收紧默认初始预算至 3.2 MiB、单 JS/CSS 资源至 3 MiB；enterprise 初始与单资源均为 3 MiB，全部 JS/CSS 为 5 MiB。两套最终 stats 均通过预算检查，异步资源也纳入检查。

## 执行环境与复现

本地 Node.js 为 v24.19.0。环境中的 pnpm 启动器异常，因此本次使用仓库已安装 CLI，没有调整 packageManager 或重新安装依赖。正常环境的命令见[质量门禁](QUALITY.md)、[构建](BUILD.md)与[企业入口](ENTERPRISE.md)。等价本地命令示例：

```bash
node node_modules/jest/bin/jest.js --runInBand --coverage=false
node --test scripts/*.test.mjs
node_modules/.bin/tsc6 --noEmit --project tsconfig.json
node_modules/.bin/tsc6 --noEmit --project tsconfig.strict-boundaries.json
node_modules/.bin/tsc6 --noEmit --emitDeclarationOnly false --project tsconfig.lib.json
node scripts/project-command.mjs build default --stats
node scripts/project-command.mjs build enterprise --stats
node scripts/check-bundle-budget.mjs compilation-stats.json
node scripts/check-bundle-budget.mjs compilation-enterprise-stats.json enterprise
node scripts/build-mfe.mjs
node scripts/validate-mfe-artifacts.mjs
node scripts/generate-project-reference.mjs --check
node scripts/generate-component-catalog.mjs --check
node scripts/validate-docs.mjs
```

本地未安装当前 Playwright 对应的 Chromium；临时配置选择系统 Chrome，并连接 5000/5090/5080 预览服务。断言使用仓库 spec，运行时阻止 service worker 干扰；临时配置不交付。CI 使用仓库配置安装 Chromium，本地通过不等于 CI 已执行。浏览器、本地服务与部分测试使用了沙箱外执行权限。

## 实现边界

企业 demo Provider 在每个应用根中独立保存数据，刷新后重置；演示角色编辑不改变真实登录权限。REST `/api/admin/...` 是前端接入契约，仓库 API helper 未实现这些业务接口。真实租户隔离、RBAC、停用会话、服务端事务审计与持久化仍需后端和集成验证。

根应用 strict 仍为 false，架构边界和 UI 包使用 strict 门禁。登录身份仍在当前 origin 共享，Module Federation 不提供不可信子应用沙箱。编译期业务模块契约 v1 已接入组织管理与通知；运行期插件、版本协商、语言注册、服务端状态缓存、运行时部署配置和 Tracking 生命周期专项尚未完成。对标依据与优先级见[开源产品对标](BENCHMARKS.md)。
