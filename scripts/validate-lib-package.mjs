import fs from 'node:fs/promises'
import path from 'node:path'
import { error as logError, log } from 'node:console'
import process from 'node:process'
import { isDeepStrictEqual } from 'node:util'
import { fileURLToPath } from 'node:url'
import {
  libraryEntrypoints,
  libraryExports,
  libraryPackageName,
  libraryPeerDependencies,
} from '../config/library-contract.mjs'

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

  const requiredFields = ['name', 'version', 'main', 'module', 'types', 'exports', 'peerDependencies']
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
  if (!['dist', 'README.md', 'LICENSE'].every((entry) => packageJson.files?.includes(entry))) {
    throw new Error('组件库 files 必须包含 dist、README.md 和 LICENSE')
  }
  if (packageJson.publishConfig?.access !== 'public') {
    throw new Error('组件库 publishConfig.access 必须为 public')
  }
  if (!rootPackageJson.private || rootPackageJson.name === libraryPackageName) {
    throw new Error('应用根 package 必须保持 private，并与组件库使用独立 package 名称')
  }
  if (!isDeepStrictEqual(packageJson.peerDependencies, libraryPeerDependencies)) {
    throw new Error('组件库 peerDependencies 与 config/library-contract.mjs 不一致')
  }
  if (!isDeepStrictEqual(packageJson.exports, libraryExports)) {
    throw new Error('组件库 exports 与 config/library-contract.mjs 不一致')
  }
  if (
    packageJson.main !== libraryEntrypoints.main ||
    packageJson.module !== libraryEntrypoints.module ||
    packageJson.types !== libraryEntrypoints.types
  ) {
    throw new Error('组件库 main/module/types 与 config/library-contract.mjs 不一致')
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

  log(`Validated ${packageTargets.length} component-library package targets.`)
}

main().catch((error) => {
  logError(error)
  process.exitCode = 1
})
