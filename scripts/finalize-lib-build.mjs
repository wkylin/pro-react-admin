import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist-lib')
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
