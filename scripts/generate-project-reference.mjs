import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { format } from 'prettier'
import { clientEnvKeys } from '../build/client-env.js'
import { libraryComponents, libraryGroups } from '../config/library-contract.mjs'
import { collectRouteDeclarations } from './route-contract.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const library = JSON.parse(fs.readFileSync(path.join(root, 'packages/wui-react/package.json'), 'utf8'))
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/projects/registry.json'), 'utf8'))
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config/route-policy.json'), 'utf8'))
const budget = JSON.parse(fs.readFileSync(path.join(root, 'config/bundle-budget.json'), 'utf8'))
const rows = (items) =>
  items
    .map((columns) => `| ${columns.map((value) => String(value ?? '').replaceAll('|', '\\|')).join(' | ')} |`)
    .join('\n')
const routeEntries = [...new Map(collectRouteDeclarations().map((route) => [route.path, route])).values()]
const markdown = `# 项目实现参考（自动生成）

由 \`pnpm run generate:docs\` 生成，CI 使用 \`pnpm run check:docs\` 检查。版本是 package 声明范围，实际安装结果以 lockfile 为准。

## 运行环境与版本

Node.js：\`${pkg.engines.node}\`；包管理器：\`${pkg.packageManager}\`；应用：\`${pkg.version}\`；组件库：\`${library.version}\`。

| 技术 | 声明版本 |
| --- | --- |
${rows(['react', 'react-router-dom', 'antd', 'zustand', 'typescript', 'webpack', 'vite', '@babel/core', 'storybook', '@playwright/test', 'jest'].map((name) => [name, pkg.dependencies[name] || pkg.devDependencies[name]]))}

## 项目与构建入口

| 项目 | 源码根目录（相对 src） | 入口 | 路由 | 输出目录 |
| --- | --- | --- | --- | --- |
${rows(Object.entries(registry.projects).map(([name, project]) => [name, project.sourceRoot, project.entry, project.routers, project.output]))}

## Remote

| 名称 | 路由 | 开发地址 | 生产默认路径 | URL 覆盖变量 |
| --- | --- | --- | --- | --- |
${rows(registry.remotes.map((remote) => [remote.name, remote.routePath, remote.devUrl, remote.prodPath, remote.envKey]))}

## 浏览器环境变量白名单

只有下列变量会注入应用。\`APP_BASE_URL\` 为空表示同源 API；\`REACT_APP_USE_MOCK=true\` 才启用演示授权。通用环境模板供公开演示使用；注册为 Enterprise 认证的项目命令默认注入 false，Pages 演示构建显式注入 true。Remote URL 变量由构建侧读取，不是浏览器凭据。

${clientEnvKeys.map((key) => `- \`${key}\``).join('\n')}

服务端变量见 [API 与埋点](../operations/API.md)，构建变量见 [构建](../development/BUILD.md)。

## 组件库公开组件

| 组件 | 安装后的子路径 | 源码 |
| --- | --- | --- |
${rows(libraryComponents.map((component) => [component.name, `${library.name}/${component.subpath}`, `packages/wui-react/src/${component.source}`]))}

## 组件库分组

133 个迁移实现分布在以下七组；根入口不加载这些组。各组的可选 peer 安装及惰性加载说明见 [npm 使用说明](../../NPM_README.md)。

| 安装后的子路径 | 命名导出 |
| --- | --- |
${rows(libraryGroups.map((group) => [`${library.name}/${group.subpath}`, group.runtimeExports.join(', ')]))}

## 路由

| 路径模式 | 标题 | 权限（精确策略） | 声明文件 |
| --- | --- | --- | --- |
${rows(routeEntries.sort((a, b) => a.path.localeCompare(b.path)).map((route) => [route.path, policy[route.path]?.title || route.name, policy[route.path]?.permission || '继承策略或公共/回退路由', route.file]))}

## 应用体积门禁

初始 entrypoint JS/CSS：${budget.initialJavaScriptCssBytes} bytes；单个 JS/CSS 资源：${budget.singleJavaScriptCssAssetBytes} bytes。此处是原始产物预算，不是 gzip 大小或实际测量值。

| 项目覆盖 | 初始 JS/CSS bytes | 单资源 bytes | 全部 JS/CSS bytes |
| --- | --- | --- | --- |
${rows(Object.entries(budget.projects || {}).map(([name, limits]) => [name, limits.initialJavaScriptCssBytes, limits.singleJavaScriptCssAssetBytes, limits.totalJavaScriptCssBytes || '不单独限制']))}

## 所有根目录命令

命令来自 \`package.json#scripts\`，不会自动执行。发布、清理和依赖更新命令应按实际操作目的使用。

| 命令 | 实际执行内容 |
| --- | --- |
${rows(Object.entries(pkg.scripts).map(([name, command]) => [`pnpm run ${name}`, command]))}
`
const output = path.join(root, 'docs/reference/PROJECT_REFERENCE.md')
const generated = await format(markdown, { filepath: output })
if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== generated) {
    console.error('[project-reference] stale; run pnpm run generate:docs')
    process.exitCode = 1
  } else console.log('[project-reference] matches source contracts.')
} else {
  fs.writeFileSync(output, generated)
  console.log('[project-reference] regenerated.')
}
