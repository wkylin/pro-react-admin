# 文档导航

按任务进入对应文档。项目的当前架构以 [技术架构](./architecture/ARCHITECTURE.md) 为准；本地运行从 [本地开发指南](./getting-started/LOCAL_DEVELOPMENT.md) 开始。

## 开始使用

- [本地开发与联调](./getting-started/LOCAL_DEVELOPMENT.md)：环境准备、应用启动、独立项目、微前端联调和本地预览。

## 架构

- [技术架构与代码地图](./architecture/ARCHITECTURE.md)：应用启动链路、模块边界、数据流和新增功能的推荐路径。
- [多项目模式](./architecture/MULTI_PROJECT.md)：项目入口、路由覆盖和新增子项目。

## 构建与部署

- [Vite 构建](./build/VITE_BUILD.md)：应用、组件库、Storybook、GitHub Pages 和微前端构建命令。
- [部署说明](./build/DEPLOY.md)：GitHub Pages 与 Storybook 部署流程。
- [微前端部署](./build/MFE_DEPLOYMENT.md)：Module Federation 本地联调、产物和 Vercel 部署。
- [组件库构建与发布](./build/COMPONENT_LIBRARY.md)：库入口、npm 产物和发布流程。

## 开发指南

- [请求与 API 层](./development/REQUESTS.md)：统一请求客户端、配置项和业务 API 的放置方式。
- [接口加密](./development/REQUEST_ENCRYPTION.md)：请求层加密功能及密钥边界。
- [路由与权限](./development/ACCESS_CONTROL.md)：RBAC、路由守卫、菜单和组件级权限。
- [组件库导出约定](./development/COMPONENT_EXPORTS.md)：内部组件索引与 npm 对外 API 的区别。
- [ESLint 排查](./development/ESLINT.md)
- [Sentry 配置](./development/SENTRY.md)
- [SVG 工具](./development/SVG_TOOLS.md)
- [FFmpeg 安装](./development/FFMPEG_INSTALLATION.md)

## 功能说明

- [响应式表格](./features/RESPONSIVE_TABLE.md)
- [大屏图表重绘](./features/ECHARTS_BIGSCREEN_REINIT.md)
- [埋点 SDK](./features/TRACKING_SDK_ARCHITECTURE.md)
- [视频播放器](./features/VIDEO_PLAYER_GUIDE.md)
- [Markdown 编辑器](./features/mdx-editor.mdx)

