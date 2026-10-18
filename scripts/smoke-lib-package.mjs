import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { log } from 'node:console'
import { fileURLToPath } from 'node:url'
import { libraryComponents, libraryPackageName } from '../config/library-contract.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(repoRoot, 'packages/wui-react')
const consumerDir = await fs.mkdtemp(path.join(os.tmpdir(), 'wui-react-consumer-'))
const packageLink = path.join(consumerDir, 'node_modules', ...libraryPackageName.split('/'))
const expectedRootExports = libraryComponents
  .flatMap(({ name, runtimeExports = [] }) => [name, ...runtimeExports])
  .sort()
const subpaths = libraryComponents.map(({ subpath }) => subpath)

const runNode = (label, args) => {
  const result = spawnSync(process.execPath, args, {
    cwd: consumerDir,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    env: { ...process.env, NODE_ENV: 'production' },
  })

  if (result.status !== 0) {
    throw new Error(`${label} 消费检查失败：\n${result.stderr || result.stdout}`)
  }

  return JSON.parse(result.stdout)
}

const assertResult = (label, result) => {
  const actualRootExports = [...result.rootExports].sort()
  if (JSON.stringify(actualRootExports) !== JSON.stringify(expectedRootExports)) {
    throw new Error(
      `${label} 根入口导出不一致：actual=${actualRootExports.join(', ')}; expected=${expectedRootExports.join(', ')}`
    )
  }

  const missingDefaults = subpaths.filter((subpath) => !result.componentDefaults.includes(subpath))
  if (missingDefaults.length > 0) {
    throw new Error(`${label} 子路径缺少 default export：${missingDefaults.join(', ')}`)
  }

  if (!result.styleResolved || !result.packageJsonResolved) {
    throw new Error(`${label} 未能解析 style.css 或 package.json export`)
  }
}

try {
  await fs.mkdir(path.dirname(packageLink), { recursive: true })
  await fs.symlink(packageDir, packageLink, process.platform === 'win32' ? 'junction' : 'dir')

  const esmScript = `
    const packageName = ${JSON.stringify(libraryPackageName)}
    const subpaths = ${JSON.stringify(subpaths)}
    const root = await import(packageName)
    const componentDefaults = []
    for (const subpath of subpaths) {
      const component = await import(packageName + '/' + subpath)
      if ('default' in component && component.default != null) componentDefaults.push(subpath)
    }
    process.stdout.write(JSON.stringify({
      rootExports: Object.keys(root),
      componentDefaults,
      styleResolved: Boolean(import.meta.resolve(packageName + '/style.css')),
      packageJsonResolved: Boolean(import.meta.resolve(packageName + '/package.json')),
    }))
  `

  const cjsScript = `
    const packageName = ${JSON.stringify(libraryPackageName)}
    const subpaths = ${JSON.stringify(subpaths)}
    const root = require(packageName)
    const componentDefaults = []
    for (const subpath of subpaths) {
      const component = require(packageName + '/' + subpath)
      if ('default' in component && component.default != null) componentDefaults.push(subpath)
    }
    process.stdout.write(JSON.stringify({
      rootExports: Object.keys(root),
      componentDefaults,
      styleResolved: Boolean(require.resolve(packageName + '/style.css')),
      packageJsonResolved: Boolean(require.resolve(packageName + '/package.json')),
    }))
  `

  const esmResult = runNode('ESM', ['--input-type=module', '--eval', esmScript])
  const cjsResult = runNode('CJS', ['--eval', cjsScript])
  assertResult('ESM', esmResult)
  assertResult('CJS', cjsResult)

  log(`Consumer smoke passed for ESM/CJS root exports and ${libraryComponents.length} component subpaths.`)
} finally {
  await fs.rm(consumerDir, { recursive: true, force: true })
}
