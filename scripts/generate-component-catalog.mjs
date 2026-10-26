import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { error, log } from 'node:console'
import { fileURLToPath } from 'node:url'
import { format } from 'prettier'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'src')
const wuiSource = path.join(root, 'packages/wui-react/src')
const componentRoot = path.join(src, 'components')
const indexFilePattern = /^index\.(?:[cm]?[jt]sx?)$/
const sourceFilePattern = /\.(?:[cm]?[jt]sx?)$/
const styleFilePattern = /\.(?:less|css|scss)$/

const collectFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)
    return entry.isDirectory() ? collectFiles(absolutePath) : [absolutePath]
  })

const relative = (filePath) => path.relative(root, filePath).split(path.sep).join('/')
// The media optimizer writes ignored build output into src/assets-optimized.
// Keep the catalog stable before and after a local production build.
const generatedMediaRoot = path.join(src, 'assets-optimized') + path.sep
const srcFiles = collectFiles(src).filter((filePath) => !filePath.startsWith(generatedMediaRoot))
const wuiSourceFiles = collectFiles(wuiSource)
const indexFiles = (directory) =>
  collectFiles(directory).filter((filePath) => indexFilePattern.test(path.basename(filePath)))
const entryDirectories = (directory) =>
  [...new Set(indexFiles(directory).map((filePath) => path.dirname(filePath)))].sort()
const directEntryDirectories = (directory) =>
  entryDirectories(directory).filter((entry) => path.dirname(entry) === directory)
const directFolders = (directory) =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

const statelessEntries = entryDirectories(path.join(componentRoot, 'stateless'))
const statelessDirectEntries = directEntryDirectories(path.join(componentRoot, 'stateless'))
const statefulEntries = directEntryDirectories(path.join(componentRoot, 'stateful'))
const hookEntries = directEntryDirectories(path.join(componentRoot, 'hooks')).filter(
  (entry) => path.basename(entry) !== 'hooks'
)
const componentGroups = new Set(['hooks', 'stateful', 'stateless'])
const standaloneFolders = directFolders(componentRoot).filter((name) => !componentGroups.has(name))
const authFiles = collectFiles(path.join(src, 'platform', 'auth', 'components'))
  .filter((filePath) => /\.(?:tsx|jsx)$/.test(filePath))
  .map((filePath) => path.basename(filePath, path.extname(filePath)))
  .sort()
const pageEntries = entryDirectories(path.join(src, 'pages'))
const directPageEntries = directEntryDirectories(path.join(src, 'pages'))
const featureEntries = directEntryDirectories(path.join(src, 'features'))
const projectEntries = entryDirectories(path.join(src, 'projects'))
const sharedUiEntries = directEntryDirectories(path.join(src, 'shared', 'ui'))
const wuiComponentEntries = directEntryDirectories(wuiSource)
const layoutRoot = path.join(src, 'app/layouts')
const layoutEntries = directEntryDirectories(layoutRoot)
const layoutRootHasEntry = fs.existsSync(path.join(layoutRoot, 'index.tsx'))
const styleFiles = srcFiles.filter((filePath) => styleFilePattern.test(filePath))
const cssModuleFiles = styleFiles.filter((filePath) => /\.module\.(?:less|css|scss)$/.test(filePath))
const storyFiles = [...srcFiles, ...wuiSourceFiles].filter((filePath) => /\.stories\.[cm]?[jt]sx?$/.test(filePath))
const sourceTestFiles = [...srcFiles, ...wuiSourceFiles].filter((filePath) =>
  /\.(?:test|spec)\.[cm]?[jt]sx?$/.test(filePath)
)
const sourceFiles = srcFiles.filter((filePath) => sourceFilePattern.test(filePath))
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const workspaceFile = fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8')
const workspacePackages = workspaceFile.match(/^packages:\s*\n((?:\s+-[^\n]*\n?)+)/m)?.[1]
const workspacePackageCount = workspacePackages ? workspacePackages.trim().split(/\r?\n/).length : 0
const formatNames = (names) => {
  if (names.length === 0) return '无'
  const columns = 4
  const rows = []
  for (let index = 0; index < names.length; index += columns) {
    const cells = names.slice(index, index + columns).map((name) => `\`${name}\``)
    while (cells.length < columns) cells.push('')
    rows.push(`| ${cells.join(' | ')} |`)
  }
  return [`| 模块 | 模块 | 模块 | 模块 |`, `| --- | --- | --- | --- |`, ...rows].join('\n')
}

const statelessNames = statelessEntries.map((entry) =>
  path.relative(path.join(componentRoot, 'stateless'), entry).split(path.sep).join('/')
)
const statefulNames = statefulEntries.map((entry) => path.basename(entry))
const hookNames = hookEntries.map((entry) => path.basename(entry))
const sharedUiNames = sharedUiEntries.map((entry) => path.basename(entry))
const wuiComponentNames = wuiComponentEntries.map((entry) => path.basename(entry))
const layoutNames = [
  ...(layoutRootHasEntry ? ['ApplicationShell'] : []),
  ...layoutEntries.map((entry) => path.basename(entry)),
]

const markdown = `# 组件与源码清单

> 本文由 \`pnpm run generate:component-catalog\` 生成。统计按目录与入口文件计算，不等同于 AST 识别出的 React 函数组件数量；新增、移动或删除模块后重新生成。

## 工程规模

| 指标 | 数量 | 统计口径 |
| --- | ---: | --- |
| \`src/\` 文件 | ${srcFiles.length} | 包含源码、样式、资源与配置文件 |
| TS/JS 源文件 | ${sourceFiles.length} | \`.ts/.tsx/.js/.jsx\` 等源码扩展名 |
| \`packages/wui-react/src\` 文件 | ${wuiSourceFiles.length} | 组件库源码、stories 与组件文档 |
| 组件库 TS/JS 源文件 | ${wuiSourceFiles.filter((filePath) => sourceFilePattern.test(filePath)).length} | 组件库自身源码，不含 MDX |
| 样式文件 | ${styleFiles.length} | Less、CSS、SCSS |
| CSS Modules | ${cssModuleFiles.length} | 文件名含 \`.module.\` |
| Storybook stories | ${storyFiles.length} | \`*.stories.*\` |
| TS/JS 测试文件 | ${sourceTestFiles.length} | 应用源码与组件库 package 下的 \`*.test.*\`/\`*.spec.*\`；不含仓库级 E2E |
| 根 package scripts | ${Object.keys(packageJson.scripts || {}).length} | \`package.json#scripts\` 命令数 |
| pnpm workspace 项目 | ${workspacePackageCount} | 根应用、API 与组件库 |

## 可复用模块分类

| 当前目录 | 数量 | 说明 |
| --- | ---: | --- |
| \`src/components/stateless\` | ${statelessEntries.length} | 含 \`index.*\` 的模块目录（直接子目录 ${statelessDirectEntries.length}，嵌套入口 ${statelessEntries.length - statelessDirectEntries.length}）；目录名不保证组件无状态 |
| \`src/components/stateful\` | ${statefulEntries.length} | 含 \`index.*\` 的直接子目录 |
| \`src/components\` 独立目录 | ${standaloneFolders.length} | 未归入现有分类目录的直接子目录 |
| \`src/platform/auth/components\` TSX 文件 | ${authFiles.length} | 认证、鉴权和权限守卫相关模块 |
| \`src/components/hooks\` | ${hookEntries.length} | 含入口文件的直接 Hook 模块目录，不含聚合入口 |
| \`src/shared/ui\` | ${sharedUiEntries.length} | 应用级共享 UI 模块入口 |
| \`packages/wui-react/src\` | ${wuiComponentEntries.length} | 已进入独立源码边界的组件库模块 |
| \`src/app/layouts\` | ${layoutNames.length} | 应用壳与直接布局组件入口 |
| \`src/pages\` 页面入口 | ${pageEntries.length} | 含 \`index.*\` 的页面模块目录（直接子目录 ${directPageEntries.length}） |
| \`src/features\` 业务域 | ${featureEntries.length} | 已建立 feature-first 入口的业务域 |
| \`src/projects\` 项目入口 | ${projectEntries.length} | 含 \`index.*\` 的项目模块目录 |

## Stateless 目录入口

以下清单沿用当前目录名；后续迁移时应依据用途重新分类，不应将它们全部视为纯展示组件。

${formatNames(statelessNames)}

## Stateful 目录入口

${formatNames(statefulNames)}

## Hook 模块

${formatNames(hookNames)}

## Shared UI 模块

${formatNames(sharedUiNames)}

## WUI 组件库模块

${formatNames(wuiComponentNames)}

## Layout 模块

${formatNames(layoutNames)}

## 未归类的 components 根目录

${formatNames(standaloneFolders)}

## 鉴权与权限组件文件

${formatNames(authFiles)}
`

const outputPath = path.join(root, 'docs', 'components', 'COMPONENT_CATALOG.md')
const formattedMarkdown = await format(markdown, { filepath: outputPath })
if (process.argv.includes('--check')) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : ''
  if (current !== formattedMarkdown) {
    error(`[component-catalog] ${relative(outputPath)} is stale. Run: pnpm run generate:component-catalog`)
    process.exitCode = 1
  } else {
    log(`[component-catalog] ${relative(outputPath)} is up to date.`)
  }
} else {
  fs.writeFileSync(outputPath, formattedMarkdown)
  log(
    `[component-catalog] Generated ${relative(outputPath)} (${statelessEntries.length} stateless entries, ${sharedUiEntries.length} shared UI entries, ${hookEntries.length} hook modules).`
  )
}
