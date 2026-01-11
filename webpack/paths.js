import { resolve } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const projectName = (() => {
  const raw = (process.env.PROJECT || 'default').toString().trim()
  return raw || 'default'
})()

const existsDir = (p) => {
  try {
    return Boolean(p) && fs.existsSync(p) && fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}

const existsFile = (p) => {
  try {
    return Boolean(p) && fs.existsSync(p) && fs.statSync(p).isFile()
  } catch {
    return false
  }
}

const src = resolve(__dirname, '../src')
const basePublicDir = resolve(__dirname, '../public')
const projectRootDir = projectName === 'default' ? '' : resolve(src, 'projects', projectName)
const projectPublicDir = projectRootDir ? resolve(projectRootDir, 'public') : ''
const projectRoutersDir = projectRootDir ? resolve(projectRootDir, 'routers') : ''

const entry = (() => {
  if (projectName === 'default') return resolve(src, 'index.tsx')
  const candidate = resolve(projectRootDir, 'index.tsx')
  if (existsFile(candidate)) return candidate
  // Fail-safe: keep default app runnable even if project entry is missing.
  // eslint-disable-next-line no-console
  console.warn(`[webpack] PROJECT="${projectName}" entry not found: ${candidate} (fallback to default src/index.tsx)`)
  return resolve(src, 'index.tsx')
})()

const build = resolve(__dirname, projectName === 'default' ? '../dist' : `../dist-${projectName}`)

const htmlTemplate = (() => {
  const candidate = projectPublicDir ? resolve(projectPublicDir, 'index.html') : ''
  return existsFile(candidate) ? candidate : resolve(basePublicDir, 'index.html')
})()

const favicon = (() => {
  const candidate = projectPublicDir ? resolve(projectPublicDir, 'favicon.ico') : ''
  return existsFile(candidate) ? candidate : resolve(basePublicDir, 'favicon.ico')
})()

const appDir = projectRootDir && existsDir(projectRootDir) ? projectRootDir : src
const routersDir = projectRoutersDir && existsDir(projectRoutersDir) ? projectRoutersDir : resolve(src, 'routers')

const devServerStatic = [projectPublicDir, basePublicDir].filter((p) => existsDir(p))

const copyPublicDirs = [basePublicDir]
if (projectPublicDir && existsDir(projectPublicDir) && projectPublicDir !== basePublicDir) {
  // Place project public last so it can override base public assets.
  copyPublicDirs.push(projectPublicDir)
}

export default {
  // Source files
  projectName,
  src,

  entry,

  appDir,
  routersDir,

  // Production build files
  build,

  // Static files that get copied to build folder
  public: basePublicDir,
  projectPublic: projectPublicDir,
  htmlTemplate,
  favicon,
  devServerStatic,
  copyPublicDirs,
}
