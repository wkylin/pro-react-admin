# 开源产品对标与工程升级

## 数据来源与选择

核验时间：2026-10-11 UTC。原要求使用 Tavily；本机 CLI 未登录，用户选择使用 GitHub 公开 API。通过 `topic:admin-dashboard stars:>3000 archived:false` 和 `topic:react-admin stars:>1000 archived:false` 按 Star 排序筛选，再读取候选仓库 metadata、最新 release 和官方 README。该结果是所选主题的候选对标，不是整个 GitHub 的绝对排名。

证据快照：[GitHub 数据](research/github-admin-benchmarks.json)。Star 为检索时快照，会变化；pushed_at 也可能来自自动更新，不能单独证明长期维护质量。release 频率、技术契约、文档与可迁移性共同决定对标价值。

| 项目                                                           |   Star | 最近 push（UTC 日期） | 最近 release             | 对标用途                    |
| -------------------------------------------------------------- | -----: | --------------------- | ------------------------ | --------------------------- |
| [AdminLTE](https://github.com/ColorlibHQ/AdminLTE)             | 45,646 | 2026-10-08            | v4.10.1 / 2026-10-08     | UI/模板成熟度               |
| [Tabler](https://github.com/tabler/tabler)                     | 41,850 | 2026-10-10            | core 1.6.1 / 2026-09-28  | 信息密度与界面一致性        |
| [Appsmith](https://github.com/appsmithorg/appsmith)            | 41,048 | 2026-10-11            | v2.5.0 / 2026-10-09      | 数据连接与完整产品流程      |
| [Ant Design Pro](https://github.com/ant-design/ant-design-pro) | 38,845 | 2026-10-11            | v6.0.3 / 2026-08-17      | 企业模板、路由、工程体验    |
| [Refine](https://github.com/refinedev/refine)                  | 35,841 | 2026-09-10            | core 5.0.12 / 2026-04-02 | headless 数据/授权 Provider |
| [Vben Admin](https://github.com/vbenjs/vue-vben-admin)         | 33,579 | 2026-10-10            | v5.7.0 / 2026-05-21      | 应用与核心边界、多项目工程  |
| [React Admin](https://github.com/marmelab/react-admin)         | 26,960 | 2026-10-08            | v5.15.4 / 2026-09-25     | 资源注册、CRUD 与接入契约   |
| [NocoBase](https://github.com/nocobase/nocobase)               | 24,523 | 2026-10-11            | v2.2.22 / 2026-10-08     | 插件与业务产品能力          |
| [Shadcn Admin](https://github.com/satnaing/shadcn-admin)       | 15,693 | 2026-09-10            | v2.2.1 / 2025-11-06      | 响应式、可访问、命令搜索    |

vue-element-admin 虽有约 90k Star，但核验的 push 时间停在 2024-10-24，故不作为当前工程维护的主要基线。Shadcn Admin release 较旧，README 也明确并非完整 starter、认证流程部分实现，仅取 UI 参考。Appsmith/NocoBase 是更大的低代码/全栈产品，其功能范围不等于前端模板的直接替代方案。

## 采用的设计依据

[React Admin 官方 README](https://github.com/marmelab/react-admin/blob/master/README.md) 展示 DataProvider、Resource、CRUD 与模块化；[Refine Core README](https://github.com/refinedev/refine/blob/main/packages/core/README.md) 描述 headless 的数据、授权、路由、状态和 i18n Provider。由此建立业务资源与传输的可替换契约，并交付用户、角色和审计示例。

[Ant Design Pro README](https://github.com/ant-design/ant-design-pro/blob/master/README.md) 的 React 19/Ant Design 6 与本项目现有技术方向一致，重点借鉴统一装配、权限导航与文档。[Vben README](https://github.com/vbenjs/vue-vben-admin/blob/main/README.md) 与工作区结构用于应用/核心分层、多项目与可扩展工程参考。[Shadcn Admin README](https://github.com/satnaing/shadcn-admin/blob/main/README.md) 用于响应式、可访问交互和搜索体验参考。没有为了“对标”替换现有 React/Ant Design/Vite 技术栈。

## 架构文档对标

以下按 2026-10-17 查阅的官方专题文档比较可学习的写法，不用 Star 推断架构质量。React Admin、Refine 是数据框架，Backstage、NocoBase 是更大的插件平台；它们的产品范围与本仓库不同。表中明确区分文档改进和仍需产品决策的能力差距。

| 官方依据                                                                                                                                                                                             | 本仓库现状与差距                                                                                                                                               | 文档交付与验收                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [React Admin 数据获取](https://marmelab.com/react-admin/DataFetchingGuide.html)、[Refine Data Provider](https://refine.dev/docs/data/data-provider)：按方法、参数、返回值和页面读取链路解释 Provider | 已有类型化 CRUD、parser、缓存及管理样例；跨模块接入仍需在[模块指南](MODULES.md)和[企业资源](ENTERPRISE.md)之间跳转。通用数据 hook、更多 adapter 是产品能力差距 | 从文档索引可沿“创建模块→路由/权限→Provider→服务端授权→部署”完成一条路径；每个接口注明 owner、失败和取消语义                         |
| [Backstage 后端架构](https://backstage.io/docs/backend-system/architecture/index)、[NocoBase 插件开发](https://docs.nocobase.com/plugin-development)：分别说明扩展点、生命周期和插件边界             | 本仓库是静态 manifest v2，只有已选模块的 Provider/路由装配；没有运行期插件或服务端扩展点                                                                       | [运行时链路](ARCHITECTURE_RUNTIME.md#remote-加载与兼容)列出模块、Remote、数据库和事件的兼容行为；运行期信任与沙箱继续作为未实现能力 |
| [Ant Design Pro 文档入口](https://pro.ant.design/docs/overview)：把启动、目录、权限和全局状态组织为阅读路径                                                                                          | 本仓库专题更细，但[文档索引](README.md)原先按文件罗列；现行事实与历史验证容易混用                                                                              | 索引标明现行契约、历史验证和上线门禁的用途；架构总览只陈述当前能力及未完成边界                                                      |

对标验收应检查链接能否直达对应官方章节、仓库文档是否与当前代码一致，以及读者能否据此完成接入或判断上线门禁。外部页面和 Star 快照会变化；本地 `check:docs` 不能代替定期人工复核外部证据。

## 劣势与本轮交付

| 原问题                                  | 本轮实现                                                      | 验收方式                    |
| --------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| 装配、布局、状态散落，@app 指向整个 src | 独立 app/bootstrap、routing、layouts、model；平台依赖方向门禁 | 类型/导入边界、全部项目构建 |
| 菜单、搜索、路径授权重复                | route-policy 包含导航 metadata；共用授权与项目过滤树          | 树/策略单测、浏览器授权     |
| 按钮/菜单不响应已挂载后的撤权           | 外部 Store 快照订阅、退出/跨标签页/到期同步                   | 多消费者与跨标签页回归      |
| Zustand 与 KeepAlive 全局碰撞           | 根实例 Store/缓存 Provider、项目持久化键、明确 unmount        | 双根隔离与 LRU 单测         |
| projectB 复制路由路径算法               | 平台 normalize/flatten/match 工具                             | 参数路径与面包屑测试        |
| 构建、预览、清理、部署分别拼目录        | 单一注册表解析、build plan、doctor/dry-run、脚手架            | 工具契约测试、构建/预览     |
| 演示依赖与业务 starter 混合             | 独立 enterprise 路由树和输出                                  | stats、精简导航与浏览器回归 |
| 缺少业务数据接入范式                    | 类型化 Provider、REST parser、demo、用户/角色/审计            | Provider 单测和完整交互     |
| 默认加载观测/装饰模块                   | Sentry/设置/效果按需加载，装饰默认关闭                        | 实际构建 stats              |
| 开源接入与发布步骤分散                  | 贡献/安全说明、问题模板、企业接入文档、产物 CI                | 文档与脚本门禁              |

具体测量与实际测试结果见[验证记录](VALIDATION.md)，不把计划写成已完成能力。

## 仍需解决的产品差距

| 优先级 | 下一能力                   | 验收目标                                                                                                                                                  |
| ------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0     | 身份与租户运营进一步完善   | 已提供 schema v2 身份/成员表、活动组织切换 API、SQLite 版本迁移、恢复预算 drill 和策略 ADR；仍待真实部署库复演、OIDC owner 决策、SSO、MFA/找回与 RPO/RTO  |
| P1     | 服务端状态缓存扩展         | 单实例 WebSocket 实时失效闭环已交付；后台刷新、乐观更新、持久 outbox 和跨实例/分布式缓存仍待流量/部署依据                                                 |
| P1     | feature/plugin 扩展契约    | 静态 manifest v2 已声明 capability、宿主版本范围、迁移和卸载语义；运行期加载、信任来源和沙箱仍待设计                                                      |
| P1     | JS 迁移与全仓 strict       | 按业务迁移遗留适配器和演示组件，不关闭现有 strict 门禁                                                                                                    |
| P1     | 可访问性、国际化与性能实测 | en/zh 资源契约、硬编码文案逐文件不增长、标准 TTFB/FCP/LCP/INP/CLS 采集与 p75 统计已接入；scanner v2 识别文案覆盖为 10.23%，真实设备基线仍待流量和发布门禁 |
| P2     | 多部署环境的运行时配置     | 同一 artifact 在受验证配置下切换 API/Remote，不暴露服务端凭据                                                                                             |
| P2     | 更多业务模块               | 组织、字典、文件、通知、审批按统一资源契约接入                                                                                                            |

后续已落地静态模块契约 v2，组织管理与通知使用统一声明和 Provider 装配，公共 Header 通过模块插槽接入；通知状态按应用根隔离。所有正式模块已迁移到 v2，旧 manifest 不再兼容。接入与限制见[模块指南](MODULES.md)。运行期插件下载、动态版本协商和语言资源注册仍未实现。

本轮租户数据交付按旧 schema v1 fixture 演练：重复邮箱没有合并，成员角色、密码、会话、审计的语义指纹在迁移、备份恢复和 schema 保留回滚中一致。仓库环境没有真实部署数据库，因此这项自动化演练不能替代在真实旧库副本上的上线门禁；OIDC issuer、账号关联策略和恢复目标也没有仓库内的定案依据。

本阶段补齐单实例真实服务闭环：api/enterprise 使用持久化 SQLite，租户绑定会话、服务端逐次授权、最小权限授予、停用/重置密码撤销、最后管理员保护和事务审计；真实 HTTP 集成回归覆盖跨租户越权与回滚。前端增加真实登录与身份变化后的页面/Tab 销毁，Provider 增加会话隔离、共享请求、独立取消、TTL 和资源失效。业务核心加入独立 strict 门禁。它仍是自托管基础，不能视为分布式 SaaS、SSO 或防篡改审计平台，详见[企业资源](ENTERPRISE.md)。

2026-10-17 后续增量把失效传播接通：HTTP 写事务成功后发布 `users`/`roles` 与 `audit` 失效；WS 票据只绑定已有 session/principal/tenant，事件按当前租户与读取权限过滤，回放窗口不足会要求客户端全量刷新。该实现没有业务记录 payload；事件日志保存在单进程内，部署多 API 实例前仍需设计持久 outbox 与跨实例顺序。`web-vitals` 统一采集并在 Tracking stats 提供 p75 和评级数量；真实设备阈值不能从本机运行推导。

“企业级旗舰”应由长期维护、后端契约、可扩展业务能力、性能数据和发布治理共同支撑。本轮构建其工程基础并补齐可运行能力；它不是对生产安全、全栈完备性或 Web Vitals 的认证。
