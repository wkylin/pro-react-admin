# 企业 SQLite 升级与恢复演练

此 runbook 把当前仓库内可重复的维护流程变成部署门禁。它不会替部署 owner 决定 RPO/RTO，也不会把仓库 fixture 演练描述成真实旧库验收。

## 上线前必须由部署 owner 填写

| 字段 | 需要给出的值 |
| --- | --- |
| 数据库 | 目标主机上的旧库副本路径、schema 版本、文件大小和最近写入时间 |
| RPO | 允许丢失的最大业务写入时间，单位分钟 |
| RTO | 从恢复开始到 API 可服务的最长时间，单位分钟 |
| 备份 | 频率、保留期、异地/独立持久位置、加密和访问责任人 |
| 恢复演练 | 可写临时卷、目标 Node 24 版本、API 停机窗口、验收人 |
| 回滚 | 旧 artifact、兼容 schema、写入冻结/切换方案和明确的回滚截止时间 |

任一项未填写，或没有真实部署库副本时，生产迁移门禁保持未通过。不得以默认值推定业务可接受的数据损失或恢复时间。

## 快速备份与校验

```bash
pnpm run api:db -- backup /secure/backup/enterprise-before-upgrade.sqlite
pnpm run api:db -- verify-backup /secure/backup/enterprise-before-upgrade.sqlite
pnpm run api:db -- status --db /data/enterprise.sqlite
```

将 SQLite 文件和 `.manifest.json` 一并复制到独立持久位置。manifest 校验 SHA-256、schema 版本和权限/成员/凭据/会话/审计逻辑指纹；它提供损坏检测，不是签名、加密或防数据库管理员篡改的证明。

## 在目标卷测量恢复预算

```bash
pnpm run api:db -- drill /secure/backup/enterprise-before-upgrade.sqlite \
  --db /data/enterprise.sqlite --rpo-minutes <owner-approved-value> --rto-minutes <owner-approved-value>
```

`drill` 验证 backup manifest，将快照恢复到同一个数据库目录下的临时文件，运行 SQLite/schema/外键/业务指纹检查，测量该卷上的本地恢复与校验耗时，随后删除本次生成的临时目录。RPO 检查使用 manifest 创建时间作为最近可用备份年龄。超出任一阈值时命令返回非零并输出测量值。

此 RTO 只代表单机 SQLite 恢复和完整性校验，不包含人工响应、主机重建、网络/DNS 切换、密钥恢复、应用启动或业务确认。要宣称系统 RTO，必须在目标部署环境按真实事故路径计时。备份频率和复制延迟需另行监控，不能由一次 `drill` 保证。

## 真实旧库升级门禁

1. 从目标主机复制脱敏但结构/约束/数据量真实的数据库到隔离环境；记录旧 artifact、schema、用户/租户/角色/会话/审计基线及逻辑指纹。
2. 停止会写 SQLite 的所有 API 实例，确认目标卷有足够临时空间。先生成并校验迁移前备份。
3. 在副本运行 `verify-db`，再运行 `migrate`；工具会对已知旧版本创建迁移前快照，并拒绝未知/弱化 schema。
4. 再运行 `verify-db`，对比迁移前后租户成员、角色权限、本地凭据、有效会话和审计列表。重复邮箱仍不得被合并。
5. 用该备份执行 `drill`，记录目标 RPO/RTO 的实际测量、负责人和结论；恢复后再次校验相同权限和审计结果。
6. 执行旧 artifact 回滚演练：`restore <backup> --keep-schema`，随后只启动兼容该 schema 的旧 artifact。回滚会丢弃快照之后的写入，必须按批准的写入冻结/重放方案处置。
7. owner 签字后，才在维护窗口对真实库执行同一流程；保留命令输出、校验结果、备份位置、升级/回滚耗时和最终审批记录。

仓库内 `api/enterprise/fixtures/` 的旧 v1 fixture 用于代码回归；它没有真实部署数据量、损坏形态、文件系统或恢复限制，不能替代以上步骤。
