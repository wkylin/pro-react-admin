# Tavily Playground 与联网问答

## 意图与范围

用户选择先完善 Tavily Playground 与联网问答，保留现有聊天和提示词工具，独立聊天模型接入另行处理。沿用“产品工作室”的精致、有节奏、强调操作反馈方向。

## 方案与决定

- 在原聊天开关上堆叠参数：入口简单，但结果、参数和请求调试互相挤占。
- 在现有 AI 工作台内提供 Playground 与原工具两个视图：采用；原路由、权限、聊天和提示词能力继续可用，Playground 为默认视图。
- 新增全局助手并接入独立模型：本轮不采用，仓库尚无统一模型后端，用户已选择优先 Tavily。

## 体验

1. 左侧请求编辑器，右侧结果区域；手机按阅读顺序上下排列。沿用语义主题色、Geist、12px 面板圆角、24/16px 页面间距。代码使用等宽字体。以请求进度轨迹与结果状态反馈建立识别，不添加背景装饰动画。
2. 请求包含 query、search_depth、topic、max_results、time_range、include_answer、include_raw_content、include_images、include/exclude_domains。保持项目默认 basic/general/5 条/basic answer。公开 API 允许 0 条，当前 Playground 为可阅读搜索限定 1–20 条；域名列表各最多 20 个。
3. 可切换答案、来源、图片、响应 JSON、请求代码；代码提供 cURL/JavaScript/Python，仅使用环境变量占位，不包含真实凭据。展示真实返回的响应时间、请求 ID、相关度和用量，缺失时不虚构。
4. 联网问答使用 Tavily include_answer，显示来源及答案可用性；不把它描述为独立聊天模型或实时 token 生成。
5. 支持示例查询、重置、取消、失败重试、复制/下载响应、当前会话的最近运行及恢复参数。请求/结果不自动写 localStorage；退出账号或切租户时清除、取消，防止跨账号残留。
6. 结果绑定提交时的参数快照；编辑参数时可查看上次结果，明确上次运行的搜索词；失败或取消不能显示旧结果为此次成功。恢复历史仅恢复参数和已有结果，不自动再次消耗搜索次数。
7. 原工作台继续保留提示词、模拟流式聊天、联网搜索开关与事件工具；另一 ChatGPT/Markdown 页面保持原有能力。

## 前后端契约

- 同一 POST `/api/ai/tavily-search`；Accept application/json 返回结构化 JSON，旧 text/event-stream 保留兼容输出。请求经过服务端白名单、枚举、Unicode 字符长度、数值与域名校验。
- JSON 结构为 query/answer/results/images 与可选 responseTime/requestId/usage；来源内容是有上限的规范化响应，JSON 视图明确不是未经处理的上游透传。
- TAVILY_API_KEY 只在服务器读取；保留 Enterprise session、租户和 ai-workbench:read 校验、每用户/租户 20 次/10 分钟限流、15 秒上游超时、no-store 与客户端断连取消。
- 未登录企业账号、未配置、额度不足、超时、网络错误均展示明确状态；默认演示账号可调参数、看代码，真实运行需要有效企业会话。不静默回退成假搜索。

## 验证

纯模型与请求代码转义测试；客户端会话/错误/超时/取消测试；后端参数传递、URL 清洗、鉴权、限流和 JSON/SSE 兼容测试；浏览器拦截请求验证参数、回答与来源、历史、取消、重试、账号切换及手机明暗主题；原聊天和提示词工具入口回归。所有自动验证使用受控响应，不向真实 Tavily 消耗查询额度。

## 官方依据

- [Search API](https://docs.tavily.com/documentation/api-reference/endpoint/search)
- 具体参数以本轮在线核对的官方文档为准，工作区参考技能不是最新参数的唯一依据。
