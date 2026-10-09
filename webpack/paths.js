import { resolve } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const src = resolve(root, 'src')
const registryPath = resolve(src, 'projects/registry.json')
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))

const projectName = (() => {
  const raw = (process.env.PROJECT || 'default').toString().trim()
  return raw || 'default'
})()

const project = Object.hasOwn(registry.projects, projectName) ? registry.projects[projectName] : undefined
if (!project) {
  throw new Error(
    '[webpack] Unknown PROJECT="' +
      projectName +
      '". Registered projects: ' +
      Object.keys(registry.projects).join(', ')
  )
}

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
const projectRootDir = resolve(src, project.sourceRoot)
const projectPublicDir = projectName === 'default' ? '' : resolve(projectRootDir, 'public')
const projectRoutersDir = resolve(projectRootDir, project.routers)
const entry = resolve(projectRootDir, project.entry)
const mfeExpose = project.mfeExpose ? resolve(projectRootDir, project.mfeExpose) : undefined
const build = resolve(root, project.output)

if (!existsFile(entry)) {
  throw new Error('[webpack] Entry for PROJECT="' + projectName + '" does not exist: ' + entry)
}
if (!existsDir(projectRoutersDir)) {
  throw new Error('[webpack] Router directory for PROJECT="' + projectName + '" does not exist: ' + projectRoutersDir)
}
if (process.env.MFE_ROLE === 'remote' && (!mfeExpose || !existsFile(mfeExpose))) {
  throw new Error(
    '[webpack] PROJECT="' + projectName + '" does not define a valid mfeExpose entry in ' + registryPath
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
