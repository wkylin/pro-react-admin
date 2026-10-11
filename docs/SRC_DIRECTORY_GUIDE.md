# 源码目录与依赖

```text
src/
  index.tsx            默认应用入口
  bootstrap/           通用 React root 与 Providers
  projects/            注册表、projectA、projectB、shell
  routers/             默认应用路由模块、类型、懒加载与注入
  layouts/             布局、菜单、Tabs 与导航元数据
  features/            business、tracking、dependencies 等业务模块
  platform/            api、auth、tracking、mfe、pwa 等基础设施
  shared/              无业务依赖的通用 UI 与工具
  store/               应用壳 Zustand 状态
  theme/ i18n/ styles/  主题、翻译、全局样式
  pages/ components/   存量页面与组件，逐步迁移
packages/wui-react/src/ 发布组件的唯一源码
api/                   Express helper（CommonJS）
config/                别名、路由、组件库、MFE、体积契约
scripts/               契约生成、验证、构建辅助
```

## 新增业务

参考 src/features/business，按需要使用 pages/、hooks/、api/、model/。领域 API 接收 unknown、校验响应并返回领域类型；异步 hook 负责取消与状态，页面负责显示。模块 index.ts 只暴露外部需要的入口。不要把公司资质等业务接口放入通用请求核心。

新增页面时同时登记路由结构、lazyLoad.config.tsx、route-policy.json 和菜单（需要导航时）。动态详情页可以继承父级策略，运行 `pnpm run check:route-contract` 检查。

## 基础设施与组件

platform 可以依赖底层通用工具，不能导入 features、pages、layouts、routers、projects、历史 components。shared 禁止依赖 platform 与上层应用。UI 包禁止依赖应用 src，业务注入通过 props 或 requestLib 等接口完成。

`@platform`、`@features`、`@shared`、`@wui` 等别名在 config/path-aliases.json 定义。修改后运行 `pnpm run sync:aliases` 和 `pnpm run check:aliases`；Jest 同样从该配置读取。

## 类型边界

- tsconfig.json：全应用兼容检查，未开启全仓 strict。
- tsconfig.strict-boundaries.json：业务、平台、shared、store 与选定装配边界的严格检查。
- tsconfig.lib.json：UI 包严格声明构建。

迁移时先建立 API 与模型边界，再移动实现与 imports，最后删除失效入口、补测试并更新文档。不要恢复 src/lib 作为应用与发布包的共用入口。
