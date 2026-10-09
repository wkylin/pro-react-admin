import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertClientEnvKeys, clientEnvKeys } from '../webpack/client-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(root, 'src')
const registryPath = path.join(sourceRoot, 'projects/registry.json')
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
const projectNames = Object.keys(registry.projects || {})
const outputDirs = new Set()

if (!Number.isInteger(registry.mfeProtocolVersion) || registry.mfeProtocolVersion < 1) {
  throw new Error('mfeProtocolVersion must be a positive integer')
}

assertClientEnvKeys(clientEnvKeys)

function resolveInside(base, relativePath, label) {
  if (typeof relativePath !== 'string' || !relativePath.trim()) {
    throw new Error(label + ' must be a non-empty relative path')
  }
  if (path.isAbsolute(relativePath)) throw new Error(label + ' must be relative')
  const absolutePath = path.resolve(base, relativePath)
  if (absolutePath !== base && !absolutePath.startsWith(base + path.sep)) {
    throw new Error(label + ' must stay inside ' + base)
  }
  return absolutePath
}

for (const name of projectNames) {
  const project = registry.projects[name]
  const projectRoot = resolveInside(sourceRoot, project.sourceRoot, 'projects.' + name + '.sourceRoot')
  const entry = resolveInside(projectRoot, project.entry, 'projects.' + name + '.entry')
  const routers = resolveInside(projectRoot, project.routers, 'projects.' + name + '.routers')
  const output = resolveInside(root, project.output, 'projects.' + name + '.output')

  if (!fs.existsSync(entry) || !fs.statSync(entry).isFile()) {
    throw new Error('Missing entry for ' + name + ': ' + path.relative(root, entry))
  }
  if (!fs.existsSync(routers) || !fs.statSync(routers).isDirectory()) {
    throw new Error('Missing router directory for ' + name + ': ' + path.relative(root, routers))
  }
  if (outputDirs.has(output)) throw new Error('Duplicate output directory: ' + project.output)
  outputDirs.add(output)

  if (project.mfeExpose) {
    const expose = resolveInside(projectRoot, project.mfeExpose, 'projects.' + name + '.mfeExpose')
    if (!fs.existsSync(expose) || !fs.statSync(expose).isFile()) {
      throw new Error('Missing Module Federation expose for ' + name + ': ' + path.relative(root, expose))
    }
  }
}

const remotes = registry.remotes || []
const remoteNames = new Set()
const routePaths = new Set()
const envKeys = new Set()
for (const remote of remotes) {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(remote.name)) {
    throw new Error('Invalid Module Federation Remote name: ' + remote.name)
  }
  if (!registry.projects[remote.name]?.mfeExpose) {
    throw new Error('Remote ' + remote.name + ' must reference a registered project with mfeExpose')
  }
  if (!remote.label || !Number.isInteger(remote.devPort) || remote.devPort < 1 || remote.devPort > 65535) {
    throw new Error('Remote ' + remote.name + ' must define a label and valid devPort')
  }
  if (remoteNames.has(remote.name)) throw new Error('Duplicate Remote name: ' + remote.name)
  if (routePaths.has(remote.routePath)) throw new Error('Duplicate Remote route: ' + remote.routePath)
  if (envKeys.has(remote.envKey)) throw new Error('Duplicate Remote URL environment key: ' + remote.envKey)
  if (!/^\/[A-Za-z0-9/_-]+$/.test(remote.routePath)) {
    throw new Error('Invalid routePath for Remote ' + remote.name)
  }
  if (!/^MFE_[A-Z0-9_]+_URL$/.test(remote.envKey)) {
    throw new Error('Invalid URL environment key for Remote ' + remote.name)
  }

  const devUrl = new URL(remote.devUrl)
  if (!['http:', 'https:'].includes(devUrl.protocol) || Number(devUrl.port) !== remote.devPort) {
    throw new Error('devUrl protocol/port does not match devPort for Remote ' + remote.name)
  }
  if (!remote.prodPath.startsWith('/') || remote.prodPath.startsWith('//')) {
    throw new Error('prodPath must be a same-origin absolute path for Remote ' + remote.name)
  }

  remoteNames.add(remote.name)
  routePaths.add(remote.routePath)
  envKeys.add(remote.envKey)
}

const shellEntry = fs.readFileSync(path.join(sourceRoot, 'projects/shell/remote-components.tsx'), 'utf8')
const federationTypes = fs.readFileSync(path.join(root, 'typings/module-federation.d.ts'), 'utf8')
const staticImports = Array.from(shellEntry.matchAll(/import\(['"]([^'"]+)\/App['"]\)/g), (match) => match[1]).sort()
const typeDeclarations = Array.from(federationTypes.matchAll(/declare module ['"]([^'"]+)\/App['"]/g), (match) => match[1]).sort()
const expectedNames = [...remoteNames].sort()

if (JSON.stringify(staticImports) !== JSON.stringify(expectedNames)) {
  throw new Error('RemoteApp static imports must match registry remotes: ' + expectedNames.join(', '))
}
if (JSON.stringify(typeDeclarations) !== JSON.stringify(expectedNames)) {
  throw new Error('Module Federation type declarations must match registry remotes: ' + expectedNames.join(', '))
}

console.log(
  '[project-registry] ' +
    projectNames.length +
    ' projects, ' +
    remotes.length +
    ' remotes, and ' +
    clientEnvKeys.length +
    ' browser-safe environment keys'
)
