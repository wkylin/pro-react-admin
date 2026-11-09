# 聊天室输入区重构计划

> **For agentic workers:** Use subagent-driven-development or executing-plans. Follow checkbox tasks without stopping at a proposal.

**Goal:** 落实用户确认的聊天室输入区和配套交互，所有工具有真实行为，私密备注不广播。

**Architecture:** 保留现有传输层；纯编辑与安全显示独立模块，输入组件处理选区和工具，workspace 管理房间/备注/发送快照。

**Tech Stack:** React、TypeScript、Ant Design、Markdown、既有 XMPP。

**Spec:** [已确认设计](../specs/2026-11-10-chat-composer-design.md)。

## Global Constraints

- 不改外部后端，不增加虚假的上传、模型生成、已读或在线能力。
- 备注与普通消息完全分离；退出或换账号清除。
- 保留草稿、IME、4000 字符和迟到请求隔离。
- 不读写凭据、不发送真实公共消息、不提交或部署。

## Review Focus

- Internal note 永远不调用 groupchat。
- 格式/引用后的实际长度不能突破限制或丢失原稿。
- 工具打开后房间或身份改变，迟到插入不能写入另一会话。
- 消息中的链接、HTML、图片不执行危险内容或自动追踪请求。
- 手机输入工具、消息滚动、房间详情和返回路径可用。

## Tasks

- [x] 编辑模型、安全 Markdown 与附件链接显示及边界测试。
- [x] 输入卡片、选区工具、链接对话框与本地写作助手。
- [x] workspace 私密备注、发送快照、列表与详情交互接线。
- [x] 中英文文案、样式、使用文档与独立审查。
- [x] 受控浏览器回归、明暗主题与手机截图验证。

## 验证记录

- 模型、编辑、API、实时通道和 workspace 共 172 项单元测试通过。
- 原聊天室与新输入区共 22 个浏览器场景通过；手机布局精修后补跑明暗两例。
- 独立审查修复了引用原文在消息被移除后仍被保留的问题，并增加浏览器回归。
- TypeScript、ESLint、Stylelint、Prettier、中英文键、导入边界与文档检查通过。
- 浏览器使用受控 REST/XMPP 模拟，不调用真实聊天室、上传或 AI 服务。
