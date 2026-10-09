# Vite Module Federation 部署指南

本分支使用 @module-federation/vite。普通应用构建不会启用联邦运行时；只有设置 MFE_ROLE=host 或 MFE_ROLE=remote 时才启用。

## 本地联调

分别在三个终端启动远程应用和宿主：

    pnpm run start:mf:projectA
    pnpm run start:mf:projectB
    pnpm run start:mf:shell

ProjectA 和 ProjectB 默认分别监听 8081、8082，宿主监听 8080。打开 http://localhost:8080/#/projectA 或 http://localhost:8080/#/projectB 检查远程模块。

宿主默认读取：

- MFE_PROJECTA_URL：默认 http://localhost:8081/remoteEntry.js
- MFE_PROJECTB_URL：默认 http://localhost:8082/remoteEntry.js
- MFE_REMOTES：可用逗号分隔的 name@URL 项覆盖 remote 地址

配置示例：

    MFE_REMOTES=projectA@https://a.example.com/remoteEntry.js,projectB@https://b.example.com/remoteEntry.js

## 构建与目录

    pnpm run build:mf:shell
    pnpm run build:mf:projectA
    pnpm run build:mf:projectB

宿主输出到 dist-shell；远程项目分别输出到 dist-mf-projectA 和 dist-mf-projectB。独立项目构建仍输出到 dist-projectA 和 dist-projectB，避免联邦产物覆盖 standalone 产物。默认生产 remote 地址为 /projectA/remoteEntry.js 和 /projectB/remoteEntry.js，适用于同域名分路径部署。

将宿主文件部署到站点根目录，并将对应 remote 产物部署到 /projectA/ 和 /projectB/。所有 remoteEntry.js 与其引用的文件必须作为同一版本发布。

## Vercel 单项目产物

    pnpm run build:mf:vercel

脚本将宿主和两个 remote 合并到 dist-vercel，供一个 Vercel 项目托管同域不同路径。若 Vercel 项目面板显式配置了 Build Command 或 Output Directory，需将其与该脚本及 dist-vercel 对齐；切换线上设置前先核对对应项目的面板配置。

根级 vercel.json 保留现有安装、rewrite 和响应头规则，本分支不会代替 Vercel 面板配置。

## 共享依赖和故障定位

宿主和 remote 将 React、React DOM、React Router、Ant Design 及其 CSS-in-JS 上下文声明为 singleton。这样 remote 页面使用的 React 与宿主路由上下文保持一致。跨域部署时，remote 静态文件服务器必须允许宿主来源读取 ESM 模块。

若远程页面加载失败，依次检查 remoteEntry.js 的 HTTP 状态、remote base 路径、remote 子 chunk 是否可访问，以及跨域响应头。remote 发布时应同时保留该版本引用的哈希 chunk，避免浏览器缓存旧 remoteEntry 后请求到已删除资源。
