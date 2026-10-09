# 多项目模式

本分支使用一套 Vite 工具链和依赖目录承载多个业务入口。通过 PROJECT 选择构建目标。

## 项目入口

- 默认项目：src/index.tsx
- ProjectA：src/projects/projectA/index.tsx
- ProjectB：src/projects/projectB/index.tsx

子项目可以提供自己的 routers、pages、components 和 public 目录。若项目有 routers 目录，构建别名 @routers 会指向项目路由；否则使用 src/routers。

## 常用命令

默认项目：

    pnpm run dev
    pnpm run build:production
    pnpm run preview

ProjectA：

    pnpm run dev:projectA
    pnpm run build:production:projectA
    pnpm run preview:projectA

ProjectB：

    pnpm run dev:projectB
    pnpm run build:production:projectB
    pnpm run preview:projectB

产物目录分别为 dist、dist-projectA 和 dist-projectB。可以使用 VITE_OUT_DIR 覆盖产物目录，使用 PUBLIC_URL 设置部署子路径。

## 新增项目

1. 新建 src/projects/<project>/index.tsx。
2. 按需添加项目路由和静态资源目录。
3. 使用 PROJECT=<project> pnpm exec vite --host --config vite.config.ts 开发。
4. 使用 PROJECT=<project> pnpm exec vite build --config vite.config.ts 构建。

项目只会从所选 HTML 入口开始分析依赖，不会把其他项目入口打入同一个产物。
