# 源码职责与扩展入口

```text
src/
  app/
    bootstrap/        React root、Application、RemoteScope、基础 Provider
    layouts/          导航、搜索、面包屑、Tabs、布局预设
    routing/          共享认证装配、展示路由模块
    model/            应用壳 Store 工厂、Provider、选择器
    modules/          默认应用选择的业务模块
  features/
    administration/   用户、角色、审计；Provider 与领域解析
    business/         公司资质示例
    notifications/    通知中心
    tracking/         数据看板
    dependencies/     依赖展示
  platform/
    auth/ api/ data/ modules/ navigation/ keep-alive/ mfe/ pwa/ tracking/
  shared/             通用组件与纯工具
  projects/           注册表和项目专有 entry/router/page/remote
  pages/ components/  展示与历史组件，逐步按业务迁移
packages/wui-react/   独立可发布 UI 包
api/enterprise/       租户身份、RBAC、SQLite 持久化与事务审计；独立 strict 核心
config/               项目、路由菜单、别名、预算、MFE 与组件库契约
scripts/              契约检查、生成、工程 CLI、产物组合
```

## 新增业务

feature 内按 pages/api/model/hooks 组织，不把表单状态加入全局 Store。unknown 响应通过领域 parser 验证；CRUD 可以实现 DataProvider，传输复用 JsonClient，取消信号由消费者传入。业务路由和模块声明放在 feature，应用选择模块并装配主布局；菜单/标题/权限元数据进入 route-policy。具体步骤见[模块指南](MODULES.md)。

多个项目通过注册表和脚手架扩展，共享算法放 platform，应用装配放 app。`@routers` 是当前项目构建别名；`@app/routing` 是共享装配目录。两者用途不同，不通过导入展示路由复用所有业务页面。企业入口示例见[企业资源](ENTERPRISE.md)，新项目流程见[多项目](MULTI_PROJECT.md)。

## 依赖方向

app/projects 可以装配 features/platform/shared/wui；features 依赖平台与通用能力。platform 不导入 app、features、pages、projects；shared 不导入平台或业务；wui-react 不导入应用 src。`check:import-boundaries` 扫描静态 import/export 和字面量动态 import；变量拼接导入不属于其完整覆盖范围。

UI 包以 config/library-contract.mjs 管理公开组件，应用组件目录自动生成。Tracking SDK 保留在 platform，不随 UI 包发布。

## 类型边界

根 tsconfig strict=false 兼容历史页面；平台、共享层、新业务、应用壳 Store、renderApp/断点 Provider、布局契约与 UI 包执行 strict 检查。api/enterprise 的 .mts 业务核心通过独立 tsconfig.api.json strict 门禁；CommonJS HTTP adapter 和其它 API helper 尚未全部类型化。Application 装配会引用所有旧展示页面，暂通过根类型检查；没有为通过检查而关闭核心 strict。

详细 public 组件和项目接口见[实现参考](PROJECT_REFERENCE.md)与[组件目录](COMPONENT_CATALOG.md)。
