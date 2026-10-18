# 参与开发

使用 Node.js >=24.15.0 且 <25 和 pnpm 11.5.2，执行 `pnpm install --frozen-lockfile`。从最新目标分支创建任务分支；不要混用包管理器改 lockfile。

新增业务遵循[目录职责](docs/SRC_DIRECTORY_GUIDE.md)，按 feature 组织，响应经 unknown parser 验证，平台不反向依赖应用。新增页面更新路由和 route-policy；新项目优先使用 `pnpm run project:create`。生成内容通过命令同步，避免手工维护多套定义。

提交前运行类型、权限/项目/部署/依赖契约、文档、lint、Jest 与 tooling 测试。改动路由、Tabs、授权或 CRUD 时运行对应浏览器回归；改变构建时生成 stats 并检查预算。生产与组件库改动需构建相应 artifact。完整命令见[质量门禁](docs/QUALITY.md)。

PR 说明具体问题、用户可见行为、接口/迁移影响与实际执行验证。区分本地成功与 CI 配置，说明真实 API 未验证部分。使用常规提交前缀，如 feat/fix/refactor/docs；版本发布沿用 package 脚本与组件库发布 workflow，应用和 UI 包分别发布。

文档应描述当前实现。更新后执行 `pnpm run generate:docs`、`pnpm run check:docs`；公共 UI 变更重新生成组件目录。开源对标使用带日期的引用和快照，不把 Star 排名当质量结论。
