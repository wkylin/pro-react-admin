# Vercel + Neon 恢复演练

本手册适用于独立 Enterprise API Vercel 项目和 Neon PostgreSQL。演练先在 Neon 的隔离分支完成；生产分支恢复会改变在线数据，必须由环境负责人在维护窗口决定恢复点、写入处理和切换方案。SQLite 的单卷流程见 [Enterprise Recovery](./ENTERPRISE_RECOVERY.md)。

## 演练前记录

| 项目 | 记录内容 |
| --- | --- |
| 责任人与窗口 | 值班人、数据库 owner、前端/API 发布版本、演练开始时间 |
| 数据库 | Neon 项目、生产分支、当前 schema、实际 history restore window、快照/异地备份策略 |
| 恢复预算 | 经业务批准的 RPO、RTO，以及从哪一个事件开始计时 |
| 接入 | API 生产域名、独立测试部署或本地 API、测试分支连接方式、TOTP 密钥保管人 |
| 基线 | 在恢复点附近记录租户、用户、角色、审批和审计数量，以及最新审计序号 |

不要把数据库 URL、账号密码、会话或租户记录写入演练工单。生产库连接仅用于只读基线核验；隔离分支应限制访问，且不要把它接到公开预览站点。

## 隔离分支恢复

1. 在 Neon 控制台确认生产分支的可恢复时间窗，选择窗内的时间点 `T0`。记录生产库只读基线和 API `/api/health` 状态。
2. 从生产分支的 `T0` 创建**新分支及独立计算端点**，命名含演练日期。核对目标是新分支；不要选择覆盖生产分支的 Restore 操作。Neon 支持从历史时间点创建独立分支，原分支继续服务。[Neon 分支恢复说明](https://neon.com/blog/recover-production-database)
3. 把新分支的 pooled 连接地址写入受保护的临时环境文件，运行 `pnpm run api:pg status`，预期 schema 与生产一致。对新分支执行下列只读查询，与 `T0` 基线比较；若生产在 `T0` 后继续写入，应以该时间点的基线为准。

   ```sql
   SELECT (SELECT count(*) FROM tenants) AS tenants,
          (SELECT count(*) FROM users) AS users,
          (SELECT count(*) FROM roles) AS roles,
          (SELECT count(*) FROM access_requests) AS access_requests,
          (SELECT count(*) FROM audit) AS audit,
          (SELECT coalesce(max(seq), 0) FROM audit) AS latest_audit_seq;
   ```

4. 用**仅连接该分支**的 API 实例验证健康检查、测试账号登录、管理读写、权限拒绝与审计写入。记录从开始创建恢复分支到业务检查通过的总耗时；API 准备、密钥加载和连接切换都计入系统 RTO。
5. 在隔离分支上写入可识别的演练记录，再把**该隔离分支**恢复到写入前的时间点，确认记录消失、原有授权和审计仍可用，生产分支无变化。记录恢复耗时、失败步骤和证据链接。若当前 Neon 套餐或权限不支持此操作，记录实际限制，不能把分支创建当成已完成的恢复演练。
6. 演练完成后按数据保留规则处理隔离分支和临时凭据。2026-10-28 的实测中，隔离分支自恢复自动生成 `_old_...` 旧状态备份，且默认 `Expires: Never`；必须核对其分支 ID、保留期限并清理不需要的永久副本。工作分支的到期时间也可能在恢复后延长。若分支包含真实生产数据，删除前核对是否需要保留审计证据。

## 真实故障时

先冻结或隔离异常写入，记录事故起点、最后可靠写入和当前恢复时间窗。优先创建历史分支，检查目标数据并决定是只回填受损记录，还是整体切换。整体回退可能丢弃恢复点后的写入；需先明确重放或放弃方案，再由数据库 owner 执行。Neon 的分支恢复可以保留原分支用于排查，也可以切换计算端点，具体步骤应按当时控制台能力确认。[Neon 恢复路径](https://neon.com/blog/recover-production-database)

恢复后依次验证 `api:pg status`、`/api/health`、登录、租户隔离、角色授权、审批和审计；重新确认 `DATABASE_URL_UNPOOLED` 连接的是预期分支，并检查事件通知。记录实际数据损失窗口和端到端恢复耗时，与批准的 RPO/RTO 比较。只有完成这些检查，才把 API 重新纳入正常流量。

## 告警联动

Vercel 的默认异常告警依赖 5xx 数量和历史基线，低流量环境未必能靠一次故障探针触发。自定义规则需要相应订阅；若当前项目不可用，应选用独立的健康检查服务。[Vercel Alerts](https://vercel.com/docs/alerts) 因此演练需单独核对健康检查告警的条件、通知渠道、接收人、确认时间和解除时间。在隔离预览环境制造受控故障并验证完整通知链路；不要为了触发统计异常而向生产 API 连续发送 5xx 请求。
