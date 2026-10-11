# 多项目构建

src/projects/registry.json 是项目、入口、路由目录、输出目录与 Remote 配置的唯一注册表。default 复用根 src；projectA、projectB、shell 各有源码根。PROJECT 只在构建时选择目标，运行时没有项目切换器。

```bash
pnpm run project:dev projectA
pnpm run project:build projectA
pnpm run start:projectB
pnpm run build:production:projectB
```

scripts/project-command.mjs 校验名称，设置 PROJECT、BUILD_GOAL、NODE_ENV 等并调用 Webpack。独立构建和 Federation 构建使用不同 action；同一个项目名不意味着默认是 Remote。

新增项目先创建 entry、routers 和 public 模板，登记注册表；如需要 Remote 再登记 mfeExpose 与 remotes。运行：

```bash
pnpm run sync:project-contracts
pnpm run check:project-registry
pnpm run check:project-contracts
pnpm run check:aliases
pnpm run generate:docs
```

共用基础设施放 platform/shared，共用装配逻辑放 bootstrap。项目差异留在自身源码，不通过 platform 导入某个项目。各项目与默认应用的路由表不是同一张表，route-contract 门禁当前针对默认应用的声明与菜单。

详细入口和输出由[实现参考](PROJECT_REFERENCE.md)自动生成；微前端协议见[部署指南](MFE_DEPLOYMENT.md)。
