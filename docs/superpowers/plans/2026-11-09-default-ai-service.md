# 默认入口 AI 服务修复计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用户通过 `http://localhost:8080/#/ai-workbench` 使用本地演示账号连接并执行 Tavily 搜索，正常重启后仍可使用。

**Architecture:** 为默认全栈启动器增加显式、仅服务端的 `ENTERPRISE_LOCAL_DEMO=true`。复用现有受保护的演示库初始化；成功后才启用 Enterprise API，保留前端 Mock 登录及动态端口代理。

**Tech Stack:** Node.js 24、SQLite、Vite / Webpack、现有 Enterprise REST API。

**Spec:** [Tavily Playground 设计](../specs/2026-11-09-tavily-playground-design.md)；本次补充约束是默认 8080 入口可连接，不能只修复临时预览。

## Global Constraints

- 不将 Tavily key 写入源码、浏览器环境或可提交文件。
- 开关仅为本地默认应用显式开启；保留前端 Mock 登录。
- 生产、Vercel、外部 API、自定义数据库、bootstrap 配置及已有业务库不自动创建演示账号。
- 不自动提交，不重置现有工作区修改，不影响其它项目服务。

## Review Focus

- 启动器覆盖 `NODE_ENV` 前拒绝生产 / Vercel 开关。
- 初始化拒绝或失败时不能误启用默认业务数据库。
- 显式开关不改变 `REACT_APP_USE_MOCK`，且不会被注入浏览器。
- API 实际端口仍随端口占用选择，代理跟随。
- 验收必须访问用户的 8080 同源接口和真实页面。

## Task 1: 默认启动器与回归

**Files:** `scripts/dev-tracking.mjs`、`scripts/enterprise-demo.mjs`、`scripts/enterprise-demo.test.mjs`、`scripts/env.test.mjs`。

- [x] 增加失败测试：显式开关支持默认 Mock 前端；无开关和所有原有保护条件仍拒绝初始化；私有开关不进入公开环境。
- [x] 实现最小启动分支，演示库准备成功后才设置 `ENTERPRISE_ENABLED=true`。
- [x] 运行相关 Node 工具测试、ESLint、Prettier；独立审查保护条件和默认入口。

## Task 2: 本地配置、默认入口与文档

**Files:** 本机 Git 忽略的 `.env.development.local`、`docs/development/GETTING_STARTED.md`、`docs/development/TAVILY_PLAYGROUND.md`、`.env.development.local.example`。

- [x] 保留现有配置，仅在本机增加 `ENTERPRISE_LOCAL_DEMO=true`；模板只写注释示例。
- [x] 记录默认模式启动方式、账号和本地服务端 Tavily 配置，避免依赖临时端口。
- [x] 重启当前默认开发实例，保留 8080 与 5200，并验证首页、同源真实登录及一次最小基础搜索；验证会话用后撤销。
- [x] 从实际浏览器验证 8080 弹窗填入与连接；不自动发送额外搜索。

## 执行记录

- 基线：5200 与 8080 登录均返回 503 `enterprise_not_configured`；5192 临时入口登录返回 200。
- 决定：直接在用户授权的现有工作区修复，保留已有未提交功能，不另建工作树或提交。
- 已完成 19 项工具测试，独立审查通过；补充隔离共享配置开关，保留原 Enterprise 与其它项目的启动行为。
- 已确认旧运行锁持有进程不存在且 SQLite 文件无打开句柄，仅移除失效锁文件，保留数据库。
- 用户原 8080 首页、同源登录及真实基础搜索均返回 200，验证会话均已撤销；已停止先前的临时 5192 预览。
- 真实浏览器已通过填入账号、同源登录 200、弹窗关闭、搜索按钮可用及断开撤销 204；前端演示身份保持，浏览器未写入企业会话，未额外执行搜索。
