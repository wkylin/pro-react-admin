# 发布库到 npm（本地验证后再发布）

此文档说明如何在本地完整生成、验证 `@w.ui/wui-react` 包并安全发布到 npm。推荐先在本地完成所有验证步骤，确认无误后再执行 `npm publish`。

## 要点概述
- 目标包名：`@w.ui/wui-react`
- 本仓库构建产物位于 `dist-lib`，发布时我们将把 `dist-lib` 作为发布根目录（`npm publish ./dist-lib`）。

## 发布前准备（前提）
- 确保已登录 npm：

```bash
npm login
npm whoami
```

- 确保你有 `@w.ui` scope 的发布权限；若仓库启用 2FA，请准备好 OTP。

- 组件运行时依赖：本组件库在运行时依赖 `antd` 和 `react-router-dom`（作为 peer/dependency）。
  - 在消费端/项目中使用本库前，请先安装这两个依赖：

```bash
npm install antd react-router-dom
# 或使用 yarn
# yarn add antd react-router-dom
```
  - 建议安装与库 `package.json` 中声明的 peerDependencies 相兼容的版本，若不确定请先查看根目录 `package.json` 中的 `peerDependencies` 字段。

## 本地生成与验证步骤

1. 更新版本（在 repo 根的 `package.json`）：

```bash
# 在 package.json 中把 version 提升（例如 3.5.2 -> 3.5.3）
# 或使用 npm version 命令
npm version patch -m "release: %s"
```

2. 运行构建（生成 `dist-lib` 与 entries）：

```bash
npm run build:lib
npm run build:lib:entries
```

3. 生成发布用 package 元数据与复制文档（仓库已有脚本）：

```bash
npm run prepare:lib:publish
# 该脚本会在 dist-lib 下写入一个最小的 package.json 并复制 README/LICENSE
```

4. 检查 `dist-lib/package.json`（必须存在且 `name`/`version`/`exports` 正确）：

```bash
cat dist-lib/package.json
# 注意 exports、main/module/types 是否为相对路径（不包含 dist-lib 前缀）
```

5. Dry-run 打包与验证（强烈建议先 dry-run）：

```bash
npm publish ./dist-lib --access public --dry-run
```

6. 本地安装并在消费端验证（移除任何开发时的 alias）：

```bash
# 在临时测试项目或仓库 consumer 中安装本地打包文件
npm pack ./dist-lib
# 会生成 w.ui-wui-react-<version>.tgz
# 在 consumer 项目中：
npm i /path/to/w.ui-wui-react-<version>.tgz
# 启动 Vite dev（确保你没有在 vite.config.ts 中把 @w.ui/wui-react alias 到本地 src）
npm run dev
```

测试要点：
- 导入 `@w.ui/wui-react` 与子路径（例如 `@w.ui/wui-react/stateless`）是否能被 Vite 解析。
- 确认 `UserIP` 等导出可从包中直接导入。

7. 若一切通过，进行正式发布：

```bash
npm publish ./dist-lib --access public
# 若希望发布到 beta 标签：
# npm publish ./dist-lib --tag beta --access public
```

发布时注意：npm 可能在发布过程中提示在浏览器中认证（CLI auth）——按提示完成即可。

## 常见错误与排查

- 错误：`npm ERR! 404 Not Found - GET https://registry.npmjs.org/dist-lib - Not found`
  - 原因：把 `dist-lib` 当作包名去查询或运行了 `npm publish dist-lib`（不带相对路径），或 `dist-lib/package.json` 缺失。
  - 解决：使用相对路径 `./dist-lib`，并确保 `dist-lib/package.json` 存在且 `name` 为 `@w.ui/wui-react`。

- 错误：Vite 在消费端报 `Failed to resolve entry for package "@w.ui/wui-react"`。
  - 原因：包的 `exports`/入口在安装的包里不匹配（例如 package.json 指向不存在的文件），或开发环境中仍然存在 alias 覆盖。
  - 解决：检查并修正 `dist-lib/package.json` 的 `exports` 指向实际存在的文件；在消费端移除临时 alias，重新安装本地包进行验证。

- 权限或 2FA 问题：
  - 若没有权限，确认你在 npm 上为该 scope 的 maintainer/owner。
  - 若启用 2FA，会在 publish 时提示输入 OTP。

## 验证发布成功

- 在 npm 上打开包页面：

  https://www.npmjs.com/package/@w.ui/wui-react

- 在另一个干净项目中：

```bash
npm i @w.ui/wui-react
# 运行 Vite dev 并确认导入工作正常
```

## 回滚与注意事项
- NPM 一旦 publish，不建议 unpublish（尤其是已被使用的版本）。若需要回退，请发布新版本并标注为弃用或使用 `npm deprecate`。

## 附加建议
- 可以把发布过程自动化到 CI（仅在 CI 环境有正确 npm token 的前提下），避免人工错误。
- 保留 `dist-lib` 构建日志和 `npm pack` 产物以便回溯问题。

---
文档已生成：docs/PUBLISH_LIB_GUIDE.md
