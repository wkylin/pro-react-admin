import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'packages/wui-react/dist')
const target = process.argv[2]

if (!['main', 'entries'].includes(target)) {
  throw new Error('用法：node scripts/finalize-lib-build.mjs <main|entries>')
}

const cssFilesToRemove =
  target === 'main'
    ? ['style.umd.css']
    : (await fs.readdir(path.join(distDir, 'entries'))).filter((file) => file.endsWith('.css'))

for (const file of cssFilesToRemove) {
  const cssPath = target === 'main' ? path.join(distDir, file) : path.join(distDir, 'entries', file)
  await fs.rm(cssPath, { force: true })
}
