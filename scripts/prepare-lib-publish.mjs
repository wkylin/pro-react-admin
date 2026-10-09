import fs from 'node:fs/promises'
import path from 'node:path'

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function pickDefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

function toPublishedPath(value) {
  return typeof value === 'string' ? value.replace(/^\.\/dist-lib\//, './') : value
}

function toPublishedExport(target) {
  if (typeof target === 'string') return toPublishedPath(target)
  if (!target || typeof target !== 'object') return target

  return Object.fromEntries(Object.entries(target).map(([condition, value]) => [condition, toPublishedPath(value)]))
}

async function main() {
  const repoRoot = process.cwd()
  const rootPkgPath = path.join(repoRoot, 'package.json')
  const distDir = path.join(repoRoot, 'dist-lib')

  if (!(await fileExists(distDir))) {
    throw new Error('dist-lib 不存在：请先运行 pnpm run build:lib && pnpm run build:lib:entries')
  }

  const rootPkg = JSON.parse(await fs.readFile(rootPkgPath, 'utf8'))

  // dist-lib 作为“发布目录”时，exports/main/module/types 需要去掉 dist-lib 前缀。
  const distPkg = {
    name: rootPkg.name,
    version: rootPkg.version,
    description: rootPkg.description,
    keywords: rootPkg.keywords,
    homepage: rootPkg.homepage,
    bugs: rootPkg.bugs,
    license: rootPkg.license,
    author: rootPkg.author,
    contributors: rootPkg.contributors,
    repository: rootPkg.repository,
    sideEffects: rootPkg.sideEffects,
    peerDependencies: rootPkg.peerDependencies,
    main: toPublishedPath(rootPkg.main),
    module: toPublishedPath(rootPkg.module),
    types: toPublishedPath(rootPkg.types),
    exports: Object.fromEntries(
      Object.entries(rootPkg.exports || {}).map(([subpath, target]) => [subpath, toPublishedExport(target)])
    ),
  }

  const distPkgPath = path.join(distDir, 'package.json')
  await fs.writeFile(distPkgPath, JSON.stringify(pickDefined(distPkg), null, 2) + '\n', 'utf8')

  // README：发布包使用 dist-lib/README.md（不影响仓库根 README.md）
  const npmReadmePath = path.join(repoRoot, 'NPM_README.md')
  const distReadmePath = path.join(distDir, 'README.md')
  if (await fileExists(npmReadmePath)) {
    await fs.copyFile(npmReadmePath, distReadmePath)
  } else {
    await fs.writeFile(distReadmePath, `# ${rootPkg.name}\n\nThis package is built from pro-react-admin.\n`, 'utf8')
  }

  // LICENSE：npm 展示会优先识别包根目录的 LICENSE
  const licenseSrc = path.join(repoRoot, 'LICENSE')
  const licenseDest = path.join(distDir, 'LICENSE')
  if (await fileExists(licenseSrc)) {
    await fs.copyFile(licenseSrc, licenseDest)
  }

  // 给发布目录一个最小 .npmignore（可选）：不强制添加，避免误删产物。
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
