# CRM 演示：客户、跟进与商机

CRM 演示把客户列表、客户详情、跟进记录和商机阶段连成同一条流程。它作为独立模块装配在默认展示应用与现有 Enterprise 展示入口中，在“业务页面模板”下只增加一个“CRM 演示”入口。生成 Enterprise 项目预设仍只注册原有组织管理模块，需要 CRM 示例时再显式装配。

## 运行与体验

在仓库根目录启动默认展示应用，或启动使用真实租户身份的 Enterprise 本地入口：

```bash
pnpm start
# 或
pnpm run start:enterprise
```

按终端打印的地址登录，打开“业务页面模板 → CRM 演示”。入口、演示账户与本地服务说明见[快速上手](./GETTING_STARTED.md)。当前[公开访问管理预览](https://pro-react-admin.vercel.app/#/preview/access)只展示成员、审批和审计；CRM 演示需要登录本地工作区。本次源码变化是否已在公开站点部署，应另行验收。

可以依次完成下面的任务：

1. 新建一个虚构客户，填写公司、联系人、电子邮箱和演示负责人。保存后，在客户列表搜索该公司，再打开客户详情。
2. 在详情记录一次电话、邮件、会议或备注跟进，填写内容，也可指定下次跟进日期。保存后检查跟进时间线与客户信息。
3. 为同一客户创建商机，填写标题、人民币金额和预计成交日期。新商机从“需求发现”开始。
4. 在关联商机或商机工作区中，依次推进到“方案报价”“商务谈判”“已赢单”。首次赢单会把客户从“潜在客户”更新为“已成交客户”。检查列表、客户详情与商机汇总是否同步。
5. 另建一个商机，在任一未结束阶段标记丢单并填写原因。已赢单和已丢单记录都不能继续推进；关闭后的金额不再计入未结束商机。

客户列表支持搜索、状态筛选和分页；从筛选结果打开详情，再返回列表会保留查询条件。商机列表可以按阶段筛选。无匹配结果时可清除筛选；未知客户编号提供返回列表入口。表单取消时，已填写的内容需要确认丢弃。

## 页面与源码

| 页面                             | 路由                            | 关键源码                                                                  |
| -------------------------------- | ------------------------------- | ------------------------------------------------------------------------- |
| 客户工作区：查找、新建与编辑客户 | `/#/patterns/crm`               | [CustomersPage](../../src/features/crm/pages/CustomersPage.tsx)           |
| 客户详情：跟进时间线与关联商机   | `/#/patterns/crm/customers/:id` | [CustomerDetailPage](../../src/features/crm/pages/CustomerDetailPage.tsx) |
| 商机工作区：阶段、金额与推进操作 | `/#/patterns/crm/opportunities` | [OpportunitiesPage](../../src/features/crm/pages/OpportunitiesPage.tsx)   |

详情与商机路由从 CRM 页面内进入，不再增加侧栏条目；两者在侧栏仍选中 CRM 入口。页面复用 [BusinessPage 与 BusinessToolbar](../../src/shared/ui/BusinessPage/index.tsx)，沿用共享明暗主题和响应式布局。

数据与装配可以沿以下路径阅读：

- [领域类型](../../src/features/crm/model/types.ts)定义客户、跟进、商机及其关联字段；[状态与业务动作](../../src/features/crm/model/crmStore.ts)校验输入、维护关联、推进阶段并计算商机汇总。
- [CrmProvider](../../src/features/crm/model/CrmProvider.tsx)为每个模块实例创建独立状态，页面订阅同一份客户、跟进与商机集合。
- [模块入口](../../src/features/crm/module.ts)组合 [manifest v2](../../src/features/crm/manifest.ts)、Provider 与[按需路由](../../src/features/crm/routes.tsx)；[默认展示清单](../../src/app/modules/default.ts)和 [Enterprise 展示清单](../../src/projects/enterprise/modules.ts)负责装配。
- [展示策略](../../config/route-policy.json)与[企业策略](../../config/route-policy.enterprise.json)登记标题、菜单和访问权限；中英文操作文案位于 `src/i18n/locales/` 的 `crm` 命名空间。

## 业务校验

客户公司名为 2–100 字，联系人为 1–80 字；邮箱必须合法且不超过 120 字。负责人来自固定演示团队。新客户默认为潜在客户，编辑基本信息不直接改变成交状态。

跟进必须关联已有客户，内容为 4–1000 字；可选的下次跟进日期必须是合法的 `YYYY-MM-DD` 日期。商机也必须关联已有客户，标题为 2–100 字，预计成交日期必填且格式相同。

商机表单以人民币元输入金额，领域状态以整数分保存。金额必须为正数，最多两位小数，最高 100,000,000 元。汇总显示未结束商机数量、未结束金额及已赢单金额；客户详情的汇总仅针对当前客户。

阶段按 `discovery → proposal → negotiation → won` 前进；未结束商机也可转为 `lost`，原因需要 4–500 字。不能跨阶段跳转、重复推进终态或更换已建商机的关联客户。字段两端空白由领域层清理，非法输入、未知关联或非法阶段操作不会修改现有数据。

推进操作传入页面显示的预期阶段；如果该阶段已改变，旧操作会被拒绝，避免同一旧动作连续推进两步。未填写下次跟进日期的新记录会保留客户已有的联系安排。

## 演示数据与权限边界

公司、联系人、跟进与商机均为虚构示例。CRM 使用每个模块实例自己的内存状态：切页共享，刷新或卸载模块后重置，不同实例互相隔离。种子记录时间由模块创建时的时钟生成，不依赖固定历史日期。

即使从连接真实 Enterprise API 的入口打开，CRM 也不请求该 API，不写数据库、`localStorage` 或服务端审计。组织管理页面的真实用户、角色、审批和审计仍沿用原有服务端资源；二者不能混称为真实业务数据。

三个 CRM 路由使用现有业务模板的 `home:read`。这是演示入口的访问策略，不代表生产 CRM 的查看、跟进和商机写权限。改成真实业务时，应新建自己的领域模块与 Provider，在服务端实现租户隔离、字段校验、细分权限、审计及并发控制，再调整路由和操作权限。参考[业务模块](../architecture/MODULES.md)、[页面模板接入说明](./PAGE_PATTERNS.md#将模板改成实际业务模块)与[企业资源指南](../operations/ENTERPRISE.md)。

## 验证命令

领域与导航检查：

```bash
pnpm exec jest --config tests/unit/config.cjs --runInBand src/features/crm/model/crmStore.test.ts src/platform/navigation/menu.test.ts
pnpm run typecheck
pnpm run check:i18n
pnpm run check:route-contract
pnpm run check:import-boundaries
pnpm run check:docs
```

默认应用浏览器场景先构建，再运行 CRM 用例：

```bash
pnpm run build:webpack
pnpm exec playwright test --config tests/e2e/config/app.config.ts tests/e2e/crm.spec.ts
```

Enterprise 演示使用 Mock 身份构建；CRM 本身继续使用相同内存演示数据：

```bash
pnpm exec cross-env REACT_APP_USE_MOCK=true pnpm run build:enterprise
pnpm exec playwright test --config tests/e2e/config/enterprise-demo.config.ts tests/e2e/crm.spec.ts
```

两套应用的构建和浏览器验证应分别完成，不使用上一套应用的产物替代。测试关注创建客户、记录跟进、创建关联商机、赢单与汇总同步，以及取消确认、筛选空态、刷新重置和手机深色布局。执行结果以本次实际运行记录为准；文档链接检查不能替代行为验收。

### 本轮本地验收

2026-11-09 的本地工作区验收结果：

- CRM 领域/Provider 56 项、导航 10 项测试通过，包含旧阶段重放和非法邮箱写入失败的原子性检查。
- 使用独立 Vite 开发进程验证默认应用和 Enterprise Mock 展示入口：默认应用 CRM、通知、页面模板合计 11 项浏览器用例通过；Enterprise 的 4 项 CRM 用例通过。
- 浏览器覆盖客户到赢单完整流程、丢单原因校验、草稿取消保留、筛选返回、未知客户、刷新重置和 390px 深色布局。客户详情桌面截图与手机深色截图已看图检查。
- 应用和 E2E 类型检查、i18n、路由/项目契约、导入边界及受影响文件格式检查通过，并完成独立代码审阅。

本轮未执行新的 Webpack/生产构建或正式部署；以上浏览器结果对应本地 Vite 服务，不能替代发布产物的部署验收。
