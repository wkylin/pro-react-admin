# 企业资源与数据接入

## 可运行入口

```bash
pnpm run start:enterprise
pnpm run build:enterprise
PROJECT=enterprise pnpm run serve:dist
pnpm run test:e2e:enterprise
```

企业入口包含工作台、用户管理、角色管理、审计日志、认证和错误页；完整展示应用也注册这些管理页。演示环境使用 `admin@test.com` 超级管理员账号，账号登录说明见[快速开始](GETTING_STARTED.md)。演示 Provider 的数据仅在当前应用根内保留，刷新页面后重置；演示角色编辑不改变登录权限。

## 已实现行为

用户支持列表、查询、分页、按姓名排序、添加、编辑、停用和删除。角色支持列表、查询、分页、创建、修改权限和删除；演示 Provider 拒绝重复邮箱/角色代码、无效角色引用，以及删除仍有成员的角色。用户编辑的角色选择目前最多加载 200 个角色；大规模组织应接入按需搜索接口。

每次成功演示写操作生成只读审计，最多保留 500 条。列表在卸载或查询变化时取消旧请求，失败展示重试；分页会在删除导致页码失效后调整。修改失败保留表单输入。页面与操作分别检查 user/role/audit 权限，支持中英文与移动端。

浏览器演示审计用于功能验证，不具备服务端不可篡改性。正式账号停用、登录失效和权限变更传播由业务后端负责。

## Provider 契约

`platform/data/provider.ts` 暴露类型化 `DataProvider<Schema>`：list/getOne/create/update/remove。资源定义包含 path、unknown parser、readOnly。REST adapter 通过 JsonClient 接入已有 Axios/Fetch 核心；传递 AbortSignal，列表允许多个消费者请求相同资源而不互相取消。通用 Provider 不依赖 app 或具体业务资源。

`AdministrationProvider` 允许传入自定义 provider。没有传入时，`REACT_APP_USE_MOCK=true` 使用独立演示实例，否则选择 REST adapter；服务失败不会切回演示。可接入 REST、GraphQL 或其它服务，无需改页面。

## REST API

以下接口是接入契约，仓库 api/ helper 暂未实现。后端应验证 Bearer 身份、租户范围、权限、数据字段和角色关联。客户端按钮隐藏不能替代授权。

| 方法   | 路径                 | 权限                                            | 响应                                  |
| ------ | -------------------- | ----------------------------------------------- | ------------------------------------- |
| GET    | /api/admin/users     | user:read                                       | {items: ManagedUser[], total: number} |
| GET    | /api/admin/users/:id | user:read                                       | ManagedUser                           |
| POST   | /api/admin/users     | user:create                                     | 创建后的 ManagedUser                  |
| PATCH  | /api/admin/users/:id | user:update                                     | 更新后的 ManagedUser                  |
| DELETE | /api/admin/users/:id | user:delete                                     | 204 或成功 envelope                   |
| GET    | /api/admin/roles     | role:read；用户编辑的角色选择可提供受限目录权限 | {items: ManagedRole[], total: number} |
| GET    | /api/admin/roles/:id | role:read                                       | ManagedRole                           |
| POST   | /api/admin/roles     | role:create                                     | ManagedRole                           |
| PATCH  | /api/admin/roles/:id | role:update                                     | ManagedRole                           |
| DELETE | /api/admin/roles/:id | role:delete                                     | 204 或成功 envelope                   |
| GET    | /api/admin/audit     | audit:read                                      | {items: AuditEntry[], total: number}  |

查询参数：page（从 1 开始）、pageSize（1..200）、search、sort、order（asc/desc）。total 是过滤后的总数，items 是当前页。可使用 `{code:0,data:...}` 或 `{code:200,data:...}` envelope。其它业务 code 失败；列表 total/record 字段在前端再次验证，ID 编码后写入路径。服务端排序应白名单校验字段。

```ts
interface ManagedUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'disabled'
}
interface ManagedRole {
  id: string
  name: string
  code: string
  permissions: string[]
}
interface AuditEntry {
  id: string
  actor: string
  action: string
  resource: string
  recordId: string
  at: string
}
```

真实授权接口仍是 `/api/permissions/current`，不是角色管理列表；服务端根据当前身份返回 permissions/roles/routes。审计应由服务端与事务一起记录，客户端不提供创建、修改或删除接口。

## 扩展业务

组织管理已通过模块契约注册。新增模块先声明自己的 routes、Provider 和资源定义，再加入项目模块清单；无需把业务 Provider 写进公共 Layout。接入步骤见[业务模块装配](MODULES.md)。

新增 feature 的 model 定义领域记录与 parser，api 实现 Provider 或领域请求，pages 消费契约。路由注册到项目中，menu/permission/title 放 route-policy；必要时扩展 PermissionCode 的资源类型。为真实契约、取消竞态、权限边界和核心用户流程增加回归。

当前 Provider 不提供服务端缓存、乐观更新、实时订阅、租户切换或工作流引擎。引入这些能力时应明确身份与缓存键、更新失效、冲突处理，并保留 adapter 接口。
