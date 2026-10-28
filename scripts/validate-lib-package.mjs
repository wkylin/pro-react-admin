import fs from 'node:fs/promises'
import path from 'node:path'
import { error as logError, log } from 'node:console'
import process from 'node:process'
import { isDeepStrictEqual } from 'node:util'
import { fileURLToPath } from 'node:url'
import {
  libraryComponents,
  libraryEntries,
  libraryEngines,
  libraryEntrypoints,
  libraryExports,
  libraryPackageName,
  libraryPeerDependencies,
  libraryPeerDependenciesMeta,
  libraryRuntimeDependencies,
} from '../config/library-contract.mjs'

import { assertConditionalExports } from './lib-package-contract.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(repoRoot, 'packages/wui-react')
const packageJsonPath = path.join(packageDir, 'package.json')
const rootPackageJsonPath = path.join(repoRoot, 'package.json')

async function fileExists(filePath) {
  try {
    return (await fs.stat(filePath)).isFile()
  } catch {
    return false
  }
}

function collectExportTargets(value, currentPath = 'exports') {
  if (typeof value === 'string') return [{ path: currentPath, target: value }]
  if (!value || typeof value !== 'object') {
    throw new Error(`${currentPath} 必须是文件路径或条件导出对象`)
  }

  return Object.entries(value).flatMap(([key, child]) => collectExportTargets(child, `${currentPath}.${key}`))
}

async function main() {
  let packageJson
  let rootPackageJson
  try {
    packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    rootPackageJson = JSON.parse(await fs.readFile(rootPackageJsonPath, 'utf8'))
  } catch (error) {
    throw new Error(`无法读取组件库 workspace 清单：${packageJsonPath}`, { cause: error })
  }

  const requiredFields = ['name', 'version', 'main', 'module', 'types', 'exports', 'dependencies', 'peerDependencies']
  const missingFields = requiredFields.filter((field) => !packageJson[field])
  if (missingFields.length > 0) {
    throw new Error(`组件库 package.json 缺少字段：${missingFields.join(', ')}`)
  }
  if (packageJson.name !== libraryPackageName) {
    throw new Error(`组件库名称必须为 ${libraryPackageName}`)
  }
  if (packageJson.private !== false) {
    throw new Error('组件库 workspace package 必须允许发布（private: false）')
  }
  if (packageJson.type !== 'module') {
    throw new Error('组件库 package 必须声明 type: module')
  }
  if (!isDeepStrictEqual(packageJson.engines, libraryEngines)) {
    throw new Error('组件库 engines 与 config/library-contract.mjs 不一致')
  }
  if (!/^6\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(packageJson.version)) {
    throw new Error('clean package 架构必须使用 6.x 语义化版本')
  }
  if (!isDeepStrictEqual(packageJson.files, ['dist', 'README.md', 'LICENSE'])) {
    throw new Error('组件库 files 必须且只能包含 dist、README.md 和 LICENSE')
  }
  if (
    packageJson.publishConfig?.access !== 'public' ||
    packageJson.publishConfig?.registry !== 'https://registry.npmjs.org/'
  ) {
    throw new Error('组件库 publishConfig 必须固定到 npm public registry')
  }
  if (
    packageJson.scripts?.prepublishOnly !==
    'node ../../scripts/validate-lib-release.mjs && pnpm --dir ../.. run prepare:lib:release'
  ) {
    throw new Error('组件库必须通过 prepublishOnly 执行完整发布前构建与校验')
  }
  if (!rootPackageJson.private || rootPackageJson.name === libraryPackageName) {
    throw new Error('应用根 package 必须保持 private，并与组件库使用独立 package 名称')
  }
  if (!isDeepStrictEqual(packageJson.peerDependencies, libraryPeerDependencies)) {
    throw new Error('组件库 peerDependencies 与 config/library-contract.mjs 不一致')
  }
  if (!isDeepStrictEqual(packageJson.dependencies, libraryRuntimeDependencies)) {
    throw new Error('组件库 dependencies 与 config/library-contract.mjs 不一致')
  }
  if (!isDeepStrictEqual(packageJson.peerDependenciesMeta, libraryPeerDependenciesMeta)) {
    throw new Error('Optional peer metadata must match config/library-contract.mjs')
  }
  assertConditionalExports(packageJson.exports, libraryExports)
  if (
    packageJson.main !== libraryEntrypoints.main ||
    packageJson.module !== libraryEntrypoints.module ||
    packageJson.types !== libraryEntrypoints.types
  ) {
    throw new Error('组件库 main/module/types 与 config/library-contract.mjs 不一致')
  }

  const sourceRoot = path.join(packageDir, 'src')
  const declaredSourceDirectories = new Set(libraryEntries.map(({ source }) => source.split('/')[0]))
  const actualSourceDirectories = new Set(
    (await fs.readdir(sourceRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  )
  if (!isDeepStrictEqual(actualSourceDirectories, declaredSourceDirectories)) {
    throw new Error(
      `组件源码目录与 public contract 不一致：actual=${[...actualSourceDirectories].sort().join(', ')}; declared=${[
        ...declaredSourceDirectories,
      ]
        .sort()
        .join(', ')}`
    )
  }

  const missingSources = []
  for (const component of libraryEntries) {
    if (!(await fileExists(path.join(sourceRoot, component.source)))) {
      missingSources.push(component.source)
    }
  }
  if (missingSources.length > 0) {
    throw new Error(`组件库 public source 缺失：\n- ${missingSources.join('\n- ')}`)
  }

  const exportTargets = collectExportTargets(packageJson.exports)
  const packageTargets = [
    ['main', packageJson.main],
    ['module', packageJson.module],
    ['types', packageJson.types],
    ...exportTargets.map(({ path: exportPath, target }) => [exportPath, target]),
    ['README.md', './README.md'],
    ['LICENSE', './LICENSE'],
  ]

  const missingTargets = []
  for (const [targetName, targetPath] of packageTargets) {
    if (typeof targetPath !== 'string' || !targetPath.startsWith('./')) {
      missingTargets.push(`${targetName}: ${targetPath}（必须是以 ./ 开头的包内路径）`)
      continue
    }

    const absolutePath = path.resolve(packageDir, targetPath.slice(2))
    if (!absolutePath.startsWith(`${packageDir}${path.sep}`) || !(await fileExists(absolutePath))) {
      missingTargets.push(`${targetName}: ${targetPath}`)
    }
  }

  if (missingTargets.length > 0) {
    throw new Error(`组件库发布路径缺失或无效：\n- ${missingTargets.join('\n- ')}`)
  }

  const distDir = path.join(packageDir, 'dist')
  const allowedDistEntries = new Set(['esm', 'cjs', 'types', 'assets', 'style.css'])
  const unexpectedDistEntries = (await fs.readdir(distDir)).filter((entry) => !allowedDistEntries.has(entry))
  if (unexpectedDistEntries.length > 0) {
    throw new Error(`组件库 dist 包含应用静态资源或未知产物：${unexpectedDistEntries.join(', ')}`)
  }
  const distPaths = (await fs.readdir(distDir, { recursive: true })).map((entry) => `dist/${entry}`)
  const foundLegacyOutputs = distPaths.filter(
    (relativePath) =>
      relativePath.startsWith('dist/entries/') ||
      relativePath.includes('pro-react-components') ||
      relativePath.includes('.umd.') ||
      relativePath.startsWith('dist/types/src/') ||
      relativePath.startsWith('dist/esm-styles/') ||
      relativePath.startsWith('dist/cjs-styles/') ||
      relativePath.endsWith('/style-entry.js')
  )
  if (foundLegacyOutputs.length > 0) {
    throw new Error(`组件库仍包含 v4 legacy 产物：\n- ${foundLegacyOutputs.join('\n- ')}`)
  }

  log(
    `Validated ${libraryComponents.length} components and ${packageTargets.length} publish targets for ${packageJson.name}@${packageJson.version}.`
  )
}

main().catch((error) => {
  logError(error)
  process.exitCode = 1
})
