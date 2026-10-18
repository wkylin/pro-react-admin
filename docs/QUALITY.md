# 质量门禁

## 静态与契约检查

```bash
pnpm run check:project-registry
pnpm run check:aliases
pnpm run check:project-contracts
pnpm run check:deployment-contracts
pnpm run check:deployment-config
pnpm run check:import-boundaries
pnpm run check:route-contract
pnpm run generate:docs
pnpm run check:docs
pnpm run check:component-catalog
pnpm run typecheck
pnpm run typecheck:boundaries
pnpm run typecheck:api
pnpm run typecheck:lib
pnpm run lint
```

check:route-contract 从 TS AST 收集默认应用路由，从策略 manifest 收集菜单，拒绝重复路由、无页面菜单、父级环、同级排序冲突、未注册图标和失效策略。check:docs 比较生成参考，并检查项目文档的本地 Markdown 文件/标题锚点及根 pnpm run 命令；不验证外网或文档行为语义。契约变更需人工对照[文档维护约定](README.md#维护约定)复核当前能力表与专题说明。根 prettier:check 当前检查 src，文档和构建脚本可额外使用 pnpm exec prettier。

## Jest

```bash
pnpm run test:jest --runInBand
pnpm run test:coverage --runInBand
pnpm run test:tooling
pnpm run test:api
```

jest.config.cjs 使用 config/path-aliases.json 派生映射；jest/transform.cjs 使用 esbuild 与 automatic JSX，coverage 使用 V8。忽略 .delta 旧工作树，避免重复 package/test。依赖 mock 使用 jest.doMock 与延迟 require；不要依赖该 transformer 自动提升 jest.mock。

核心单测覆盖权限失败关闭、身份切换竞态、共享异步策略、业务 envelope、加密隔离、Axios instance 替换与幂等安装、浏览器环境变量注入、Fetch multipart/query、重复取消 cleanup 与领域解码。根 test 仅调用一次 coverage，不再重复执行整套 Jest。

企业后端使用 Node test runner 运行真实 Express HTTP 与临时持久化 SQLite。覆盖跨租户列表/记录/写入/审计、伪造 header/凭据、权限提升、角色撤权、停用/密码/注销/过期、最后管理员、引用保护、数据库重开、审计失败回滚和在异步哈希期间的会话撤销。测试结束删除数据库，不访问生产环境。Jest 新增资源缓存的共享请求、独立取消、TTL/错误恢复、写入失效和迟到结果，以及旧 401 不清理新会话的回归。

## 产物和浏览器

```bash
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run test:e2e
pnpm run build:enterprise:stats
node scripts/check-bundle-budget.mjs build-enterprise-stats.json enterprise
pnpm run test:e2e:enterprise --repeat-each=5
pnpm run build:enterprise:api
pnpm run test:e2e:enterprise:api --repeat-each=5
pnpm run build-storybook
pnpm run prepare:lib:release
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm run test:e2e:mfe
```

Playwright 使用默认、企业演示、真实企业、MFE 四套配置，分别服务 dist:5000、dist-enterprise:5090、dist-enterprise:5091、dist-vercel:5080。真实企业配置启动临时数据库/Express 和静态资源，验证完整登录/持久化 CRUD/审计/注销/租户切换，不 mock 业务 API。它要求先 build:enterprise:api；同一个 dist-enterprise 目录不能在两种模式的测试运行期间重新构建。报告与 trace 输出分别隔离。关键权限与 Tab 流程重复验证；locator 使用可见角色与 label，不以固定 sleep 或 networkidle 代替就绪信号。

.github/workflows/vite-ci.yml 分 quality、enterprise、enterprise-api、storybook、library、microfrontends jobs；quality 包含 strict API 与真实 HTTP 集成测试，enterprise-api 构建真实模式并重复浏览器回归。CI 配置不是本地执行结果；本次实际结果见[验证记录](VALIDATION.md)。

## 新架构回归

模块装配检查契约版本、依赖顺序、缺失/循环依赖、大小写及参数名造成的路由冲突、精确权限策略、Header 插槽和 Provider 的根实例隔离与清理。默认浏览器新增通知插槽到 lazy 详情页的流程；企业浏览器检查未启用模块的按钮与页面不存在。

单测核验双根 Store/KeepAlive 隔离、LRU 和计时器清理、导航环与叶子权限、实际参数面包屑、多个已挂载消费者同步撤权、跨标签页切号、demo Provider 关联/唯一性/审计，以及 REST unknown parser。tooling 使用 Node test runner，验证目录越界/重叠、项目 build plan、Remote override 和脚手架契约。

企业演示浏览器回归验证用户创建和跨 Tab 读取、审计生成、角色创建/筛选/引用保护、无刷新撤权以及移动布局。真实企业浏览器使用独立配置验证真实服务；两套都不代表生产部署、SSO 或外部审计系统已验收。
