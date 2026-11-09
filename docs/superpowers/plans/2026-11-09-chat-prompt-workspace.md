# 对话与提示词重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax for tracking.

**Goal:** 日常对话与提示词编辑各自清晰，调试能力按需打开，保留草稿和明确的演示边界。

**Architecture:** 外层只管理两个路由视图；workspace 独立承载对话、模板、设备存储和调试抽屉。复用 SmartChat 的实际类型和系统提示词接口。

**Tech Stack:** React、TypeScript、Ant Design、现有语义主题与 CSS Modules。

**Spec:** [已选设计](../specs/2026-11-09-chat-prompt-workspace-design.md)。

## Global Constraints

- 保留 Playground 的行为、连接和滚动；不调用额外付费服务。
- 提示词草稿、已应用内容和未发送输入相互独立。
- 不改变主应用登录，不保存服务凭据，不自动提交或推送。

## Review Focus

- 分区切换不能清空聊天草稿，编辑不能隐式应用。
- 停止与卸载后演示流释放定时器、监听，不继续入队。
- 身份切换不显示前一账号缓存；关闭保存删除当前缓存。
- 旧共享草稿不自动归属新账号。
- 手机长文本、抽屉和外层 Tabs 滚动可用。

## Task 1: 模型与本地流

**Files:** workspace/model.ts、model.test.ts、mockStream.ts、mockStream.test.ts、catalog.ts。

- [x] 类型化提示词、受限缓存、显式旧草稿读取和安全事件摘要。
- [x] 中英文 SSE 支持实际输入与系统提示词，完成/中止/取消统一清理。
- [x] 30 项模型与流单测、局部 lint / format 通过。

## Task 2: 工作区与编辑器

**Files:** index.tsx、workspace/ChatToolsWorkspace.tsx、DebugDrawer.tsx、PromptEditor.tsx、对应样式与双语资源。

- [x] 日常双分区与调试抽屉，移除旧总览和重复联网开关。
- [x] 显式应用、移除和撤销，保留聊天实例及输入。
- [x] 按账号保存提示词和设置；SmartChat 重置消息时同时清除旧错误。
- [x] 最终类型、样式、国际化与独立审查。

## Task 3: 浏览器与文档

**Files:** ai-tools.spec.ts、content-scroll.spec.ts、tavily-playground.spec.ts、使用指南。

- [x] 新工作区、Playground、滚动回归和桌面/手机截图通过。
- [x] 记录使用流程、保存与演示边界。
- [x] 收尾并交付，不提交。

## 验证结果

- 30 项模型与演示流单元测试通过。
- 22 个独立浏览器场景通过：工作区 9、滚动 5、Playground 8；主要操作视觉收尾后补验 3 个现有截图用例。
- 桌面对话、提示词编辑、手机暗色截图已查看；发送和应用操作清楚可见，长预览可滚动。
- 类型、国际化、导入边界、文档、格式及局部样式检查通过；独立审查的需求与质量两项均通过。
- 未发起真实认证或 AI 查询，未提交或推送；共享 SmartChat 原有两个 cancel hook 依赖警告未扩大处理。
