import fs from 'node:fs/promises'
import path from 'node:path'
import { error as logError, log } from 'node:console'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(repoRoot, 'packages/wui-react')

async function main() {
  const readmeSource = path.join(repoRoot, 'NPM_README.md')
  const licenseSource = path.join(repoRoot, 'LICENSE')
  const packageManifest = path.join(packageDir, 'package.json')
  const distDir = path.join(packageDir, 'dist')

  await fs.access(distDir)
  await fs.access(packageManifest)
  await fs.copyFile(readmeSource, path.join(packageDir, 'README.md'))
  await fs.copyFile(licenseSource, path.join(packageDir, 'LICENSE'))

  log('Prepared packages/wui-react for packing.')
}

main().catch((err) => {
  logError(err)
  process.exit(1)
})
