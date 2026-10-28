# 业务页面模板：从运行示例到接入真实业务

这组页面展示管理后台常见的查询表格、基础表单、分步表单、详情与提交结果。它使用同一组“申请”记录，因此提交后能回到列表找到记录、打开详情并推进状态。模板在默认展示应用和 Enterprise 入口均默认显示，菜单名为“业务页面模板”。

## 运行与体验

```bash
pnpm start
# 或使用真实租户登录的 Enterprise 本地入口
pnpm run start:enterprise
```

按终端打印的地址登录后，依次打开“业务页面模板 → 查询表格 → 基础表单”。输入标题、类别、负责人等信息并提交，从结果页打开详情；返回列表后，搜索刚提交的标题。再试一次分步表单，确认两种创建方式进入同一列表。

默认应用使用浏览器演示身份；Enterprise 本地入口默认使用真实身份和 SQLite 演示库。生产 Enterprise 也可使用[独立 Vercel API + Neon PostgreSQL](../deployment/VERCEL_NEON_ENTERPRISE.md)。无论入口连接哪种后端，**业务页面模板都只使用模块实例内的演示记录**，不会调用企业业务 API、写数据库或生成服务端审计。切换身份、组织、刷新页面或重新装配模块会重置这组示例。真实用户、角色、审批与审计页面仍按[企业资源指南](../operations/ENTERPRISE.md)访问服务端。

| 页面与适用场景                                       | 路由                       | 关键源码                                                                         |
| ---------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| **查询表格**：按条件定位记录、比较状态或管理多页结果 | `/#/patterns/requests`     | [RequestsPage](../../src/features/pagePatterns/pages/RequestsPage.tsx)           |
| **基础表单**：字段可一次填写，提交前完成校验         | `/#/patterns/basic-form`   | [BasicFormPage](../../src/features/pagePatterns/pages/BasicFormPage.tsx)         |
| **分步表单**：输入分阶段完成，提交前需要总览确认     | `/#/patterns/step-form`    | [StepFormPage](../../src/features/pagePatterns/pages/StepFormPage.tsx)           |
| **详情**：查看一条记录并推进简单状态流程             | `/#/patterns/requests/:id` | [RequestDetailPage](../../src/features/pagePatterns/pages/RequestDetailPage.tsx) |
| **结果**：提交后确认结果并提供下一步入口             | `/#/patterns/result/:id`   | [RequestResultPage](../../src/features/pagePatterns/pages/RequestResultPage.tsx) |

## 找到一条完整的数据链

1. [模块入口](../../src/features/pagePatterns/module.ts)声明路由和 Provider；[两个应用清单](../../src/app/modules/default.ts)与 [Enterprise 清单](../../src/projects/enterprise/modules.ts)都装配该模块。Provider 随当前应用根和身份工作区创建、销毁。
2. [演示 Provider](../../src/features/pagePatterns/model/requests.ts)实现 `DataProvider` 的列表、单条、创建、更新、删除契约，另加带状态筛选的领域查询方法。记录保存在这个 Provider 的内存中。页面通过[上下文](../../src/features/pagePatterns/model/ExampleRequestsProvider.tsx)获得同一实例。[查询表格](../../src/features/pagePatterns/pages/RequestsPage.tsx)复用组件包的 [ResponsiveTable](../components/RESPONSIVE_TABLE.md)，将 Provider 的分页结果交给 `fetchData`，同时使用查询工具栏、列设置、序号和查看操作；切换查询时取消旧请求。
3. [页面路由](../../src/features/pagePatterns/routes.tsx)按需加载。菜单标题与权限分别在[展示策略](../../config/route-policy.json)和[企业策略](../../config/route-policy.enterprise.json)中登记；中英文文案在 `src/i18n/locales/`。这些示例页使用已有的 `home:read`，只供已授权用户学习界面模式；它不是申请业务的服务端权限。
4. 表单调用 `createRequest`，结果页依据返回的编号查询详情，列表订阅 Provider 变更。状态更新仍在该实例内，不代表企业审计。

## 将模板改成实际业务模块

1. 复制页面模式到新的 `src/features/<业务名>/`，用真实领域名和字段取代示例申请；保持模块契约 v2、按需路由和 Provider 实例生命周期。不要直接修改演示模块来承载生产数据。
2. 明确服务端资源：列表查询条件、排序白名单、分页、记录读取、创建和状态变更。先定义响应解析器，再用[通用 REST DataProvider](../../src/platform/data/provider.ts)接入标准 CRUD；若有状态等领域筛选，像 `listRequests` 一样在领域适配器中明确扩展查询契约。
3. 在服务端实现租户范围、输入校验和 `request:read/create/update` 等业务权限，再把前端路由策略改为对应权限。前端隐藏菜单和按钮只能改善体验，不能取代服务端授权。真实业务写入、审计及恢复流程参见[企业资源](../operations/ENTERPRISE.md)与[运行时边界](../architecture/ARCHITECTURE_RUNTIME.md)。
4. 将新模块加入需要它的项目清单，并检查演示 Provider 不会进入正式业务链路。若要让新项目复用安全入口，先查看[Enterprise 项目预设](./MULTI_PROJECT.md)。

新增一个字段时，同步修改领域类型与解析器、表单、详情和列表展示、双语文案、API 校验及覆盖该字段的测试。页面样式和布局可以保留，也可以换成团队自己的组件。

## 验证改动

```bash
pnpm run check:route-contract
pnpm run check:import-boundaries
pnpm run check:i18n
pnpm run typecheck
pnpm run check:docs
pnpm run test:jest --runInBand
pnpm run build:stats
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run build:enterprise:stats
pnpm run test:e2e:enterprise
```

默认应用的浏览器用例要求先构建相应产物，命令见[质量门禁](./QUALITY.md)。企业入口的 Mock 浏览器测试要求用 `REACT_APP_USE_MOCK=true` 构建；真实企业登录的浏览器测试使用另一套配置和构建。上面两条构建命令顺序运行，避免覆盖同一输出。文档检查只验证本地链接、标题和命令；页面行为还需由测试与实际预览核对。
