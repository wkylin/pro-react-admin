import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const statsPath = path.resolve(root, process.argv[2] || 'build-stats.json')
const budgets = JSON.parse(fs.readFileSync(path.join(root, 'config/bundle-budget.json'), 'utf8'))
const projectName = process.argv[3] || process.env.PROJECT || 'default'
const budget = { ...budgets, ...budgets.projects?.[projectName] }

if (!fs.existsSync(statsPath)) {
  throw new Error(`Missing Vite stats file: ${path.relative(root, statsPath)}. Run pnpm run build:stats first.`)
}

const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
const assetMap = new Map((stats.assets || []).map((asset) => [asset.name, asset]))
const entrypointAssets = (stats.initialAssets || []).filter((name) => /\.(?:js|css)$/i.test(name))

if (!entrypointAssets.length) {
  throw new Error('Vite stats do not contain initial JavaScript/CSS assets for the app entrypoint.')
}

const assetSize = (name) => Number(assetMap.get(name)?.size || 0)

const initialSize = entrypointAssets.reduce((total, name) => total + assetSize(name), 0)
const oversized = [...assetMap.values()]
  .filter(({ name }) => /\.(?:js|css)$/i.test(name))
  .map(({ name, size }) => ({ name, size }))
  .filter(({ size }) => size > budget.singleJavaScriptCssAssetBytes)

console.log(
  `[bundle-budget] initial JS/CSS: ${(initialSize / 1024 / 1024).toFixed(2)} MiB / ${(budget.initialJavaScriptCssBytes / 1024 / 1024).toFixed(2)} MiB`
)
for (const { name, size } of entrypointAssets.map((name) => ({ name, size: assetSize(name) }))) {
  console.log(`  ${(size / 1024).toFixed(1)} KiB  ${name}`)
}

const totalSize = [...assetMap.values()]
  .filter(({ name }) => /\.(?:js|css)$/i.test(name))
  .reduce((total, asset) => total + asset.size, 0)
if (budget.totalJavaScriptCssBytes)
  console.log(
    `[bundle-budget] all JS/CSS: ${(totalSize / 1024 / 1024).toFixed(2)} MiB / ${(budget.totalJavaScriptCssBytes / 1024 / 1024).toFixed(2)} MiB`
  )
if (
  initialSize > budget.initialJavaScriptCssBytes ||
  oversized.length ||
  (budget.totalJavaScriptCssBytes && totalSize > budget.totalJavaScriptCssBytes)
) {
  process.exitCode = 1
  for (const { name, size } of oversized) {
    console.error(`[bundle-budget] oversized asset: ${name} (${(size / 1024 / 1024).toFixed(2)} MiB)`)
  }
  console.error('[bundle-budget] exceeded; update the budget only after reviewing a new baseline.')
}
