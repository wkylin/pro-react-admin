# Tavily Playground Implementation Plan

> **For agentic workers:** 使用 subagent-driven-development，将后端、客户端模型与界面任务分开实现并统一验证。用户已明确选定执行范围，连续实施；本轮不自动提交或推送。

**Goal:** 在现有 AI 工作台交付可调参、可查看来源与答案、可调试请求的真实 Tavily Playground，保留原工具。

**Architecture:** 原路由内提供 Playground 和旧工具视图。前端纯模型校验与 transport 分离；后端沿用鉴权代理，按 Accept 协商 JSON/SSE。

**Tech Stack:** React、TypeScript、Ant Design、CSS Modules/Less、Express/CommonJS、Jest、Node test、Playwright。

**Spec:** [设计](../specs/2026-11-09-tavily-playground-design.md)

## Global Constraints

- 不增加依赖，不把 Tavily key 下发浏览器，不修改原路由权限。
- 中英文、明暗主题、手机、键盘焦点和减少动态效果必须可用。
- 真实请求需要 Enterprise session；验证使用受控结果，不真实消耗查询额度。
- 保留原 SSE、提示词和聊天工作台，结果与请求快照绑定。

## Review Focus

- 请求在响应体读取中被取消或超时，不能迟到覆盖新运行。
- 退出账号、切租户和失效会话必须取消运行并移除旧结果/历史。
- 域名、请求代码和来源 URL 均视为外部输入；参数不能变成代码执行或危险链接。
- 参数编辑、重试和恢复历史必须区分当前草稿与已运行的快照。
- 返回 0 条、缺少 answer/meta、非 JSON 或额度错误应显示可理解的状态。

## Task 1: 服务端搜索契约

- [x] 扩展 tavily-search.cjs 白名单、规范化与结构化返回；保留原默认值与超时清理。
- [x] router.cjs 根据 Accept 返回 JSON 或旧 SSE，复用权限与限流。
- [x] Node 测试覆盖参数透传、非法参数、URL、超时、JSON/SSE 和鉴权。

## Task 2: 前端模型与 transport

- [x] playground/model.ts 提供请求/响应类型、默认值、校验、结果规范化和三种请求代码生成。
- [x] playground/client.ts 提供 typed error、会话请求头、超时与取消。
- [x] Jest 验证边界、代码转义、元数据和取消/错误状态。

## Task 3: Playground 界面与原工具整合

- [x] 原 AI 工作台增加 URL 可恢复的视图切换，保留旧聊天和提示词内容。
- [x] 实现参数面板、答案/来源/图片/JSON/代码视图、运行与取消、重试、复制下载和内存历史。
- [x] 通过请求 ID/AbortController 和 session 订阅隔离迟到结果与账号状态。
- [x] 补齐翻译、主题样式及 reduced-motion；仅为结果与状态变化加入短动效。

## Task 4: 集成验证与文档

- [x] Playwright 覆盖实际请求参数、历史恢复、取消/重试、隔离和手机主题；保留原工具入口回归。
- [x] 类型、lint、格式、i18n、路由、导入边界、文档及相关 API 测试。
- [x] 独立复核实现并修复有效问题；记录结果与实际运行边界。

## 完成与验证记录

- 按用户选定范围交付原路由内的 Playground，旧聊天、提示词与 SSE 行为保留。
- 前端模型/请求两组原 112 项测试通过，图片上限修复后模型组新增一项，78 项通过。
- API 全量回归 84 项通过；8 条 Playwright 端到端流程通过，额外单条截图验证通过。
- 应用/API/E2E 类型、ESLint、Stylelint、Prettier、国际化、路由、导入边界与文档检查通过。
- 独立复核发现的高级参数错误可见性、手机 DOM 顺序、来源链接 key、图片上限差异均已修复并定向复核。
- 1440×1000 桌面、390px 手机深色模式已目视检查，页面无横向溢出；完成状态和结果使用受控数据验证。
- 全部自动验证拦截/替换 Tavily 上游，未执行真实搜索或增加密钥；真实运行仍需有效企业会话与 API 服务端配置。

## 滚动与弃用警告修复

- 修正内层 Tabs 仍使用旧 DOM 选择器导致的高度断链。按项目主标签页的 `body-holder > body > content` 结构约束高度，继续由 FixTabPanel 滚动；仅使用 direct-child 规则，不影响内部详情页签。
- 两处旧 List 迁移至已安装版本的 Listy，使用非虚拟列表与稳定 rowKey，保留模板选择、应用和处理说明。
- 新增 content-scroll.spec.ts：桌面与手机两视图真实滚轮到底、切换后的滚动、弃用警告，共 5 项通过；原 Tavily 8 项浏览器流程亦通过。应用/E2E 类型、lint、格式、国际化与路由检查通过。
