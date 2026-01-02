<div align="center">
  <img src="https://github.com/user-attachments/assets/f4d9bf1d-f45f-4c98-8bde-8c0b7144a120" alt="logo" height="120" />
</div>

<div align="center">
  <img src="https://img.shields.io/github/checks-status/wkylin/pro-react-admin/main" alt="check-status" />
  <img src="https://img.shields.io/github/workflow/status/wkylin/pro-react-admin/CodeQL" alt="build status" />
  <img src="https://img.shields.io/github/package-json/v/wkylin/pro-react-admin" alt="version-status" />
  <img src="https://img.shields.io/github/license/wkylin/pro-react-admin" alt="license" />
  <img src="https://img.shields.io/github/contributors/wkylin/pro-react-admin" alt="contributors" />
  <a href="https://deepscan.io/dashboard#view=project&tid=16370&pid=24083&bid=739580"><img src="https://deepscan.io/api/teams/16370/projects/24083/branches/739580/badge/grade.svg" alt="DeepScan grade" /></a>
  <a href="https://deepwiki.com/wkylin/pro-react-admin"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki" /></a>
</div>

## <span role="img" aria-label="rocket">🚀</span> Pro React Admin

**Pro React Admin** 是一款基于 **React v19** 的高性能、企业级中后台前端解决方案。具备双重架构设计，既是完整的企业级应用，也是可发布的组件库 @w.ui/wui-react。 深度整合 **RBAC 动态权限**、**KeepAlive 缓存**、**多标签页**与 **AI 智能助手**。提供开箱即用的国际化、暗黑模式、Mock 数据与 E2E 测试体系，助力开发者快速构建稳健、安全的 SaaS 平台与数据可视化系统。

---

## <span role="img" aria-label="globe">🌐</span> 在线预览

- **主应用 (Main App)**: [https://wkylin.github.io/pro-react-admin/](https://wkylin.github.io/pro-react-admin/)
- **主应用 (Vercel App)**: [https://pro-react-admin.vercel.app/](https://pro-react-admin.vercel.app/)
- **组件文档 (Storybook)**: [https://wkylin.github.io/pro-react-admin/storybook/](https://wkylin.github.io/pro-react-admin/storybook/)
- **导航页 (Portal)**: [https://wkylin.github.io/pro-react-admin/portal.html](https://wkylin.github.io/pro-react-admin/portal.html)

---

## <span role="img" aria-label="trophy">🏆</span> 项目亮点

- **<span role="img" aria-label="rocket">🚀</span> 极致性能体验**：基于 **React 19** 构建，重构 `KeepAlive` 缓存机制（采用 CSS 显隐策略替代 DOM 移动，大幅减少重排），配合 `useTransition` 实现丝滑的 Tab 切换与交互响应。
- **<span role="img" aria-label="puzzle">🧩</span> 丰富组件生态**：沉淀 **120+** 高质量业务组件，支持 **独立打包发布 (@w.ui/wui-react)**。集成 **Storybook** 实现组件可视化开发与文档管理，显著提升复用效率。
- **<span role="img" aria-label="shield">🛡️</span> 企业级权限体系**：完善的 **RBAC** 模型，支持路由、菜单、按钮级细粒度权限控制。内置路由自动过滤、`useSafeNavigate` 防越权跳转，保障系统安全。
- **<span role="img" aria-label="zap">⚡️</span> 前沿技术栈**：采用 **TypeScript v5** + **Ant Design v6** + **Vite v7/Webpack v5** 双构建模式，紧跟社区最新标准，提供最佳开发体验。
- **<span role="img" aria-label="robot">🤖</span> AI 智能化集成**：内置 ChatGPT 演示（支持 SSE 流式响应）、Markmap 思维导图生成、Mermaid 流程图渲染，探索 AI 在后台管理中的应用场景。
- **<span role="img" aria-label="test-tube">🧪</span> 全链路质量保障**：集成 **Playwright** E2E 自动化测试，配合 Mock Service Worker (MSW) 实现真实的网络模拟与多角色权限切换测试。
- **<span role="img" aria-label="mobile">📱</span> 极致移动端适配**：精心打磨的响应式布局，从 PC 到手机端提供一致的流畅体验。

- **<span role="img" aria-label="gear">⚙️</span> CI/CD 集成** ：GitHub Actions：自动构建部署到 GitHub Pages. Sentry 集成：可选的错误监控与源码上传
---

## <span role="img" aria-label="key">🔑</span> 核心功能

- <span role="img" aria-label="locked">🔐</span> **动态权限引擎**：登录后根据角色（Admin/Manager/Business/User）自动生成路由表，非权限路由自动拦截（403/404）。
- <span role="img" aria-label="bookmark-tabs">📑</span> **高性能多标签页**：支持 `ProTabs` 多页签切换，状态持久化保持，支持右键菜单（关闭其他/关闭所有/刷新）。
- <span role="img" aria-label="books">📚</span> **组件文档库**：集成 Storybook，提供 120+ 组件的交互式文档与预览，支持 Props 动态调试与独立测试。
- <span role="img" aria-label="satellite">📡</span> **健壮请求层**：封装统一请求库，支持并发控制、自动重试、取消重复请求、全局错误处理与消息去重。
- <span role="img" aria-label="bust-in-silhouette">👤</span> **登录/注册流程**：完整的登录鉴权流程，支持一键测试账号切换，实时同步权限状态。
- <span role="img" aria-label="bar-chart">📊</span> **数据可视化**：集成 ECharts、Recharts 等多种图表库，支持大数据量展示。
- <span role="img" aria-label="memo">📝</span> **富文本与文档**：支持 Markdown 实时渲染与编辑、代码高亮、数学公式解析。
- <span role="img" aria-label="clapper-board">🎬</span> **多媒体支持**：内置音频/视频播放器，支持 Tab 切换自动暂停/恢复播放，优化资源占用。
- <span role="img" aria-label="earth">🌍</span> **主题与国际化**：内置明亮/暗黑模式一键切换，支持多语言（i18n）动态切换。
- <span role="img" aria-label="test-tube">🧪</span> **Mock 数据模拟**：基于 Faker.js 和 MSW 的纯前端 Mock 方案，脱离后端独立开发。
- <span role="img" aria-label="package">📦</span> **组件库发布**：支持将 `src/components` 独立打包为 NPM 库 (`@w.ui/wui-react`)，提供 ESM/UMD 格式，支持按需加载与类型提示。

---

## <span role="img" aria-label="toolbox">🧰</span> 技术栈

- <span role="img" aria-label="atom">⚛️</span> **Core**: React v19 / TypeScript v5
- <span role="img" aria-label="art">🎨</span> **UI**: Ant Design v6
- <span role="img" aria-label="compass">🧭</span> **Router**: React Router v7
- <span role="img" aria-label="zap">⚡</span> **Build**: Vite v7 / Webpack v5
- <span role="img" aria-label="test-tube">🧪</span> **Test**: Playwright / Jest / Testing Library
- <span role="img" aria-label="test-tube">🧪</span> **Mock**: Mock Server（Faker/MSW）
- <span role="img" aria-label="straight-ruler">📏</span> **Lint**: ESLint / Prettier / Husky / Commitizen
- <span role="img" aria-label="magnifying-glass">🔍</span> **Quality**: Sentry / SonarQube / DeepScan
- <span role="img" aria-label="whale">🐳</span> **Deploy**: Docker / Nginx / Github Actions

---

## 📁 目录结构

```text
pro-react-admin/
├── src/
│   ├── actions/           # Redux/Action 相关
│   ├── assets/            # 静态资源
│   ├── components/        # 业务组件
│   ├── config/            # 配置文件
│   ├── hooks/             # 自定义 hooks
│   ├── i18n/              # 国际化
│   ├── mock/              # Mock 数据
│   ├── pages/             # 页面模块
│   ├── reducers/          # Redux Reducer
│   ├── routers/           # 路由配置
│   ├── service/           # 请求与服务
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── theme/             # 主题相关
│   ├── utils/             # 工具函数
│   ├── App.tsx            # 应用入口
│   └── index.tsx          # 渲染入口
├── public/                # 公共资源
├── tests/                 # 测试用例
├── docs/                  # 文档
├── scripts/               # 脚本
├── api/                   # Mock API 服务
├── ...
```

---

## 🚀 快速开始

```bash
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
npm install
npm run dev
```

提示：运行 `npm run lighthouse` 前请先启动 dev server（例如先执行 `npm run dev`/`npm run start`）。

更多用法详见 [详细文档](./docs/README_PERMISSION.md) 与 [用户角色权限说明](./docs/USER_ROLE_PERMISSION.md)。

---

## 📝 近期主要更新

- ⚡ **性能优化**：重构 `KeepAlive` 实现，支持 React 19 `<Activity>` (Offscreen) 原生冻结，降级模式采用 CSS 显隐替代 DOM 移动，大幅减少重排
- 🎨 **体验优化**：`ProTabs` 切换引入 `useTransition`，交互响应更流畅；`global-loader` 移除逻辑优化，消除首屏白屏与卡顿
- 🎬 **媒体控制**：音视频组件（MusicPlayer/Video）支持 Tab 切换自动暂停/恢复播放
- 🛠️ **开发体验**：`KeepAlive` 支持 HMR 热更新，开发调试状态不丢失
- 🛡️ **权限体系**：重构支持缓存、过期、强制刷新、单例获取，避免重复请求和竞态
- 🛣️ **路由过滤**：路由与菜单权限自动过滤，首页对所有账号可见
- 🔒 **安全跳转**：`useSafeNavigate`/`SafeLink` 封装，防止越权跳转
- 📡 **请求重构**：支持并发/串行/重试/取消/全局错误处理
- 🔔 **消息去重**：全局消息去重，避免重复弹窗干扰
- 🎭 **Mock 增强**：多角色切换与权限同步
- 🧪 **E2E 测试**：Playwright 核心场景覆盖
- 📚 **文档完善**：文档与示例持续更新
- **📦 组件库独立打包**: 新增 `@w.ui/wui-react` 组件库构建流程，支持 Vite Library Mode 打包 ESM/UMD 格式。
- **🚀 发布流程自动化**: 集成 `standard-version` 版本管理与 NPM 发布脚本，支持 Scoped Package 发布。
- **🎨 组件重构与优化**: 样式重构，适配移动端与暗黑模式。交互优化，支持自定义提示与自定义样式。规范化导出结构，修复模块解析问题。
- **🛠️ 构建配置升级**: 完善 `vite.config.lib.ts`，配置路径别名 (`@assets`, `@hooks` 等) 与外部依赖，确保构建产物纯净。

---


## 🏗️ 技术架构

<img width="1903" height="387" alt="Snipaste_2025-12-31_09-14-38" src="https://github.com/user-attachments/assets/915ba91a-8852-4dc0-8a14-091e781d9f04" />

---

## 🦄 脚手架--白泽 baize

> **白泽**，中国古代神话中的瑞兽。能言语，通万物之情，知鬼神之事，“王者有德”才出现，能辟除人间一切邪气，可令人逢凶化吉。
>
> 本项目取名"白泽"，寓意作为开发者的瑞兽，帮助您辟除配置烦恼，逢凶化吉，快速启动高质量项目。

Baize CLI 是一个轻量、规范且高效的前端项目脚手架工具，旨在帮助开发者快速搭建基于 React、Vue 等现代框架的标准化项目结构。

  - <span role="img" aria-label="rocket">🚀</span> 快速启动：秒级生成项目模板，开箱即用。
- 🛠 规范集成：内置 ESLint、Prettier 等代码规范配置。
- 🎨 交互友好：优雅的命令行交互体验。
- 🌏 线上地址：[Baize](https://www.npmjs.com/package/baize-cli)

```bash
  > npm install -g baize-cli
  > baize
```

## 🔍 自动化持续代码审查工具

1. [DeepSource/](https://deepsource.io/)
2. [DeepScan](https://deepscan.io/)
3. [SonarQube](https://www.sonarsource.com/)

---

## 🐳 本地部署 SonarQube

1. [SonarQube for Mac](https://juejin.cn/post/7210005376652886077)
2. [Gitlab for Mac](https://juejin.cn/post/7210746685802397755)
3. [Gitlab CI/CD for Mac](https://juejin.cn/post/7214686619097874491)

---

## 📖 贡献指南

欢迎 PR、Issue 与 Star！

1. Fork 本仓库
2. 新建分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'feat: 新增 xxx 功能'`
4. 推送分支：`git push origin feature/xxx`
5. 新建 Pull Request

---

## 📄 License

Apache-2.0 © [wkylin](https://github.com/wkylin)

---

## 📝 约定式提交

1. [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
2. [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)

---

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wkylin/pro-react-admin&type=Date)](https://star-history.com/#wkylin/pro-react-admin&Date)

</div>
