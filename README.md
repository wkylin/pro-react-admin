# Pro React Admin

基于 React 19、TypeScript 和 Vite 的中后台应用与组件库示例工程。当前架构采用单一 Vite 工具链，支持默认应用、多项目入口、可复用组件库和按需启用的 Module Federation 微前端。

## 在线预览

- [主应用（GitHub Pages）](https://wkylin.github.io/pro-react-admin/)
- [主应用（Vercel）](https://pro-react-admin.vercel.app/)
- [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)
- [Portal](https://wkylin.github.io/pro-react-admin/portal.html)

## 本地启动

环境要求：Node.js 24.x、pnpm 11.5.2。

```bash
git clone --branch vite https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
corepack enable
corepack prepare pnpm@11.5.2 --activate
pnpm install --frozen-lockfile
pnpm run dev
```

默认应用访问 <http://localhost:5173/>。完整的项目启动、微前端联调和预览方式见[本地开发指南](./docs/getting-started/LOCAL_DEVELOPMENT.md)。

## 常用命令

| 目标 | 命令 |
| --- | --- |
| 启动默认应用 | `pnpm run dev` |
| 启动 ProjectA / ProjectB | `pnpm run dev:projectA` / `pnpm run dev:projectB` |
| 启动 Storybook | `pnpm run storybook`（<http://localhost:6006/>） |
| 构建并预览 Storybook | `pnpm run build-storybook`，再运行 `pnpm run serve:storybook`（<http://localhost:6007/>） |
| 构建默认应用 | `pnpm run build:production` |
| 构建 GitHub Pages 版本 | `pnpm run build:pages` |
| 启动微前端联调 | `pnpm run start:mf:shell`、`pnpm run start:mf:projectA`、`pnpm run start:mf:projectB` |
| 构建组件库 | `pnpm run prepublishOnly` |

## 代码结构

```text
src/
├── bootstrap/       # React 挂载与共享 Provider
├── projects/        # 多项目入口和微前端 shell/remotes
├── routers/         # 路由模块、认证守卫与权限工具
├── pages/           # 按功能组织的页面
├── components/      # 共享组件、业务组件和 Hooks
├── app-hooks/       # 应用级 Hooks 与上下文
├── assets/          # 源码资源
├── assets-optimized/# 已优化的媒体资源
├── service/
│   ├── api/         # 按领域组织的 API
│   ├── request.js   # 统一 Axios 客户端
│   ├── authService.ts
│   └── permissionService.ts
├── store/           # Zustand 全局状态
├── lib/             # npm 组件库公开入口与埋点 SDK
├── theme/           # 主题配置与 Provider
├── mock/            # 演示和开发 Mock 数据
├── pwa/             # Service Worker 注册
├── config/          # 应用配置
├── data/            # 静态数据
├── types/           # 共享类型
├── utils/           # 通用工具
├── i18n/            # 国际化初始化
├── locales/         # 翻译文件
└── styles/          # 全局样式

build/               # Vite 构建辅助模块
scripts/             # 构建和维护脚本
public/              # 直接复制到产物的静态文件
docs/                # 按主题分层的开发文档
```

页面通过领域 API 调用网络服务；通用 UI 放在 `components`；只有确实跨页面共享的客户端状态进入 `store`。新增项目的路由和专属代码优先放在 `src/projects/<project>`。

## 文档

从[文档导航](./docs/README.md)开始，或直接阅读：

- [技术架构与代码地图](./docs/architecture/ARCHITECTURE.md)
- [本地开发与联调](./docs/getting-started/LOCAL_DEVELOPMENT.md)
- [Vite 构建与部署](./docs/build/VITE_BUILD.md)
- [多项目模式](./docs/architecture/MULTI_PROJECT.md)
- [微前端部署](./docs/build/MFE_DEPLOYMENT.md)
- [路由与权限](./docs/development/ACCESS_CONTROL.md)
- [请求与 API 层](./docs/development/REQUESTS.md)
- [Storybook 启动与组件库构建、接入和发布](./docs/build/COMPONENT_LIBRARY.md)
