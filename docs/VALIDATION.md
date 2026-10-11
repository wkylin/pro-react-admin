# 工程重构验证记录

## 2026-10-12 Storybook、GitHub 部署与 Release 准备

本阶段修复 Storybook 的 React Refresh 配置和类型运行时导入，补齐源码 stories、Pages 多场景构建、Vercel 独立组件站产物、部署指南与应用 Release workflow。此前企业 API 和浏览器结果保留在下一阶段记录中，不视为本次重新执行。

| 范围               | 本次实际结果                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Storybook 转译回归 | 未注入 Refresh 全局变量；应用开发模式仍保留 Refresh；Less Modules 默认导出回归通过                                       |
| UI 覆盖            | 157 个直接 UI 入口全部有源码旁 story，新增 149 个 story 文件                                                             |
| Storybook 静态产物 | 完整生产构建通过；367 个 story/docs 条目；每个 UI 入口均进入实际索引                                                     |
| Pages 全场景       | default、enterprise、普通 projectA/projectB、Shell、两 Remote、Storybook 共 8 份入口构建通过                             |
| Pages 部署契约     | HTML 本地资源存在、manager/iframe 子路径 base 正确、Host HTTPS Remote URL 正确、两个独立 Remote 容器与 manifest 校验通过 |
| Vercel Storybook   | 从域名根 Storybook 产物生成独立 Build Output API 目录，不覆盖后台应用关联；尚未上传                                      |
| 工程工具           | 16/16（含新增 Babel、CSS Modules、Pages Fork 路径/自定义域名/非法参数回归）                                              |
| Jest               | 27 suites、83 项全部通过；新增命令式 Watermark 多容器与卸载清理回归                                                      |
| 类型               | 根应用/Storybook、strict 架构边界、strict API、strict UI 包通过                                                          |
| 静态质量           | 本阶段源码、stories、配置与脚本 ESLint 错误检查；生成文档、组件目录、链接/命令和格式检查通过                             |
| 预算               | 默认入口 2.88 / 3.20 MiB，企业入口 2.70 / 3.00 MiB、企业全部 JS/CSS 3.52 / 5.00 MiB，均通过                              |
| 其它契约           | aliases、63 路由/50 菜单、导入边界、MFE 源契约、既有 Vercel 配置均通过                                                   |

Storybook 仍有大 chunk/entrypoint 的性能提示，组件站总目录约 180 MiB（含媒体和编辑器/图表依赖）；这些不是后台首屏体积，也没有进行新设备 LCP/INP/CLS 测量。少数媒体、Sandpack、IP 示例依赖第三方网络。

本机 Jest CLI 入口被 Console Ninja 扩展注入，运行时尝试访问 IDE loopback 服务，在沙箱内返回 EPERM。最终通过 Jest 官方 API 运行相同配置和全部测试，没有修改依赖文件：

```bash
node --input-type=module -e "import {run} from 'jest'; await run(['--runInBand','--coverage=false'])"
```

本阶段 Storybook dev server 与 Chrome 无法在当前沙箱启动；申请升级权限时自动审批服务返回 403，操作未执行。远端 git 核验与 `git add` 同样被自动审批服务阻断。本次改动尚未暂存、提交、推送、打应用标签或部署；用户已选择在本机按 [GitHub 部署指南](GITHUB_DEPLOYMENT.md)执行发布命令。浏览器交互和线上结果尚未验证，构建和静态检查通过不能表述为已上线。没有重新执行需要 loopback 服务的企业 HTTP/浏览器检查。

## 2026-10-11 企业服务阶段

验证日期：2026-10-11。本轮补齐真实企业服务、租户登录、会话隔离和资源缓存，以下为本地执行结果；没有推送、生产发布或远端 CI 结果。

## 实际检查结果

| 范围           | 结果                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ |
| Jest           | 26 个 suite、81 项测试通过；未重新生成 coverage                                                  |
| 企业 HTTP 集成 | 12/12，真实 Express 与临时持久化 SQLite                                                          |
| 工程工具       | 11/11，注册表/脚手架和真实 Webpack 进度回归                                                      |
| 实际启动       | 显式 bootstrap CLI → api/server.js → 租户登录 → 当前权限通过；临时数据库已清理                   |
| 类型           | 根应用、strict 架构边界、strict 业务后端、strict UI 包通过                                       |
| 代码质量       | 修改范围 ESLint 错误检查、全 src Prettier、新增 API/脚本/测试格式检查通过；git diff --check 通过 |
| 契约           | 项目、别名、路由/菜单、导入边界、MFE/部署生成契约、Vercel 配置、文档与组件目录通过               |
| 默认展示浏览器 | 7 个场景各重复 5 次，35/35                                                                       |
| 企业演示浏览器 | 6 个场景各重复 5 次，30/30                                                                       |
| 真实企业浏览器 | 3 个场景各重复 5 次，15/15；真实后端、登录、CRUD、刷新持久化、审计和租户切换                     |
| 生产构建       | default、enterprise 演示、enterprise 真实模式通过，JS/CSS 预算通过                               |

路由契约保持 63 路由/50 菜单；文档链接与命令检查覆盖 47 文档。没有新增数据库依赖或更改 lockfile。Storybook、UI 包产物、MFE 产物/浏览器、Docker、生产 OAuth/SSO 本轮未重新验证，不将此前结果计入本轮。

## 行为与证据范围

实际 API 启动后还验证了跨域预检：可信 origin 返回精确 origin、credentials:true 和请求 headers，未知 origin 没有 Access-Control-Allow-Origin。该 smoke 覆盖独立后端与 Axios 默认凭据模式的兼容。

后端 HTTP 测试覆盖跨租户列表/记录/写入/审计、伪造 tenant header、直接越权、权限提升、有效会话下的角色撤权、停用/删除/密码/注销/过期规则、最后管理员与角色引用保护、输入/排序注入、持久化重开、登录限速。注入审计插入失败后，账号状态和会话撤销一起回滚；异步密码哈希期间撤销操作者会话，待处理写入不能提交。审计表 UPDATE/DELETE 被数据库触发器拒绝。

Jest 覆盖同键请求共享、独立消费者取消、全取消后重试、TTL/失败恢复、相关资源失效、忽略取消的旧响应、身份切换、响应相关 headers 隔离、StrictMode effect replay 与最终销毁；旧会话 401 不能清理新会话，外部凭据的 401 也不能退出当前身份，无效企业会话不能恢复残留 GitHub 身份。

真实浏览器不 mock 企业 API，使用测试专用临时数据库和 loopback Express。默认/演示回归保留已有 lazy Tab、表单缓存、模块插槽、跨标签页撤权、角色引用和移动布局。默认与企业入口共 80/80 次重复浏览器检查通过。MFE 的 SessionScope 改动通过类型检查，但本轮没有重新执行 MFE 产物及浏览器流程。

## 产物测量

PUBLIC_URL=/、production、关闭 sourcemap。数据为 Webpack stats 原始 JS/CSS，不是 gzip 下载量或 LCP/INP/CLS。

| 指标            |                      default |            enterprise 演示 |            enterprise 真实 |
| --------------- | ---------------------------: | -------------------------: | -------------------------: |
| 初始 JS/CSS     |   3,015,359 bytes / 2.88 MiB | 2,831,944 bytes / 2.70 MiB | 2,831,960 bytes / 2.70 MiB |
| 全部 JS/CSS     | 20,666,101 bytes / 19.71 MiB | 3,686,847 bytes / 3.52 MiB | 3,686,863 bytes / 3.52 MiB |
| stats 资源数    |                          208 |                         39 |                         39 |
| 编译错误 / 警告 |                        0 / 1 |                      0 / 0 |                      0 / 0 |

默认初始预算 3.2 MiB，企业初始 3 MiB、全部 5 MiB，均通过。默认警告仍来自超过建议值的媒体资源。相较前一架构阶段的 default 2,992,273 / enterprise 2,808,754 bytes，初始体积分别增加约 23 KiB / 23 KiB；增加真实认证、会话范围和缓存能力有成本，未通过放宽预算隐藏。首屏仍超过 2 MiB，真实设备性能需继续测量。

测量产物在最终业务实现上生成；随后仅收紧日志输出和无效会话恢复的边界，并通过类型/Jest 回归，未因这些小改重新采集 stats。

## 执行环境与复现

本机 Node.js v24.19.0，使用仓库已安装 CLI；未改变 packageManager。正常环境使用[质量门禁](QUALITY.md)中的 pnpm 命令。等价验证：

```bash
node node_modules/jest/bin/jest.js --runInBand --coverage=false
node --test scripts/*.test.mjs
node --test api/enterprise/*.test.mjs
node_modules/.bin/tsc6 --project tsconfig.api.json
node_modules/.bin/tsc6 --project tsconfig.strict-boundaries.json
node_modules/.bin/tsc6 --project tsconfig.json
node_modules/.bin/tsc6 --noEmit --emitDeclarationOnly false --project tsconfig.lib.json
REACT_APP_USE_MOCK=false PUBLIC_URL=/ SENTRY_SOURCE_MAP=no node scripts/project-command.mjs build enterprise --stats
node scripts/check-bundle-budget.mjs compilation-enterprise-stats.json enterprise
```

本机未安装当前 Playwright 对应 Chromium，临时配置使用系统 Chrome；CI 配置使用 Chromium，不能将本机通过等同远端通过。真实模式使用 playwright.enterprise-api.config.ts 和 scripts/serve-enterprise-test.mjs。两种企业模式共用 dist-enterprise，须依次构建/验证，不能测试时覆盖产物。API/browser/tooling 的 loopback 访问在沙箱外执行，本地服务已停止，测试数据库已删除。

## 当前实现限制

企业后端适合单实例 Node 24 自托管、持久卷 SQLite；不能部署到 Vercel 临时文件系统。审计是同事务追加记录，数据库管理员可绕过触发器，不是外部防篡改/合规认证。前端资源缓存位于浏览器内存，尚无服务端/分布式查询缓存、后台刷新或实时撤权推送。

根 strict 仍为 false，业务后端新增独立 strict 门禁；CommonJS HTTP adapter 和其它 legacy helper 尚未全部类型化。当前 origin 只有一个活动身份，支持注销换租户，不支持一个身份的跨租户成员关系/并行身份。SSO/MFA/邀请/密码找回、组织层级、迁移/备份、运行期插件与兼容协商继续待办，见[架构](ARCHITECTURE.md)和[对标](BENCHMARKS.md)。
