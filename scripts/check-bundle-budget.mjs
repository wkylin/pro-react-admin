import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const statsPath = path.resolve(root, process.argv[2] || 'compilation-stats.json')
const budget = JSON.parse(fs.readFileSync(path.join(root, 'config/bundle-budget.json'), 'utf8'))

if (!fs.existsSync(statsPath)) {
  throw new Error(`Missing Webpack stats file: ${path.relative(root, statsPath)}. Run pnpm run build:stats first.`)
}

const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
if (stats.errors?.length) {
  throw new Error(`Webpack reported ${stats.errors.length} build error(s); inspect ${path.relative(root, statsPath)}.`)
}

const assetMap = new Map((stats.assets || []).map((asset) => [asset.name, asset]))
const entrypoint = stats.entrypoints?.app || Object.values(stats.entrypoints || {})[0]
const entrypointAssets = (entrypoint?.assets || [])
  .map((asset) => (typeof asset === 'string' ? asset : asset.name))
  .filter((name) => typeof name === 'string' && /\.(?:js|css)$/i.test(name) && !/\.map$/i.test(name))

if (!entrypointAssets.length) {
  throw new Error('Webpack stats do not contain initial JavaScript/CSS assets for the app entrypoint.')
}

const assetSize = (name) => {
  const record = assetMap.get(name)
  if (record && Number.isFinite(record.size)) return record.size
  const matchingEntrypoint = (entrypoint?.assets || []).find((asset) => asset?.name === name)
  return Number(matchingEntrypoint?.size || 0)
}

const initialSize = entrypointAssets.reduce((total, name) => total + assetSize(name), 0)
const oversized = entrypointAssets
  .map((name) => ({ name, size: assetSize(name) }))
  .filter(({ size }) => size > budget.singleJavaScriptCssAssetBytes)

console.log(`[bundle-budget] initial JS/CSS: ${(initialSize / 1024 / 1024).toFixed(2)} MiB / ${(budget.initialJavaScriptCssBytes / 1024 / 1024).toFixed(2)} MiB`)
for (const { name, size } of entrypointAssets.map((name) => ({ name, size: assetSize(name) }))) {
  console.log(`  ${(size / 1024).toFixed(1)} KiB  ${name}`)
}

if (initialSize > budget.initialJavaScriptCssBytes || oversized.length) {
  process.exitCode = 1
  console.error('[bundle-budget] exceeded; update the budget only after reviewing a new baseline.')
}
