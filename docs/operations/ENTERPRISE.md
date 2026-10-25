# 企业资源与数据接入

## 可运行入口

```bash
pnpm run start:enterprise
pnpm run build:enterprise
PROJECT=enterprise pnpm run serve:dist
pnpm run test:e2e:enterprise
```

企业入口包含工作台、用户管理、角色管理、审计日志、认证和错误页；完整展示应用也注册这些管理页。演示环境使用 `admin@test.com` 超级管理员账号，账号登录说明见[快速上手](../development/GETTING_STARTED.md#演示配置与账号)。演示 Provider 的数据仅在当前应用根内保留，刷新页面后重置；演示角色编辑不改变登录权限。

Enterprise 开发和构建默认使用真实租户登录。需要查看演示 Provider 时，显式传入 `REACT_APP_USE_MOCK=true`；公开展示项目及 Pages 演示构建仍保留 Mock 登录和数据。

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

一个会话同一时刻只绑定一个活动租户，默认有效 8 小时。所有查询和写入强制使用服务端会话中的 tenant_id；可选 X-Tenant-ID 必须与会话一致，客户端不能用 header、body 或他租户 ID 改变范围。每次请求重新读取用户状态和角色权限，不缓存授权结论。停用/删除成员、改变角色/邮箱或重置该成员的本地密码会撤销该组织内对应会话；角色权限修改对现有会话的下一次服务请求生效。

schema v2 将 `principals`（身份）与 `users`/`tenant_memberships`（组织成员资料、组织角色和状态）分开，并保留租户内的本地密码凭据。活动组织由服务端 session 行的 tenant_id/user_id 表示。迁移时每条旧 user 独立创建 principal；不会按邮箱合并，也不会改变旧邮箱、角色、状态、密码、会话或审计记录。组织间的身份关联尚无公共 API 或管理页面；需要产品先确定 OIDC issuer、账号关联/解绑和角色映射规则。不能通过客户端提交 principalId/tenant header 建立关联。建议的 `(issuer, subject)` 身份键、显式绑定和本地角色默认见[OIDC 决策 ADR](../decisions/ADR-001-oidc-identity-and-tenant-roles.md)；此 ADR 待 owner 批准，OIDC 仍关闭。

若身份已经由可信运营流程关联到多个组织，账户菜单会列出当前身份的有效组织，并可切换工作区。`GET /api/auth/session/tenants` 只返回该 principal 的有效成员组织；`POST /api/auth/session/tenant` 将当前 session 切到其中一个成员关系。目标状态、角色和成员资格仍从 SQLite 读取，切换后前端销毁旧工作区页面/缓存并重新获取权限。接口不邀请成员、不合并账号、不允许客户端指定角色，也不返回新 bearer token。登录仍按“组织 + 邮箱 + 组织内本地密码”；组织间密码可不同，管理员重置密码只影响该组织成员，不会覆盖另一个组织的凭据。

角色权限必须来自路由策略和用户/角色 CRUD 权限目录，支持 `resource:*` 与 `*:*`；操作者只能授予自己已有的权限，也不能修改拥有更高权限的用户/角色。内置 tenant-admin 角色受保护，最后一名有效租户管理员不能停用、删除或降级。服务端校验唯一邮箱/代码、角色引用、排序白名单、分页和输入字段，不接收客户端 tenant_id/id/审计字段。

业务写入、相关会话撤销和审计插入使用 BEGIN IMMEDIATE 事务；审计失败时整个操作回滚。初始化、登录、注销也记录审计。审计 API 只读，数据库触发器拒绝 UPDATE/DELETE；拥有数据库文件管理权限的人仍能绕过触发器，不等于 WORM 或外部合规审计。

登录有每 IP 每 10 分钟 20 次的进程内限速。失败身份返回统一 invalid_credentials。生产应经 HTTPS/可信反向代理访问；当前默认信任直连 IP，代理后的共享 IP 限速需由部署方合理配置边缘策略。已有跨组织成员关系和活动组织切换；尚无自助注册、邀请、MFA、密码找回、OIDC/SSO、层级组织，以及供管理员使用的跨组织账号关联/解绑流程。

## Provider 契约

`platform/data/provider.ts` 暴露类型化 `DataProvider<Schema>`：list/getOne/create/update/remove。资源定义包含 path、unknown parser、readOnly。REST adapter 通过 JsonClient 接入已有 Axios/Fetch 核心；传递 AbortSignal，列表允许多个消费者请求相同资源而不互相取消。通用 Provider 不依赖 app 或具体业务资源。

`AdministrationProvider` 允许传入自定义 provider。没有传入时，`REACT_APP_USE_MOCK=true` 使用独立演示实例，否则选择 REST adapter；服务失败不会切回演示。可接入 REST、GraphQL 或其它服务，无需改页面。

## 资源 WebSocket 实时失效

Administration Provider 在真实业务会话下申请一次性事件票据，并订阅 `/api/events`；演示 Provider 与注入的自定义 Provider 不建立连接。登录 session token 只发送给已认证的 HTTP ticket endpoint，不进入 WebSocket URL 或 subprotocol。票据 30 秒有效、仅消费一次，绑定 session/principal/tenant；Origin 复用 API CORS 的精确白名单。

服务端 v1 消息契约只包括 tenant-scoped `users`、`roles`、`audit` 资源失效，不发送记录值、用户 ID 或 tenant ID。创建/更新/删除事务成功后发布主资源和审计资源；订阅/重放均按服务端当前 session、活动组织及 `user:read`/`role:read`/`audit:read` 授权。连接 15 秒重新验证会话和角色，注销、停用或组织切换会结束连接。session 当前角色权限更新后，之后的消息立即按新权限过滤。

事件 ID 使用当前进程 epoch 和租户内单调序号。保留最近 1000 条进程事件，票据只用于新建连接，断线重连通过 `lastEventId` 请求有限重放。首次连接、进程重启、游标非法或重放窗口已过期时服务端发 `reset`，客户端使当前身份下所有缓存失效再继续。客户端退避重试并重取票据；超时/状态码 4401 会清理已失效 session。

此方案保证单 API 实例内顺序和断线补偿；进程重启期间事件不会持久化，恢复通过 `reset` 全量失效实现。多实例之间尚无共享日志/发布，不可将多实例部署当作可用的实时一致性方案。若以后要跨实例，需先增加 transactional outbox 或等价持久顺序、去重与租户广播再扩容。

## SQLite 生产恢复验收

现有 CLI 已有迁移、备份 manifest、校验和恢复；新增 `api:db drill` 可用 owner 确认的 RPO/RTO 在目标数据库卷做临时恢复，检查并输出本地恢复预算。命令不会推断生产目标，也不包含主机、网络、密钥和人工恢复时间。没有真实部署库副本和已批准 RPO/RTO 时，生产旧库升级门禁仍未通过。完整输入清单、真实旧库迁移步骤和演练边界见[企业恢复 runbook](../runbooks/ENTERPRISE_RECOVERY.md)。

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

| 方法   | 路径                      | 行为                                                            |
| ------ | ------------------------- | --------------------------------------------------------------- |
| POST   | /api/auth/login           | {tenantId,email,password} → {token,tenantId,expiresAt,user}     |
| GET    | /api/auth/session         | Bearer → {tenantId,user}                                        |
| GET    | /api/auth/session/tenants | Bearer → {id,name}[]；仅有效成员组织                            |
| POST   | /api/auth/session/tenant  | {tenantId} → {tenantId,user,expiresAt}；复用当前 bearer session |
| DELETE | /api/auth/session         | 撤销当前会话，204                                               |
| GET    | /api/permissions/current  | 当前服务端角色生成 UserPermission                               |

企业 API 响应设置 Cache-Control:no-store。客户端 localStorage 保存一个当前会话；服务端只相信自己的会话表。跨标签页/同页换号销毁旧页面、Tab、KeepAlive 和业务缓存。过期自动清理；旧身份请求迟到的 401 不会退出新身份。客户端真实权限 TTL 为 60 秒，窗口重新聚焦强制同步，服务端授权始终逐次校验。资源 WS 可以通知会话失效并关闭连接，但角色权限变更不会推送新的 UI 权限快照；界面上的外部撤权由到期、聚焦或下一次请求同步。

## 扩展业务

组织管理已通过模块契约注册。新增模块先声明自己的 routes、Provider 和资源定义，再加入项目模块清单；无需把业务 Provider 写进公共 Layout。接入步骤见[业务模块装配](../architecture/MODULES.md)。

新增 feature 的 model 定义领域记录与 parser，api 实现 Provider 或领域请求，pages 消费契约。路由注册到项目中，menu/permission/title 放 route-policy；必要时扩展 PermissionCode 的资源类型。为真实契约、取消竞态、权限边界和核心用户流程增加回归。

## 数据缓存与部署限制

管理 Provider 装饰浏览器内存缓存，15 秒 TTL、最多 100 项，以会话实例和资源/查询/ID 隔离；相同查询共享请求，一个消费者取消不会中断其它消费者。成功写入通知列表和相关审计失效，角色修改同时刷新用户及角色目录；手动刷新绕过缓存。缓存不保存失败、旧身份结果或失效后的在途结果，卸载销毁；不使用 localStorage 保存业务记录。真实会话已有 WS 资源失效通知；尚未提供记录内容的实时订阅、后台刷新、乐观更新或服务端/分布式查询缓存。

真实后端适合单实例、持久卷自托管。生产显式配置 ENTERPRISE_ENABLED=true、持久卷中的 ENTERPRISE_DB_PATH、CORS_ORIGINS；如不部署 MongoDB，显式 TRACKING_STORE=memory（仅埋点会重启丢失）。业务数据库不会因此变成内存。SQLite 不能部署到 Vercel 临时文件系统，本实现检测 VERCEL 后拒绝开启；静态前端可继续在 Vercel，通过 APP_BASE_URL 或同源代理接入独立后端。

生产配置模板为根 `.env.enterprise.production.local.example`，API 镜像与持久卷由 `compose.enterprise.yaml` 管理。包含域名、HTTPS、初始化和只读演示账号的部署命令见[Vercel 与 SQLite 部署](../deployment/VERCEL_SQLITE.md)。需要 Vercel Functions 直接访问远程 SQLite/libSQL 时，须另行实现异步存储和事务适配；当前文件型 Store 不接受远程数据库 URL。

## SQLite 迁移、备份与恢复

schema v2 有版本号、迁移历史和 SQL checksum。API 启动只读校验 migration history、表列/约束、外键、关键索引、触发器定义、SQLite 完整性及成员关系一致性；发现待迁移数据库会拒绝启动并给出离线迁移命令，避免服务进程无备份地自动改表。v1 存量库只接受仓库旧版 EnterpriseStore 对应的冻结 schema 契约，结构不符时在备份和改表前拒绝升级。迁移使用单一 SQLite 事务；现存数据库升级前会用 `VACUUM INTO` 生成迁移前快照，生成 SHA-256 和权限/成员/凭据/会话/审计逻辑指纹 manifest。迁移提交前再次核对指纹。

运维命令从仓库根执行。`--db` 可覆盖 `ENTERPRISE_DB_PATH`；没有传时使用 `.env.development.local` 中的配置或开发默认路径：

```bash
pnpm run api:db -- status
pnpm run api:db -- backup /secure/backup/enterprise-before.sqlite
pnpm run api:db -- verify-backup /secure/backup/enterprise-before.sqlite
pnpm run api:db -- migrate
pnpm run api:db -- verify-db /data/enterprise.sqlite
```

`api:bootstrap` 会先运行迁移，再显式创建新租户管理员。备份先写入同目录临时文件，再以独占硬链接发布；备份目标必须不存在，同一路径并发时至多一个任务成功，失败方不会覆盖或删除胜出文件。SQLite 和 manifest 文件按当前主机权限设置为仅当前用户可读。正式迁移前仍要按部署方的 RPO/RTO 把已验证备份复制到独立持久位置，并停止 API；本地运行时会持有数据库锁，迁移/恢复不能与 API 并发执行。

备份校验会执行 SQLite 完整性、schema 契约和外键检查，再比对 SHA-256 与权限/成员/凭据/会话/审计逻辑指纹。恢复前先校验备份；默认恢复会将旧 schema 快照迁移到当前版本，目标已存在时先自动备份目标：

```bash
pnpm run api:db -- restore /secure/backup/enterprise-before.sqlite
```

回滚到旧应用版本时，可用 `restore <backup> --keep-schema` 原样还原快照，再立即部署与该 schema 兼容的旧应用。该操作会丢弃快照之后的写入；新 schema 不承诺能被旧应用原地打开。必须保留迁移前 artifact、备份和升级窗口的写入处理策略。恢复演练覆盖 v1 快照升级恢复、v2 覆盖恢复及旧 schema 保留恢复；当前仓库没有真实部署旧库文件，因此上线前仍需在真实旧库副本上复演，并由部署方提供 RPO/RTO。

若现存目标库无法通过 schema/数据校验，恢复仍会尝试以 SQLite `VACUUM INTO` 保存 `.pre-restore-unverified` 快照，再替换为已验证备份。该快照仅作故障现场保留，不是可用备份；CLI 会在 `previousSnapshot` 返回 `verified:false` 和校验失败原因。无法安全生成快照时恢复会中止，目标库保持原样。

当前前端仍在单 origin 保存一个活动会话，服务端支持多个独立 session；UI 尚未提供多身份并行工作区。SQLite 仍是单实例方案，没有外部审计归档或横向扩容保证。
