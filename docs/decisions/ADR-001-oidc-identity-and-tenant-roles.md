# ADR-001：OIDC 身份关联与组织角色边界

- 状态：待产品与部署 owner 决策
- 日期：2026-10-17
- 范围：OIDC issuer、外部身份绑定、组织成员关系和角色授权

## 当前事实

schema v2 已将全局 `principals` 与租户内 `users`、`tenant_memberships` 分开。旧库升级时每条旧用户记录仍保留为独立 principal，不按邮箱合并。当前登录继续使用“组织 ID + 组织内邮箱 + 本地密码”；还没有 OIDC 回调、身份绑定 API 或组织成员运营页面。

在 issuer、账号关联责任人和角色来源未确认前，生产 SSO 必须保持关闭。不能通过浏览器传入的 `tenantId`、`principalId`、邮箱或 IdP group claim 自动创建身份关联、组织成员或角色。

## 建议的安全默认值

以下内容是实现建议，不代表产品已经批准：

1. 外部身份唯一键使用经验证的精确 `(issuer, subject)`；`sub` 大小写敏感。只接受管理员配置的固定 issuer，并核对发现文档中的 issuer 与配置值完全一致。
2. 邮箱只作为展示/通知属性，不用于自动合并、登录关联或覆盖已有账号。未绑定的 OIDC 身份进入显式邀请/关联流程。
3. 关联到已有 principal 必须完成现有账号重新认证，并留下 actor、issuer、subject 哈希、组织范围和时间审计；解绑也要重新认证，且不能移除最后一种已验证的恢复凭据。
4. OIDC 只证明身份，不授予应用权限。角色和租户成员关系由租户内管理员在本地分配；默认忽略 token 中的 `groups`、`roles`、`tenant` 等授权声明。
5. 登录流程使用 Authorization Code + PKCE，验证 state、nonce、签名、issuer、audience、过期时间和一次性 code；回调 URL 使用精确白名单与 HTTPS。
6. issuer 变更视为身份边界变更。不得把旧 issuer 下的用户静默迁移到新 issuer；须经管理员审批并执行可审计的重新绑定。

## 需要外部 owner 确认的字段

| 决策 | 必填依据 | 未确认时的行为 |
| --- | --- | --- |
| issuer URL 与环境 | IdP 管理员提供开发/生产 discovery URL、issuer、JWKS 和变更联系人 | 不启用 OIDC |
| 客户端注册 | client ID、密钥托管、精确 redirect/logout URI、secret 轮换责任 | 不创建回调配置 |
| 账号绑定责任 | 用户自助重新认证、组织管理员审批或人工服务台；身份解绑与离职处理 | 禁止自动关联 |
| 租户发现与邀请 | 用户如何获得组织 ID、邀请 token TTL/撤销、未知租户响应 | 不从 IdP claims 创建成员 |
| 角色来源 | 是否始终由租户管理员分配；如映射 IdP group，提供稳定 claim、allowlist 和撤权时限 | 只使用数据库中的组织角色 |
| 会话与恢复 | SSO logout、IdP 停用传播时限、本地恢复账号/MFA 责任 | 不替换本地恢复路径 |

## 上线门禁

决定签字后，才新增 schema migration、OIDC 依赖和登录/关联端点。实现验收包括 issuer/audience/nonce/state/code 重放错误、错误邮箱碰撞不合并、同一 subject 跨组织角色隔离、撤权和解绑、并行会话、IdP 暂停、密钥轮换、账号恢复以及完整审计。还需确认浏览器 bearer token 的保存策略；当前会话使用 localStorage bearer token，不应在未完成 XSS/会话威胁评审前直接增加 SSO 登录。
