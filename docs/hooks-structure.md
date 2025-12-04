# Hooks 目录说明

> 添加、移动或重构 Hook 时请参阅本文件，避免再次出现“重复实现/不知所踪”的情况。

## 目录分工

| 目录 | 用途 | 说明 |
| --- | --- | --- |
| `src/components/hooks` | 提供给组件/页面复用的 UI 与工具型 Hook，可随组件库一起发布。 | 通过 `@hooks` 别名导出（见 `vite.config.lib.ts` 与 `webpack/webpack.common.js`），放入此处的 Hook 可能被打包到共享产物中，尽量保持无业务依赖。 |
| `src/hooks` | 与业务强相关的应用级 Hook（权限、数据拉取协议、Redux 等）。 | 通过相对路径引用，不走别名，可依赖 `permissionService` 等仅在应用内部存在的服务。 |

## 为什么要分成两个目录？

1. **打包边界**：`src/components/hooks` 会进入组件库构建，混入业务 Hook 会把内部逻辑暴露给外部。
2. **别名契约**：`@hooks/*` 目前只指向 `src/components/hooks/*`。若直接移动文件而不更新所有 import，会悄悄切换到不同实现。
3. **职责拆分**：组件 Hook 保持轻量通用；应用 Hook 可以依赖上下文、状态管理等“重”依赖。

## 使用规则

- 需要通过 `@hooks/...` 供多个组件/页面复用的 Hook，放在 `src/components/hooks`，并控制依赖体积。
- 依赖仅在应用层存在的服务（如 `permissionService`、自研 store、埋点）的 Hook，放在 `src/hooks`。
- 删除或移动 Hook 前，务必同时搜索 `@hooks/<name>` 与相对路径引用，确认没有遗留副本（参见 2025-12-04 的 `useSafeNavigate` 事件）。
- 若确实要合并目录，必须同步更新别名配置（`vite.config.lib.ts`、`webpack/webpack.common.js`、`tsconfig.json`）、逐一调整 import，并验证组件库构建结果；事后请在本文记录决策。

## 新增 Hook 检查清单

1. **明确作用域**：共享复用还是仅限应用？
2. **选择目录**：依照上表放置。
3. **补充测试/文档**：若放置位置不直观，请在此文件备注理由。
4. **执行 `npm run lint`（或相关检查）**：确保新 Hook 出现在期望的 bundle 中。

刻意保持这层区分，可以防止内部逻辑被误打包，也能避免未来再次出现“哪个 Hook 才是真的？”的困扰。
