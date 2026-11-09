# Tavily Playground 与联网问答

入口为 `/#/ai-workbench`，默认显示 Tavily Playground。切换到「聊天与提示词工具」可使用[对话与提示词工作室](./AI_TOOLS.md)，URL 为 `/#/ai-workbench?view=workspace`；原 ChatGPT/Markdown 页面保持独立。

## 使用流程

1. 输入搜索问题，或选择示例带入参数；示例不会自动调用 API。
2. 设置搜索深度、主题、条数、时间范围及回答模式。高级参数提供限定/排除域名、正文格式与图片。
3. 点击「运行搜索」。已有有效会话时直接查询；没有会话时，程序会使用内置本地演示账号自动连接，成功后继续执行当前参数，不再弹出账号表单。连接和搜索均可取消，失败原因在页面内显示。
4. 运行后查看 Tavily 生成的回答、来源卡片、相关度、页面时间与可选正文；图片取决于参数和上游是否返回。
5. 「响应 JSON」显示服务端规范化的响应，可复制或下载；「请求代码」根据当前参数生成 cURL、JavaScript、Python 示例。
6. 修改参数后，上次成功结果仍绑定原搜索词，并提示参数已变化。再次运行、失败或取消会清除当前显示结果，避免误认旧结果为新响应。
7. 最近运行仅在内存中保留 5 次成功请求；恢复记录不会重新搜索，不额外消耗配额。退出账号、切换租户会取消正在运行的请求并清除参数、结果和历史；独立搜索连接断开或过期会保留草稿，清除结果和历史。

## 真实服务与演示边界

真实搜索需要有效 Enterprise session、`ai-workbench:read` 权限与 API 服务端的 `TAVILY_API_KEY`。默认演示账号可以调参、查看请求代码和原模拟聊天工具，但不会伪造真实搜索结果。

自动连接复用 `config/enterprise-demo.json` 中的本地账号，通过现有 `/api/auth/login` 登录与 `/api/auth/session` 撤销接口完成鉴权。搜索会话只保存在当前组件内存，不替换主应用登录、不写入浏览器存储；切换账号、断开或离开页面会尽力撤销该独立会话。取消/超时后迟到的登录会话也会撤销。服务端关闭 Enterprise API（503 `enterprise_not_configured`）、登录失败或要求二次验证时，只显示页面内错误，不弹出账号表单。主应用企业会话被服务端撤销时，仅在搜索层排除该凭据，下次运行自动连接演示账号。

API 项目配置 `TAVILY_API_KEY`，前端仅通过 `APP_BASE_URL` 访问本项目代理；不要将 Tavily key 放进 `REACT_APP_*` 或浏览器表单。部署方式见 [Vercel + Neon Enterprise API](../deployment/VERCEL_NEON_ENTERPRISE.md)。请求代码只引用服务端环境变量，示例直接调用官方 API；在浏览器运行需要改走本项目的鉴权代理。

本地 Vite 与 Webpack 开发代理均转发 `/api/ai`，沿用现有企业 API 地址和动态端口解析，不需要另行暴露 Tavily 官方接口。

默认应用在本机 `.env.development.local` 设置 `ENTERPRISE_LOCAL_DEMO=true` 和 `TAVILY_API_KEY` 后，重新运行 `pnpm start` 或 `pnpm run dev:vite`。启动器保留前端演示登录，准备独立演示库并启用企业 API；程序自动使用 `demo` / `admin@demo.local` / `DemoAdmin123!` 连接。正常从终端打印的默认页面访问即可（通常为 `http://localhost:8080/#/ai-workbench`），不依赖另一个临时预览服务。该开关不适用于生产、外部 API、自定义数据库或已有真实业务库。

问答使用 Tavily 的 `include_answer` 能力。它不代表已接入独立聊天模型，也不是逐 token 的 LLM 流式生成。对话工具保留本地模拟流，真实联网检索统一从 Playground 运行。

## 接口契约

`POST /api/ai/tavily-search` 使用企业 Bearer token 与 `X-Tenant-ID`。`Accept: application/json` 返回结构化结果；原 `Accept: text/event-stream` 继续返回兼容 SmartChat 的 SSE。

| 参数                                  | Playground 约束与默认值                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `query`                               | trim 后 1–400 个 Unicode 字符                                                  |
| `search_depth`                        | ultra-fast / fast / basic / advanced；默认 basic                               |
| `topic`                               | general / news / finance；默认 general                                         |
| `max_results`                         | 整数 1–20；默认 5。官方 API 允许 0，本界面限定可阅读的结果范围                 |
| `time_range`                          | day / week / month / year；默认省略                                            |
| `include_answer`                      | false / basic / advanced；默认 basic                                           |
| `include_raw_content`                 | false / markdown / text；默认 false                                            |
| `include_images`                      | 布尔值；默认 false                                                             |
| `include_domains` / `exclude_domains` | 各最多 20 个 hostname，支持 `*.`；去重、小写、IDNA，同一域名不能同时包含与排除 |
| `include_usage`                       | 界面固定 true，便于显示真实返回的用量                                          |

JSON 返回 `query`、`answer`、`results`、`images` 与可选 `responseTime`、`requestId`、`usage.credits`。来源保留 `title`、`url`、`content`、可选 `score`、`publishedDate`、`rawContent`。时间单位为秒；页面时间可能是上游估计的发布时间或最后更新时间，不作为严格发布日期。元数据缺失时不补造数值。

链接只保留无用户名密码的 HTTP(S) URL；最多 20 个来源和 20 张图片，正文和摘要有长度上限。响应 JSON 是经过验证与裁剪的本项目协议，字段名采用 camelCase，不是上游响应的逐字透传。

## 错误与取消

- 保留每用户/租户 20 次/10 分钟限流和 15 秒上游超时；前端 30 秒超时覆盖响应体读取。
- 未配置、权限不足、会话失效、请求参数错误、上游额度和网络故障分别显示可理解的提示。
- 供应商 429/434 映射限流，432/433 映射额度耗尽；供应商 key 错误不误报为用户登录过期。
- 取消会中止本项目请求，并忽略迟到响应；Tavily 已处理的请求仍可能计入配额。
- 原会话 SSE 与 JSON 通道共用校验、鉴权、限流、no-store 和连接断开取消。

## 实现与验证

界面位于 `src/pages/aiWorkbench/playground/`；`model.ts` 负责纯参数/响应/代码生成，`client.ts` 负责会话和请求生命周期。后端位于 `server/enterprise/tavily-search.cjs` 与 `router.cjs`。

相关验证命令：

```bash
pnpm run test:jest --runInBand src/pages/aiWorkbench/playground/model.test.ts src/pages/aiWorkbench/playground/client.test.ts src/pages/aiWorkbench/playground/connection.test.ts
node --test server/enterprise/tavily-search.test.mjs server/enterprise/tavily-router.test.mjs
node --test scripts/dev-proxy.test.mjs
pnpm run test:e2e tests/e2e/tavily-playground.spec.ts tests/e2e/search-connect.spec.ts
```

单元/API 测试注入模拟上游；浏览器测试拦截登录、撤销与搜索代理，并阻断直连 Tavily，覆盖连接、二次验证、配置错误、迟到登录撤销、主身份隔离、连接过期，以及参数、代码、结果、下载、历史、取消、重试、手机主题和原工具入口，不消耗真实查询额度。代理测试使用临时开发服务器和假 API 验证 JSON/SSE 与鉴权头转发。

官方依据：[Search API](https://docs.tavily.com/documentation/api-reference/endpoint/search)、[Quickstart](https://docs.tavily.com/documentation/quickstart)。本页参考官方协议建设 Playground 体验，未声明逐项复刻其登录后的界面。
