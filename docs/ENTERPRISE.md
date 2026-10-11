# 企业资源与数据接入

## 可运行入口

```bash
pnpm run start:enterprise
pnpm run build:enterprise
PROJECT=enterprise pnpm run serve:dist
pnpm run test:e2e:enterprise
```

企业入口包含工作台、用户管理、角色管理、审计日志、认证和错误页；完整展示应用也注册这些管理页。演示环境使用 `admin@test.com` 超级管理员账号，账号登录说明见[快速上手](GETTING_STARTED.md#演示配置与账号)。演示 Provider 的数据仅在当前应用根内保留，刷新页面后重置；演示角色编辑不改变登录权限。

## 已实现行为

用户支持列表、查询、分页、按姓名排序、添加、编辑、停用和删除。角色支持列表、查询、分页、创建、修改权限和删除；演示 Provider 拒绝重复邮箱/角色代码、无效角色引用，以及删除仍有成员的角色。用户编辑的角色选择目前最多加载 200 个角色；大规模组织应接入按需搜索接口。

每次成功演示写操作生成只读审计，最多保留 500 条。列表在卸载或查询变化时取消旧请求，失败展示重试；分页会在删除导致页码失效后调整。修改失败保留表单输入。页面与操作分别检查 user/role/audit 权限，支持中英文与移动端。

浏览器演示审计用于功能验证，不具备服务端不可篡改性。下面的真实模式由 `api/enterprise` 执行账号停用、会话撤销、授权与事务审计。

## 启动真实业务模式

要求 Node 24.15+，使用 Node 原生 TypeScript/SQLite；无需新增数据库依赖。根 `.env.development.local` 示例，初始化密码应使用你自己的值：

```dotenv
REACT_APP_USE_MOCK=false
APP_BASE_URL=
ENTERPRISE_ENABLED=true
TRACKING_STORE=memory
ENTERPRISE_BOOTSTRAP_TENANT=acme
ENTERPRISE_BOOTSTRAP_TENANT_NAME=Acme
ENTERPRISE_BOOTSTRAP_NAME=Administrator
ENTERPRISE_BOOTSTRAP_EMAIL=admin@example.com
ENTERPRISE_BOOTSTRAP_PASSWORD=<至少12个字符的自选密码>
```

```bash
pnpm run api:bootstrap
pnpm run start:enterprise:full
```

初始化命令一次性创建租户和 `tenant-admin`，已有同名租户返回冲突，不重置账号或密码。初始化后删除环境文件中的 `ENTERPRISE_BOOTSTRAP_*`；服务启动不读取这些变量，也不自动播种账号。新租户由运营人员重复执行初始化命令，账号按租户独立；相同邮箱在不同租户可有不同密码和权限。登录表单填写 tenant ID、邮箱和密码；退出后可登录另一个租户。

开发默认数据库 `api/data/enterprise.sqlite`，已被 Git 忽略，重启/刷新保留数据。可通过 ENTERPRISE_DB_PATH 指定位置。服务端密码使用随机盐 scrypt，32 字节随机会话 token 仅向登录客户端返回，数据库保存 token 的 SHA-256；没有固定管理员密码。管理页可设置新用户密码或重置现有密码，密码不会出现在列表/审计响应；省略密码创建的用户没有可用本地登录凭据。

## 服务端授权与一致性

会话只属于一个租户，默认有效 8 小时。所有查询和写入强制使用会话中的 tenant_id；可选 X-Tenant-ID 必须与会话一致，客户端不能用 header、body 或他租户 ID 改变范围。每次请求重新读取用户状态和角色权限，不缓存授权结论。停用/删除账号、改变角色/邮箱或重置密码撤销该账号的全部会话；角色权限修改对现有会话的下一次服务请求生效。

角色权限必须来自路由策略和用户/角色 CRUD 权限目录，支持 `resource:*` 与 `*:*`；操作者只能授予自己已有的权限，也不能修改拥有更高权限的用户/角色。内置 tenant-admin 角色受保护，最后一名有效租户管理员不能停用、删除或降级。服务端校验唯一邮箱/代码、角色引用、排序白名单、分页和输入字段，不接收客户端 tenant_id/id/审计字段。

业务写入、相关会话撤销和审计插入使用 BEGIN IMMEDIATE 事务；审计失败时整个操作回滚。初始化、登录、注销也记录审计。审计 API 只读，数据库触发器拒绝 UPDATE/DELETE；拥有数据库文件管理权限的人仍能绕过触发器，不等于 WORM 或外部合规审计。

登录有每 IP 每 10 分钟 20 次的进程内限速。失败身份返回统一 invalid_credentials。生产应经 HTTPS/可信反向代理访问；当前默认信任直连 IP，代理后的共享 IP 限速需由部署方合理配置边缘策略。尚无自助注册、邀请、MFA、密码找回、OIDC/SSO、层级组织或一个身份的跨租户成员模型。

## Provider 契约

`platform/data/provider.ts` 暴露类型化 `DataProvider<Schema>`：list/getOne/create/update/remove。资源定义包含 path、unknown parser、readOnly。REST adapter 通过 JsonClient 接入已有 Axios/Fetch 核心；传递 AbortSignal，列表允许多个消费者请求相同资源而不互相取消。通用 Provider 不依赖 app 或具体业务资源。

`AdministrationProvider` 允许传入自定义 provider。没有传入时，`REACT_APP_USE_MOCK=true` 使用独立演示实例，否则选择 REST adapter；服务失败不会切回演示。可接入 REST、GraphQL 或其它服务，无需改页面。

## REST API

以下接口已由可选企业后端实现，也可作为其它 Provider 的接入契约。关闭 mock 后失败不会退回演示数据；客户端按钮隐藏不能替代服务端授权。

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

POST/PATCH 用户额外接受 `password?: string`（12..256 字符，仅写入，不属于 ManagedUser 响应）。GET /api/roles 返回当前租户最多 200 个角色，要求 role:read；角色编辑选项仍需要该读取权限。

| 方法   | 路径                     | 行为                                                        |
| ------ | ------------------------ | ----------------------------------------------------------- |
| POST   | /api/auth/login          | {tenantId,email,password} → {token,tenantId,expiresAt,user} |
| GET    | /api/auth/session        | Bearer → {tenantId,user}                                    |
| DELETE | /api/auth/session        | 撤销当前会话，204                                           |
| GET    | /api/permissions/current | 当前服务端角色生成 UserPermission                           |

企业 API 响应设置 Cache-Control:no-store。客户端 localStorage 保存一个当前会话；服务端只相信自己的会话表。跨标签页/同页换号销毁旧页面、Tab、KeepAlive 和业务缓存。过期自动清理；旧身份请求迟到的 401 不会退出新身份。客户端真实权限 TTL 为 60 秒，窗口重新聚焦强制同步，服务端授权始终逐次校验；外部撤权后没有推送式即时 UI 更新。

## 扩展业务

组织管理已通过模块契约注册。新增模块先声明自己的 routes、Provider 和资源定义，再加入项目模块清单；无需把业务 Provider 写进公共 Layout。接入步骤见[业务模块装配](MODULES.md)。

新增 feature 的 model 定义领域记录与 parser，api 实现 Provider 或领域请求，pages 消费契约。路由注册到项目中，menu/permission/title 放 route-policy；必要时扩展 PermissionCode 的资源类型。为真实契约、取消竞态、权限边界和核心用户流程增加回归。

## 数据缓存与部署限制

管理 Provider 装饰浏览器内存缓存，15 秒 TTL、最多 100 项，以会话实例和资源/查询/ID 隔离；相同查询共享请求，一个消费者取消不会中断其它消费者。成功写入通知列表和相关审计失效，角色修改同时刷新用户及角色目录；手动刷新绕过缓存。缓存不保存失败、旧身份结果或失效后的在途结果，卸载销毁；不使用 localStorage 保存业务记录。它尚未提供后台刷新、乐观更新、实时订阅或服务端/分布式查询缓存。

真实后端适合单实例、持久卷自托管。生产显式配置 ENTERPRISE_ENABLED=true、持久卷中的 ENTERPRISE_DB_PATH、CORS_ORIGINS；如不部署 MongoDB，显式 TRACKING_STORE=memory（仅埋点会重启丢失）。业务数据库不会因此变成内存。SQLite 不能部署到 Vercel 临时文件系统，本实现检测 VERCEL 后拒绝开启；静态前端可继续在 Vercel，通过 APP_BASE_URL 或同源代理接入独立后端。

生产配置模板为根 `.env.enterprise.production.local.example`，API 镜像与持久卷由 `compose.enterprise.yaml` 管理。包含域名、HTTPS、初始化和只读演示账号的部署命令见[Vercel 与 SQLite 部署](VERCEL_SQLITE.md)。需要 Vercel Functions 直接访问远程 SQLite/libSQL 时，须另行实现异步存储和事务适配；当前文件型 Store 不接受远程数据库 URL。

schema user_version=1 由事务初始化，更新的未知 schema 拒绝打开。目前只实现首次建表，后续迁移、备份恢复、外部审计归档和横向扩容需建立独立运维方案。当前前端只有一个活动 origin 会话；多个并行身份需要独立 origin 或扩展会话 Provider。
