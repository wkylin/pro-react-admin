import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { log } from 'node:console'
import { fileURLToPath } from 'node:url'
import { libraryPackageBudget, libraryPackageName } from '../config/library-contract.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(repoRoot, 'packages/wui-react')
const npmCacheDir = await fs.mkdtemp(path.join(os.tmpdir(), 'wui-react-pack-'))
const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const formatMiB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`

try {
  const result = spawnSync(npmExecutable, ['pack', '--dry-run', '--json', '--ignore-scripts', packageDir], {
    cwd: repoRoot,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    env: {
      ...process.env,
      npm_config_cache: npmCacheDir,
    },
  })

  if (result.status !== 0) {
    throw new Error(`npm pack --dry-run 失败：\n${result.stderr || result.stdout}`)
  }

  const [pack] = JSON.parse(result.stdout)
  if (!pack || pack.name !== libraryPackageName) {
    throw new Error(`npm pack 返回了意外的 package：${pack?.name ?? 'unknown'}`)
  }

  const violations = []
  if (pack.entryCount > libraryPackageBudget.maxFiles) {
    violations.push(`文件数 ${pack.entryCount} > ${libraryPackageBudget.maxFiles}`)
  }
  if (pack.size > libraryPackageBudget.maxPackedBytes) {
    violations.push(`压缩体积 ${formatMiB(pack.size)} > ${formatMiB(libraryPackageBudget.maxPackedBytes)}`)
  }
  if (pack.unpackedSize > libraryPackageBudget.maxUnpackedBytes) {
    violations.push(`解包体积 ${formatMiB(pack.unpackedSize)} > ${formatMiB(libraryPackageBudget.maxUnpackedBytes)}`)
  }

  const packedPaths = pack.files.map(({ path: filePath }) => filePath)
  const forbiddenPaths = packedPaths.filter(
    (filePath) =>
      filePath.startsWith('src/') ||
      filePath.includes('/node_modules/') ||
      filePath.startsWith('dist/entries/') ||
      filePath.includes('pro-react-components') ||
      filePath.includes('.umd.') ||
      filePath.startsWith('dist/esm-styles/') ||
      filePath.startsWith('dist/cjs-styles/') ||
      filePath.endsWith('/style-entry.js')
  )
  if (forbiddenPaths.length > 0) {
    violations.push(`包含禁止发布的 legacy/source 文件：${forbiddenPaths.slice(0, 10).join(', ')}`)
  }

  for (const requiredPath of ['README.md', 'LICENSE', 'package.json', 'dist/style.css']) {
    if (!packedPaths.includes(requiredPath)) {
      violations.push(`缺少发布文件 ${requiredPath}`)
    }
  }

  if (violations.length > 0) {
    throw new Error(`组件库发布包不符合预算：\n- ${violations.join('\n- ')}`)
  }

  log(
    `Package budget passed: ${pack.name}@${pack.version}, ${pack.entryCount} files, ${formatMiB(
      pack.size
    )} packed, ${formatMiB(pack.unpackedSize)} unpacked.`
  )
} finally {
  await fs.rm(npmCacheDir, { recursive: true, force: true })
}
