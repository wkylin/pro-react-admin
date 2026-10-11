import { resolveProject } from '../config/project-registry.mjs'
import { resolve } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const src = resolve(root, 'src')
const selected = resolveProject(process.env.PROJECT || 'default')
const { name: projectName, project } = selected

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

const basePublicDir = resolve(root, 'public')
const projectRootDir = selected.sourceRoot
const projectPublicDir = projectName === 'default' ? '' : resolve(projectRootDir, 'public')
const projectRoutersDir = selected.routers
const entry = selected.entry
const mfeExpose = selected.mfeExpose
const build = selected.output

if (!existsFile(entry)) {
  throw new Error('[webpack] Entry for PROJECT="' + projectName + '" does not exist: ' + entry)
}
if (!existsDir(projectRoutersDir)) {
  throw new Error('[webpack] Router directory for PROJECT="' + projectName + '" does not exist: ' + projectRoutersDir)
}
if (process.env.MFE_ROLE === 'remote' && (!mfeExpose || !existsFile(mfeExpose))) {
  throw new Error(
    '[webpack] PROJECT="' + projectName + '" does not define a valid mfeExpose entry in ' + 'src/projects/registry.json'
  )
}

const htmlTemplate = (() => {
  const candidate = projectPublicDir ? resolve(projectPublicDir, 'index.html') : ''
  return existsFile(candidate) ? candidate : resolve(basePublicDir, 'index.html')
})()

const favicon = (() => {
  const candidate = projectPublicDir ? resolve(projectPublicDir, 'favicon.ico') : ''
  return existsFile(candidate) ? candidate : resolve(basePublicDir, 'favicon.ico')
})()

const appDir = projectRootDir
const routersDir = projectRoutersDir
const devServerStatic = [projectPublicDir, basePublicDir].filter((p) => existsDir(p))

const copyPublicDirs = [basePublicDir]
if (projectPublicDir && existsDir(projectPublicDir) && projectPublicDir !== basePublicDir) {
  copyPublicDirs.push(projectPublicDir)
}

export default {
  projectName,
  project,
  src,
  entry,
  mfeExpose,
  appDir,
  routersDir,
  build,
  public: basePublicDir,
  projectPublic: projectPublicDir,
  htmlTemplate,
  favicon,
  devServerStatic,
  copyPublicDirs,
}
