# 质量门禁

## 静态与契约检查

```bash
pnpm run check:project-registry
pnpm run check:aliases
pnpm run check:project-contracts
pnpm run check:deployment-config
pnpm run check:import-boundaries
pnpm run check:route-contract
pnpm run generate:docs
pnpm run check:docs
pnpm run check:component-catalog
pnpm run typecheck
pnpm run typecheck:boundaries
pnpm run typecheck:lib
pnpm run lint
```

check:route-contract 从 TS AST 收集默认应用路由与菜单，拒绝重复、无页面菜单、metadata 漂移和失效策略。check:docs 比较生成参考，并检查项目文档的本地 Markdown 链接及根 pnpm run 命令；不验证外网与页内锚点。根 prettier:check 当前检查 src，文档和构建脚本可额外使用 pnpm exec prettier。

## Jest

```bash
pnpm run test:jest --runInBand
pnpm run test:coverage --runInBand
```

jest.config.cjs 使用 config/path-aliases.json 派生映射；jest/transform.cjs 使用 esbuild 与 automatic JSX，coverage 使用 V8。忽略 .delta 旧工作树，避免重复 package/test。依赖 mock 使用 jest.doMock 与延迟 require；不要依赖该 transformer 自动提升 jest.mock。

核心单测覆盖权限失败关闭、身份切换竞态、共享异步策略、业务 envelope、加密隔离、Axios instance 替换与幂等安装、浏览器环境变量注入、Fetch multipart/query、重复取消 cleanup 与领域解码。根 test 仅调用一次 coverage，不再重复执行整套 Jest。

## 产物和浏览器

```bash
pnpm run build:stats
pnpm run check:bundle-budget
pnpm run test:e2e
pnpm run build-storybook
pnpm run prepare:lib:release
pnpm run build:mf:vercel
pnpm run check:mfe-artifacts
pnpm run test:e2e:mfe
```

Playwright 分默认应用与 MFE 配置，分别服务 dist:5000、dist-vercel:5080。构建要先于测试；默认 mock 授权场景不代表真实授权后端已集成。浏览器回归包含首页 lazy Tab 首次打开、切回表单状态和 Node 查询变化；关键权限与 Tab 流程需重复验证。新增测试应验证用户可观察行为，用 locator 的自动等待断言，避免 networkidle 或固定 sleep 代替就绪信号。

.github/workflows/webpack-ci.yml 分 quality、storybook、library、microfrontends jobs；quality 执行契约、类型、Jest、生产 stats、预算和浏览器回归。CI 配置不是本地执行结果；本次实际结果见[验证记录](VALIDATION.md)。
