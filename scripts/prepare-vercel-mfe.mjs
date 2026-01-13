import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const outDir = path.resolve(root, 'dist-vercel')

const shellDir = path.resolve(root, 'dist-shell')
const projectADir = path.resolve(root, 'dist-projectA')
const projectBDir = path.resolve(root, 'dist-projectB')

function existsDir(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  fs.cpSync(src, dest, { recursive: true })
}

function ensureBuildExists(dir, name) {
  if (!existsDir(dir)) {
    throw new Error(
      `[vercel:mfe] Missing build output for ${name}: ${dir}. ` +
        `Run \"npm run build:mf:${name}\" first (or the aggregate build script).`
    )
  }
}

ensureBuildExists(shellDir, 'shell')
ensureBuildExists(projectADir, 'projectA')
ensureBuildExists(projectBDir, 'projectB')

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

// 1) Shell goes to root
copyDir(shellDir, outDir)

// 2) Remotes go to subpaths
copyDir(projectADir, path.resolve(outDir, 'projectA'))
copyDir(projectBDir, path.resolve(outDir, 'projectB'))

// Vercel expects a single output directory; this script assembles it.
console.log('[vercel:mfe] Assembled dist-vercel')
console.log('  - shell:', shellDir, '->', outDir)
console.log('  - projectA:', projectADir, '->', path.resolve(outDir, 'projectA'))
console.log('  - projectB:', projectBDir, '->', path.resolve(outDir, 'projectB'))
