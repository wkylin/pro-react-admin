# 联系与反馈：渠道、留言与发送边界

默认展示应用的联系与反馈页位于 `/#/contact`。页面使用统一的工作台布局，提供项目邮箱、GitHub Issues、项目指南与留言表单。启动与登录方式见[快速上手](./GETTING_STARTED.md)。

## 选择联系渠道

| 需求                             | 入口                                                              | 来源                                            |
| -------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| 私下联系、合作咨询               | [wkylin.w@gmail.com](mailto:wkylin.w@gmail.com) 或本页留言表单    | `package.json#bugs.email` 与既有联系页面        |
| 可公开的问题、复现步骤与功能建议 | [GitHub Issues](https://github.com/wkylin/pro-react-admin/issues) | `package.json#bugs.url`                         |
| 了解运行、模块与接入方式         | [项目指南](https://github.com/wkylin/pro-react-admin#readme)      | 仓库 README；完整文档见[文档索引](../README.md) |

Issues 会公开内容；涉及个人信息的反馈请使用适合的联系渠道。页面不提供客服在线状态、回复时效或自动创建的工单记录。

## 留言流程

1. 填写姓名、回复邮箱、咨询类型、主题与内容。姓名为 1–80 字，邮箱最多 254 字，主题为 2–120 字，内容为 10–4000 字；提交前清理字段两端空白。咨询类型包括使用咨询、问题反馈、功能建议与合作咨询。
2. 真实 Enterprise 或 GitHub 身份可使用账号已有的姓名与邮箱作为初始值，仍可编辑。虚构测试账号不自动填入演示邮箱；GitHub 未提供邮箱时由用户填写。
3. 点击发送后，表单通过 Web3Forms 转交留言。发送期间禁用重复提交与编辑；成功需要 HTTP 成功且响应对象的 `success` 严格为 `true`，此时显示发送服务已接收并恢复初始表单。这不表示邮件最终投递成功，也不表示人工已经回复。
4. 被拒绝、限流、网络异常、15 秒超时或异常响应时保留草稿，由用户决定是否重试，不自动重发。网络与超时表示结果未确认：请求可能已经到达服务商，不能据此断定未发送。
5. 切换工作台标签可保留当前草稿，清空已填写内容需确认；刷新或离开页面前有未保存内容时使用浏览器原生提示。草稿只保存在当前页面会话内，不写入 localStorage 或服务端；刷新后不恢复。切换账号或租户会重新挂载表单并中止旧请求，避免带入上一身份草稿。

未配置发送 key 时，表单说明停用原因并禁用发送，邮箱、Issues 与指南入口仍可使用。

## 公开配置与停用

`REACT_APP_WEB3FORMS_ACCESS_KEY` 是 Web3Forms 允许用于浏览器集成的公开表单标识，用于将留言路由到对应表单。它会出现在浏览器构建和提交请求中，不是服务器密钥。其公开用途见 [Web3Forms 排查指南](https://docs.web3forms.com/getting-started/troubleshooting)；客户端 FormData 与 `success` 响应协议见 [Web3Forms React 示例](https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/simple-react-contact-form)。

共享 `.env` 保留既有页面的公开 key，以维持原有默认收件配置。部署自己的项目时，在本地环境文件或 CI 中覆盖为自己的 key。复制[开发环境模板](../../.env.development.local.example)或[生产环境模板](../../.env.production.local.example)后设置：

```dotenv
# 使用自己的公开表单标识
REACT_APP_WEB3FORMS_ACCESS_KEY=your-public-web3forms-access-key
```

显式空值可停用发送；删除覆盖项会重新沿用共享 `.env` 的默认配置：

```dotenv
REACT_APP_WEB3FORMS_ACCESS_KEY=
```

环境文件按 `.env`、`.env.local`、`.env.<mode>`、`.env.<mode>.local` 覆盖，已存在的 shell/CI 变量优先，空值也会保留。开发覆盖通常放在 `.env.development.local`，生产覆盖放在 `.env.production.local` 或部署平台的构建环境变量。更改后需要重启开发服务或重新构建；静态部署不会在运行时重新读取环境文件。

该变量加入 [共用浏览器白名单](../../build/client-env.js)，Webpack 与 Vite 都通过 `__APP_ENV__` 注入，业务代码使用 [getEnv](../../src/platform/config/env.ts) 读取。不要将邮箱密码、服务端 API 凭据或私钥填入该变量；其他环境契约见[构建指南](./BUILD.md)。

## API 与路由边界

- 本页保留既有 `https://api.web3forms.com/submit` 客户端 POST 链路，不新增项目后端邮件接口、数据库、CRM 记录或工单资源，也不调用管理员通知接口。
- [页面](../../src/pages/contact/index.tsx)负责渠道、标签、校验反馈、发送状态和会话内草稿；[模型与发送适配](../../src/pages/contact/model.ts)负责字段校验、白名单载荷、响应解析、超时与取消，不发送登录 token 或权限信息。
- 本页只在默认展示应用注册，继续使用 `/contact` 路由与 `contact:read` 策略；本轮不扩展 Enterprise 应用路由或权限。
- 接收对象由部署者配置的 Web3Forms 表单决定。页面上的公开项目邮箱与该表单的实际收件配置是两件事，代码无法核实服务商后台配置或邮件最终投递结果。

## 无真实留言的验证

模型测试注入模拟 fetch；浏览器测试拦截 Web3Forms 提交地址并返回模拟响应。不要为了验证页面向既有表单发送测试留言，也不要在测试中创建真实 Issues 或发邮件。

```bash
node --test scripts/env.test.mjs
pnpm exec jest --config tests/unit/config.cjs --runInBand src/pages/contact/model.test.ts
pnpm run typecheck
pnpm run test:e2e:typecheck
pnpm run check:i18n
pnpm run check:route-contract
pnpm run check:docs
```

默认应用先构建，再执行拦截请求的浏览器场景：

```bash
pnpm run build:webpack
pnpm exec playwright test --config tests/e2e/config/app.config.ts tests/e2e/contact.spec.ts tests/e2e/route-tabs.spec.ts
```

验证范围包括严格成功判定、失败保留与重试、请求锁、清空确认、账号切换隔离、切标签草稿恢复，以及手机深色布局。环境测试覆盖公开 key 注入和显式空值停用。实际执行结果以本轮验收记录为准；模拟结果不验证服务商后台收件配置、配额或最终邮件投递，开发服务验收也不代替生产构建和部署验证。

## 本轮本地验收

2026-11-09，本地 Vite 工作区验收结果：

- 留言模型 77 项、公开环境配置 3 项测试通过，覆盖字段约束、严格成功判定、网络/业务错误及 fetch 和 JSON 阶段的超时/取消。
- 浏览器 13 项回归通过：8 项 Contact 场景与 5 项 route-tabs 场景。发送请求均被拦截，覆盖失败保留、成功清空、请求锁、停止等待、账号权限隔离、清空确认、邮箱复制及手机发送按钮滚动到达。
- 独立空 key 预览确认发送按钮禁用、回退提示和邮箱渠道可用。桌面浅色与 390px 深色截图已检查，独立代码审阅通过。
- 应用/E2E 类型、i18n、路由契约、导入边界、受影响文件格式和文档检查通过。关联修复了空标签操作层拦截点击的问题，使 Contact 切换标签后的草稿回归恢复通过。

本轮没有投递真实留言，也未执行生产构建或部署；服务接收与最终邮件投递仍按上文区分。
