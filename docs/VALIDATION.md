# 工程重构验证记录

## 2026-10-12 ShootingStars 空白预览修复

原组件使用 window.innerWidth / innerHeight 生成和移除流星，Storybook 内的 SVG 比窗口小，流星可能出现在预览范围之外；左右边缘的纵坐标还错误地按窗口宽度生成。所有实例共用 gradient ID，定时生成任务在更新或卸载时也没有取消。

现在按 SVG 实际宽高计算四个边缘的起点和移动边界，ResizeObserver 同步尺寸，隐藏区域等待有尺寸后再生成；每个实例使用独立渐变 ID。统一管理流星生成与动画帧，帧间隔修正移动距离，流星离开区域后停止动画帧，参数更新和卸载清理定时器、观察器与事件。示例增加明确高度的深色区域、较长尾迹、较短间隔及操作说明，新增 Warm Colors / Compact。

8 项回归在修复前失败、修复后全部通过，覆盖窗口大于容器时四边起点都在 SVG 范围内、流星移动/离开、渐变隔离、零尺寸恢复/缩放、参数变化及卸载清理；Storybook/根应用类型、修改范围 ESLint 和 stories 覆盖通过。浏览器核验命令被自动审批服务 403「内容审计命中风险规则」拦截，命令未执行，本次没有真实浏览器视觉复核结果；未重新构建生产产物或发布。

## 2026-10-12 ScrollProgressBar 容器定位修复

ScrollArea 原先将进度条设为 relative，条形会随内容滚出区域；FixTabPanel 原先设为 fixed，位置参照页面顶端而非面板。现在两者默认 sticky，将进度条保持在自身滚动容器的顶部；负 margin 抵消条形高度，避免给内容增加滚动高度，pointer-events: none 保留底层交互。滚动容器 ref 保持稳定，独立 ScrollProgressBar 仍默认 fixed，显式 position 可以覆盖默认值。同步修正 sticky 使用示例与组件说明。

旧实现的容器定位回归失败，修复后 5 项组件测试通过。使用真实 Motion 验证两个区域相互独立、0%→50%→100%→0% 的双向滚动、无需滚动时为零及隐藏；还验证 FixTabPanel 的 ref、onScroll 与进度绑定实际面板节点。Storybook/根应用类型、strict 架构边界、修改范围 ESLint 和 stories 覆盖通过。顶部进度为零时条形宽度为零，不将这种状态当作渲染失败。

浏览器测量命令被自动审批服务 403「内容审计命中风险规则」拦截，命令未执行，因此本次尚无滚动前后位置的浏览器实测；组件测试中的 sticky 样式和滚动进度验证不等同于视觉复核。本轮未重新构建生产产物或发布。

## 2026-10-12 TransferHistory 分支箭头与展开图标修复

用户截图中的公司分支箭头缺失，源于 Less 将 `.subItemLine` 嵌套为 `.subItemContainer` 的子元素选择器，但 JSX 将两者放在同一个元素上。现在使用 `&.subItemLine`，分支箭头、短连接线与末行间距规则都能匹配实际结构。展开按钮原先仅有空的 `<i>` 和旧版 anticon class，改用真实的 DownOutlined / UpOutlined SVG，并同步 aria-expanded。

挂载后的 effect 还会清空已绑定的公司 refs，造成主连接线保留 100% 高度并延伸至展开按钮。现在保留 refs，统一按首末可见公司的中心测量高度，在展开、收起、默认数量或尺寸变化时重新测量，并清理待执行帧和 ResizeObserver。新增 Single Company / All Companies 示例，默认示例可调整显示数量。

3 项组件回归在修改前失败、修改后通过，覆盖真实 SVG、展开/收起、初始连接线高度、默认数量变化与卸载清理。Less 实际编译后，分支 DOM 匹配箭头与短线的伪元素选择器，三角形边框和线段宽度检查通过；Storybook/根应用类型、修改范围 ESLint、Stylelint 和 stories 覆盖通过。浏览器复现命令被自动审批服务 403「内容审计命中风险规则」拦截，未执行，因此本次没有浏览器视觉复核结果，也没有重新构建生产产物或发布。

## 2026-10-12 MagicTrail 空白预览修复

在 Chrome 复现默认示例空白：正常父容器的鼠标事件无法触发轨迹，直接向覆盖层派发事件才能绘制。原组件在省略 `containerRef` 时监听了 `pointer-events: none` 的覆盖层，而粒子绘制代码被注释。颜色透明度拼接也只适用于完整十六进制颜色。

现在默认监听父容器，保留显式 ref，并按 Canvas 的位置计算坐标；恢复粒子绘制，通过 globalAlpha 实现消退，支持 RGB/HSL/命名颜色和空调色板回退。首次移动前不启动动画，停下后效果消退并停止动画帧；ResizeObserver 同步尺寸与设备像素比例，卸载清理事件和绘制。新增深色体验区、操作说明、测试按钮、Explicit Container 和 Trail Only 示例。

5 项组件回归在修复前失败、修复后全部通过，覆盖父容器输入、显式祖先坐标、颜色、尺寸/卸载和闲置停止；Storybook/根应用类型、修改文件 ESLint、Prettier、stories 覆盖通过。Chrome 的 Docs 各 Canvas 在输入前完全透明，移动后鼠标区域有实际像素，原点没有误绘，消退后全部清空；默认独立示例的真实鼠标连续移动触发线条与粒子，底层测试按钮真实点击计数增加，独立会话浏览器 errors 为空。使用用户已有的 6006 服务，没有额外启动 Storybook；本轮未重新构建生产产物或发布。

文档链接/命令、组件目录同步和 git diff 检查通过。验证结束后关闭独立浏览器会话的清理命令被自动审批服务 403「内容审计命中风险规则」拦截，命令未执行；此前浏览器验证已完成。

## 2026-10-12 DescBox 对齐修复

Chrome 在修改前的 Docs 场景测得客户性质标签与首个选项文字相差 4px，6 个长名称被截断。选项组件的上下 padding、固定三列和复选框单独设置的间距造成错位与不一致换行。

DescBox 现在统一字段和选项的行高、起点与网格间距，选项按容器空间排成等宽列，完整显示长名称；容器宽度不足 960px 时详情改为上下排列。RadioInput 新增可选 className / wrapText，DescBox 单独去除选项 padding 并启用首行图标对齐。新增 Compact、Narrow stories 便于检查窄容器。

本次 Storybook/根应用类型、ESLint、Stylelint、Prettier、Less 编译、stories 覆盖和 git diff 检查通过。修改后的浏览器复核两次被自动审批服务 403 拦截，命令未执行，因此不记录修改后实测的对齐或溢出结果；此前复现结果不代表修复后渲染已验证。

## 2026-10-12 ScrollableSections 滚动导航修复

在 Storybook Docs 复现滚动到审计区块后仍激活概览：示例未传可选 `scrollContainerRef`，原组件只监听显式 ref，因此完全没有同步滚动。原索引算法也会提前激活下一节；点击使用 offsetTop，遇到额外定位祖先时与实际滚动容器的坐标不一致。

现在优先使用显式容器，省略时识别最近滚动祖先或窗口；按导航下方的区块起点更新激活项，点击使用同一容器坐标。导航在最后一节保持吸顶可见，容器、导航和内容尺寸变化时重新计算，卸载移除监听与观察器。新增 Explicit Container story 展示嵌套容器。

实际验证：5 项组件回归通过，覆盖自动容器、显式 ref、窗口、末节与点击坐标；公共组件包共 4 suites / 13 tests 通过。strict UI 包类型、Storybook/根类型、修改组件的 ESLint 错误检查与 stories 覆盖通过。Chrome 在原 Docs 场景验证概览→设置→审计与返回概览，三个导航各重复点击两次均定位并激活对应区块；显式 ref 示例滚动至审计、点击设置均同步，外层滚动位置保持 0。

## 2026-10-12 Storybook 开发预览复核

用户反馈本地 `$RefreshSig$ is not defined` 后，本次核对了开发编译与浏览器实际运行。此前开发产物中的 Refresh 引用仍会被旧进程提供；当前配置重启后，6006 服务返回的 main iframe bundle 已无 `$RefreshSig$` / `$RefreshReg$`。当前分支使用独立的 Storybook Vite 配置，提供 `storybook:clean` 和 `storybook:reset`，更新配置后先停止旧服务再清理。应用自身的 React Refresh 保留。

本次实际结果：

- 完整 Storybook 开发服务编译成功；修正设置抽屉和权限模块的类型导入后，HMR 编译状态为 0 errors / 0 warnings。
- 新增回归通过真实 Storybook presets、Babel compiler addon 和 Vite development loader 编译 store/theme，并在没有 Refresh 全局变量的 VM 中成功加载。
- 工程工具测试 17/17，其中 Storybook 3/3；Storybook/根应用类型检查和修改范围 ESLint 错误检查通过。
- Chrome 实际验证 AnimatedIcon、ScrollProgressBar、CheckableTags、SettingDrawer 四个示例渲染；CheckableTags 的 React 选项由未选中切换为选中。最终新建会话通过 Storybook 管理页面加载 SettingDrawer，浏览器 errors 列表为空。

测试时曾与用户的 6006 服务并行启动独立 6008 进程，两个进程共享输出目录引起 HMR 重载；已停止本次创建的 6008 进程，最终浏览器检查使用 6006。生产静态构建、全量 Jest、Pages/Vercel 部署和 Git 推送没有在本轮重新执行，不将此前结果算作本次新验证。

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
| 工程工具       | 11/11，注册表/脚手架和真实 Vite 进度回归                                                      |
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

PUBLIC_URL=/、production、关闭 sourcemap。数据为 Vite stats 原始 JS/CSS，不是 gzip 下载量或 LCP/INP/CLS。

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
node scripts/check-bundle-budget.mjs build-enterprise-stats.json enterprise
```

本机未安装当前 Playwright 对应 Chromium，临时配置使用系统 Chrome；CI 配置使用 Chromium，不能将本机通过等同远端通过。真实模式使用 playwright.enterprise-api.config.ts 和 scripts/serve-enterprise-test.mjs。两种企业模式共用 dist-enterprise，须依次构建/验证，不能测试时覆盖产物。API/browser/tooling 的 loopback 访问在沙箱外执行，本地服务已停止，测试数据库已删除。

## 当前实现限制

企业后端适合单实例 Node 24 自托管、持久卷 SQLite；不能部署到 Vercel 临时文件系统。审计是同事务追加记录，数据库管理员可绕过触发器，不是外部防篡改/合规认证。前端资源缓存位于浏览器内存，尚无服务端/分布式查询缓存、后台刷新或实时撤权推送。

根 strict 仍为 false，业务后端新增独立 strict 门禁；CommonJS HTTP adapter 和其它 legacy helper 尚未全部类型化。数据库已有 schema v2、版本迁移、备份校验/恢复和组织成员切换基础，但当前前端只保留一个活动会话，组织账号关联/解绑没有运营 UI/API。SSO/MFA/邀请/密码找回、组织层级、真实部署旧库演练、运行期插件与兼容协商继续待办，见[架构](ARCHITECTURE.md)和[对标](BENCHMARKS.md)。

## 2026-10-17 实时客户端与 MFE 消息契约

本轮将遗留 `useWebsocket` hook 迁移为 TypeScript，修复 URL/开关变化和重连时的旧 socket 事件竞态，增加可选的有界指数退避、发送、消息解码与错误状态。ProjectA/ProjectB 示例共用 `MfeSharedMessage` 解析器并限制字段、长度和时间戳。该 hook 仍没有企业 API 调用方或服务端事件 schema；MFE 浏览器消息不作为 WS 服务端协议，资源缓存也未接入实时失效。

| 检查            | 结果                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| 根 TypeScript   | `tsconfig.json` 通过                                                   |
| Strict 边界类型 | `tsconfig.strict-boundaries.json` 通过                                 |
| ESLint          | 修改范围无诊断；全 src 0 errors、84 warnings（均在本轮未修改的文件）   |
| Jest            | 34 suites、123 项通过；包括新增 WebSocket 生命周期和 MFE 消息解析回归  |
| 工程工具        | `node --test scripts/*.test.mjs` 17/17 通过                            |
| 工程契约        | import boundaries、项目 Remote 契约、路由策略通过                      |
| 文档与格式      | 51 份项目文档链接/命令、组件目录、修改文档 Markdownlint、Prettier 通过 |

执行环境为 Node.js v26.11.1，仓库要求 Node 24.15 至 24.x；上述检查在当前环境通过，但发布前仍应在受支持的 Node 24 运行时复验。Jest CLI 被 Console Ninja 注入并尝试连接 loopback，在沙箱中返回 `EPERM`；全量测试改用 Jest 官方 API 入口运行：

```bash
node --input-type=module -e 'import { run } from "jest"; await run(["--runInBand", "--coverage=false"])'
```

WS hook/MFE bridge 的实现阶段未重建 MFE 生产产物或运行浏览器回归：仓库已有 `dist-vercel` 产物，现有构建流程会重写该目录。后续企业工作区页面回归见“企业工作区体验与无障碍收紧”；它们不验证业务 WS/SSE 服务端。未执行外部部署，也没有可连接的企业 WS 服务端；部署目标和服务端事件契约需要在后续阶段确定。

## 2026-10-17 SQLite 租户数据与运维基础

本轮增加 schema v2 principals/tenant_memberships、服务端活动租户切换、版本化迁移、SHA-256 + 逻辑指纹备份、离线恢复和原 schema 回滚模式。旧 v1 fixture 按迁移前仓库 EnterpriseStore 的 schema 冻结，重复邮箱未合并，凭据仍按旧组织成员分别保留；迁移前后和备份恢复后，两组织的有效权限与租户隔离审计列表逐项一致。当前 workspace 没有真实部署旧库，因此自动 fixture 演练不是生产旧库验收替代品。

| 检查             | 结果                                                                                |
| ---------------- | ----------------------------------------------------------------------------------- |
| 企业 API         | 21/21；包含旧 scrypt 密码/会话兼容、有效成员切换、撤权和事务审计                    |
| 迁移与恢复       | v1 → v2 权限/审计一致、迁移前备份验证、v2 覆盖恢复、v1 自动升级恢复、原 schema 回滚 |
| API strict       | `tsconfig.api.json` 通过                                                            |
| 文档/依赖边界    | 51 份本地链接与命令、项目参考、import boundaries 通过                               |
| 本地真实模式预览 | Web 8091 → API 5201；临时 SQLite 登录后读取到用户管理记录                           |
| CLI              | `db-admin.mjs` migrate / backup / verify-backup 在临时路径运行通过                  |

本机 Node.js v26.11.1，项目声明要求 Node 24.15.x；结果需要在受支持 Node 24 上复验。`pnpm run` 本轮在启动脚本前报 `unable to open database file`，因此使用仓库内 Node/TypeScript CLI 运行等价检查。HTTP 集成和本地浏览器流程在本机 loopback 权限下执行；预览 API 与 Web 仍以隔离临时数据库运行，地址为 `http://127.0.0.1:8091/#/signin`。临时登录凭据只用于本轮本机预览，不可用于其它环境。

## 2026-10-17 企业工作区体验与无障碍收紧

标签栏的刷新、全屏和当前页关闭操作移到 tablist 外；关闭当前页保留原有返回上一页行为，并提供中英文可访问名称。工作区补齐页面 landmark/标题与操作名称，主题 token 和选中菜单文字按浅色/深色分别保证可读性；生产浏览器门禁采样菜单、链接、活动 tab、次要文字和主按钮的对比度。渐变动画保留装饰用途并隐藏于辅助技术。

| 检查              | 结果                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| 企业版生产构建    | 通过                                                                                               |
| 企业版 Playwright | 8/8 通过，单 worker；覆盖标签关闭、浅色/深色对比度、用户/角色管理、审计和跨标签撤权                |
| 本地 axe          | 0 violations；2 组 incomplete 分别涉及折叠菜单 `aria-controls` 目标及渐变/叠层背景的自动对比度判定 |
| ESLint            | 修改范围 0 errors；`autoDeploy/index.tsx` 有 6 条 warnings                                         |
| Stylelint         | 修改样式通过                                                                                       |
| Prettier          | 检查文件通过                                                                                       |
| 本机预览          | mock 模式：`http://127.0.0.1:8094/#/administration/users`；演示账号数据保存在当前浏览器内存中      |

本机运行 Node.js v26.11.1（项目要求 Node 24.15.x）；发布前需在受支持 Node 24 上复验。axe 的 `incomplete` 不是通过结论，菜单目标和渐变/叠层文字仍需人工检查；en/zh 键/占位符一致性已有门禁，但硬编码文案覆盖率和真实设备 Web Vitals 仍未建立。当前复核另启 `PORT=8094` 的默认演示预览：登录、组织管理、两条演示用户记录、添加用户对话框和深色主题均已实测；没有提交写操作。此前 8093 进程只显示静态 loader、`#root` 为空，本轮保留原进程并使用 8094。该预览和回归只覆盖客户端工作区，不包含可连接的企业 WS/SSE 服务端。

## 2026-10-17 编译期模块契约 v2 与本地复核

该记录形成时旧 v1 manifest 仍可注册；后续已移除此分支，当前状态见本文末“退役兼容入口清理”。组织管理与通知使用 v2，声明 capability、宿主 SemVer 范围、连续数据迁移链的 checksum/备份/回滚边界及卸载清理策略。旧版 SQLite 建表结构改为独立冻结 fixture，避免测试与新 migration SQL 同源；v1/v2 结构、外键、索引、约束或触发器定义不符时拒绝迁移/启动/备份。同路径并发备份通过独占发布保证胜者文件不被覆盖或删除。

| 检查                        | 结果                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------- |
| 模块 v1/v2 与版本范围单测   | 22/22 通过                                                                              |
| SQLite 维护回归             | 8/8 通过；旧 v1 权限/审计一致、坏目标恢复、备份/回滚、并发备份及弱化 trigger/index 拒绝 |
| 企业 API HTTP/SQLite 集成   | 21/21 通过，临时 loopback 服务                                                          |
| Enterprise production build | `node scripts/project-command.mjs build enterprise` 通过                                |
| 类型/边界                   | strict boundaries、API strict、Vite TS checker 通过                                  |
| 页面本地复核                | 8094 默认演示服务，用户管理页 2 条演示数据，未提交数据                                  |
| 本地 axe                    | 0 violations；2 组 incomplete 仍需人工判断                                              |
| i18n                        | en/zh 224 键、插值变量一致；修复中文 `menu.textEditor` 缺失                             |
| 文档与格式                  | 项目参考同步、51 份文档链接/命令、Prettier、ESLint、diff 检查通过                       |

本次 Enterprise production build 退出码为 0；默认开发预览在 8094，tracking API 在 5200 以内存模式运行。`pnpm run` 在当前环境启动时报 `unable to open database file`，因此使用仓库内 Node/TypeScript CLI 等价执行；项目参考、文档校验直接运行成功。控制台还记录到默认首页 demo 的重复 React key 和 antd render notice 警告，它们不在用户管理列表的数据加载路径。自动浏览器错误列表为空。本记录形成时业务 WS/SSE 服务端尚未实现；后续本地服务端闭环与代理复核见本文“企业资源 WebSocket 本地闭环”一节。演示 UI 的浏览器本地数据不能作为真实 API/租户验收。

## 2026-10-17 国际化资源契约门禁

en/zh 翻译资源目前各有 224 个字符串键；检查器比对缺键、多余键、非字符串值及 `{{placeholder}}` 插值变量，并进入 `ci:quality`。初次运行发现中文缺少 `menu.textEditor`，补齐为“文本编辑器”。

| 检查                             | 结果                           |
| -------------------------------- | ------------------------------ |
| `node scripts/validate-i18n.mjs` | en/zh 224 键及插值变量一致     |
| 国际化契约单测                   | 2/2 通过                       |
| 工程工具全量回归                 | 19/19 通过，包含国际化契约测试 |

该门禁只保证已声明的 en/zh 翻译资源结构和插值变量一致，不检查每个 UI 文案是否都经由 i18n，也不替代真实语言切换和视觉审校。

## 2026-10-17 本地企业工作区浏览器复核

本轮加入中英文键盘跳转到主内容、渐变装饰的 reduced-motion/forced-colors 支持，并修复可见导航子菜单 `aria-controls` 指向尚未挂载节点的问题。干净浏览器会话中直达 Users 页后路由保持 `#/administration/users`；先前观察到的回首页现象本轮未复现，未发现相应路由缺陷。

| 检查                        | 结果                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| 本地企业版页面              | `http://localhost:8096/#/administration/users`，用户列表正常显示          |
| Playwright 本地浏览器复核   | 5/5 通过：主题对比度、键盘跳转、减少动态效果/强制颜色、菜单目标、关闭标签 |
| Enterprise production build | `node scripts/project-command.mjs build enterprise` 编译通过              |
| 根类型与 strict boundaries  | `tsconfig.json`、`tsconfig.strict-boundaries.json` 通过                   |
| 修改范围代码质量            | ESLint、Stylelint、Prettier 及 `git diff --check` 通过                    |
| 页面运行错误                | 路由诊断浏览器未观察到 page error                                         |

使用 Chrome for Testing 155 和临时 Playwright 配置连接本地 enterprise dev server；测试使用隔离页面上下文中的演示身份，没有写入真实业务数据。服务当前保持运行，便于打开上述地址预览。Node.js 为 v26.11.1，项目声明要求 Node 24.15.x，发布前仍需在受支持版本复验。此次没有重新运行 axe 或真实设备 Web Vitals，也没有部署。本段复核时企业 WS/SSE 服务端尚不存在；后续实现与当前代理核验见本文“企业资源 WebSocket 本地闭环”一节。

## 2026-10-17 企业资源 WebSocket 本地闭环

此前“服务端实时通道未实现”的记录反映当时状态，由本节更新。现在服务端签发 30 秒、单次使用且绑定会话/成员/组织的一次性票据；连接通过首帧认证，服务端在写入事务提交后仅广播 `users`/`roles`/`audit` 资源失效，不携带业务记录或租户 ID。事件按组织分序，保留最近 1,000 条进程内事件；断点过期时客户端全量失效缓存并重连。开发代理同时转发 `/api/events` 的 HTTP 票据请求和 WebSocket upgrade。

| 检查                         | 结果                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| 本地 API/SQLite 冒烟         | 登录、一次性票据、错误组织拒绝、在线/离线写入、实时通知和重连重放均通过             |
| Enterprise dev proxy/页面    | `8097/#/signin` 正常渲染；票据路由返回 API JSON `401`，WS 经代理 upgrade 后按预期以 `4401` 拒绝未认证连接 |
| WS 消息边界                  | 仅含 `version/type/id/scope/resource/occurredAt`；无记录字段与组织标识               |
| 类型/i18n 门禁               | 根类型、API strict、选定 strict boundaries、en/zh 对齐与逐文件硬编码文案预算均通过 |
| 运行环境                     | 临时 SQLite、单实例；Node v26.11.1（项目支持范围为 Node 24.15.x）                    |

这是临时本机单实例冒烟，不替代 Node 24 验收、生产旧库/主机恢复演练或多实例验证；未运行自动化测试套件，也未部署。WS 日志目前是进程内有界窗口，进程重启/多实例需全量失效或后续接入共享 outbox；真实设备 Web Vitals 仍要等部署流量。

## 2026-10-17 退役兼容入口清理

Enterprise 入口只暴露登录、条款和隐私路由；登录组件根据显式 Mock 开关选择展示登录或租户登录，不再挂载注册页/GitHub OAuth callback。旧 token 字符串和 GitHub 凭据只在显式演示模式读取，真实租户模式只接受服务端会话。模块注册表只接受 manifest v2；MFE 远程清单必须完整声明共享依赖，不再接受只声明 React/React DOM 的旧清单。路由权限不再匹配遗留自定义 key，KeepAlive 必须置于应用级 Provider 内，移除了全局单例兜底。

SQLite schema v1 → v2 前向迁移继续保留，用于升级已部署数据库；备份验证、回滚和恢复逻辑不是页面/协议兼容 fallback。公开展示项目、Mock 数据和演示登录继续保留；Enterprise 普通开发/构建默认租户登录，显式设置 `REACT_APP_USE_MOCK=true` 或 Pages 演示构建才启用 Mock。
