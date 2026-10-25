import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const registryFile = path.join(workspaceRoot, 'src/projects/registry.json')
export function loadProjectRegistry(file = registryFile) {
  const registry = JSON.parse(fs.readFileSync(file, 'utf8'))
  validateProjectRegistry(registry)
  return registry
}
export function resolveInside(base, relative, label) {
  if (typeof relative !== 'string' || !relative.trim() || path.isAbsolute(relative))
    throw new Error(`${label} must be a relative path`)
  const resolved = path.resolve(base, relative)
  if (resolved !== base && !resolved.startsWith(base + path.sep)) throw new Error(`${label} escapes ${base}`)
  return resolved
}
export function validateProjectRegistry(registry) {
  if (!registry || typeof registry.projects !== 'object' || !registry.projects.default)
    throw new Error('Registry requires a default project')
  const outputs = []
  for (const [name, project] of Object.entries(registry.projects)) {
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) throw new Error(`Invalid project name: ${name}`)
    const source = resolveInside(path.join(workspaceRoot, 'src'), project.sourceRoot, `${name}.sourceRoot`)
    for (const key of ['entry', 'routers', ...(project.mfeExpose ? ['mfeExpose'] : [])])
      resolveInside(source, project[key], `${name}.${key}`)
    const output = resolveInside(workspaceRoot, project.output, `${name}.output`)
    // Build/clean must never target source code, dependencies, config, or the workspace root.
    if (!/^(?:dist(?:[-/]|$)|artifacts\/)/.test(path.relative(workspaceRoot, output)) || output === workspaceRoot)
      throw new Error(`${name}.output must be inside dist*, dist/, or artifacts/`)
    if (
      outputs.some(
        (other) => output === other || output.startsWith(other + path.sep) || other.startsWith(output + path.sep)
      )
    )
      throw new Error(`Overlapping build output: ${project.output}`)
    outputs.push(output)
  }
  const names = new Set(),
    routes = new Set(),
    envKeys = new Set(),
    ports = new Set(),
    prodPaths = new Set()
  for (const remote of registry.remotes ?? []) {
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(remote.name) || !registry.projects[remote.name]?.mfeExpose)
      throw new Error(`Invalid remote project: ${remote.name}`)
    const devUrl = new URL(remote.devUrl)
    if (
      !remote.label ||
      !Number.isInteger(remote.devPort) ||
      remote.devPort < 1 ||
      remote.devPort > 65535 ||
      !['http:', 'https:'].includes(devUrl.protocol) ||
      Number(devUrl.port) !== remote.devPort
    )
      throw new Error(`Invalid remote development address: ${remote.name}`)
    if (!/^\/[A-Za-z0-9/_-]+$/.test(remote.routePath) || !/^MFE_[A-Z0-9_]+_URL$/.test(remote.envKey))
      throw new Error(`Invalid remote route/env: ${remote.name}`)
    if (!/^\/[A-Za-z0-9/_-]+\/remoteEntry\.js$/.test(remote.prodPath) || remote.prodPath.includes('/../'))
      throw new Error(`Invalid remote production path: ${remote.name}`)
    for (const [set, value] of [
      [names, remote.name],
      [routes, remote.routePath],
      [envKeys, remote.envKey],
      [ports, remote.devPort],
      [prodPaths, remote.prodPath],
    ]) {
      if (set.has(value)) throw new Error(`Duplicate remote contract: ${value}`)
      set.add(value)
    }
  }
}
export function resolveProject(projectName = 'default', registry = loadProjectRegistry()) {
  const name = projectName.trim() || 'default'
  if (!Object.hasOwn(registry.projects, name))
    throw new Error(`Unknown project "${name}". Registered: ${Object.keys(registry.projects).join(', ')}`)
  const project = registry.projects[name]
  const sourceRoot = resolveInside(path.join(workspaceRoot, 'src'), project.sourceRoot, `${name}.sourceRoot`)
  return {
    name,
    project,
    sourceRoot,
    entry: resolveInside(sourceRoot, project.entry, `${name}.entry`),
    routers: resolveInside(sourceRoot, project.routers, `${name}.routers`),
    output: resolveInside(workspaceRoot, project.output, `${name}.output`),
    mfeExpose: project.mfeExpose ? resolveInside(sourceRoot, project.mfeExpose, `${name}.mfeExpose`) : undefined,
    remote: registry.remotes?.find((remote) => remote.name === name),
  }
}
export function createBuildPlan(action, name, inherited = {}, registry = loadProjectRegistry()) {
  if (!['dev', 'build', 'mfe-dev', 'mfe-build', 'mfe-build-standalone'].includes(action))
    throw new Error(`Unknown project action: ${action}`)
  const bundler = inherited.BUILD_TOOL || 'webpack'
  if (!['webpack', 'vite'].includes(bundler)) throw new Error(`Unknown build tool: ${bundler}`)
  const selected = resolveProject(name, registry)
  const isDev = action === 'dev' || action === 'mfe-dev'
  const isMfe = action.startsWith('mfe-')
  const host = selected.project.mfeHost === true
  if (isMfe && !host && !selected.remote) throw new Error(`${name} is not a registered federation host/remote`)
  const env = {
    ...inherited,
    BUILD_TOOL: bundler,
    PROJECT: selected.name,
    NODE_ENV: isDev ? 'development' : 'production',
    ...(bundler === 'webpack' ? { BUILD_GOAL: isDev ? 'development' : 'production' } : {}),
    SENTRY_SOURCE_MAP: inherited.SENTRY_SOURCE_MAP ?? 'no',
  }
  // Enterprise builds default to tenant-backed auth; demo mode must be explicit.
  if (selected.name === 'enterprise' && env.REACT_APP_USE_MOCK === undefined) env.REACT_APP_USE_MOCK = 'false'
  delete env.MFE_ROLE
  if (isMfe) {
    env.MFE_ROLE = host ? 'host' : 'remote'
    if (isDev) {
      env.PORT ||= String(host ? 8080 : selected.remote.devPort)
      if (host) for (const remote of registry.remotes) env[remote.envKey] ||= remote.devUrl
    } else {
      env.PUBLIC_URL ||=
        host || action === 'mfe-build-standalone' ? '/' : selected.remote.prodPath.replace(/remoteEntry\.js$/, '')
    }
  }
  return {
    selected,
    bundler,
    output: path.relative(workspaceRoot, resolveBuildOutput(selected, inherited.VITE_OUT_DIR, bundler)),
    env,
    args:
      bundler === 'vite'
        ? [
            ...(isDev ? ['--host'] : ['build']),
            '--config',
            './build/vite/app.config.ts',
            ...(inherited.BUILD_GOAL ? ['--mode', inherited.BUILD_GOAL] : []),
          ]
        : [
            ...(isDev ? ['serve'] : []),
            '--config',
            `./build/webpack/webpack.${isDev ? 'dev' : 'prod'}.js`,
            '--stats-error-details',
          ],
  }
}

export function resolveBuildOutput(selected, override, bundler = 'webpack') {
  if (bundler === 'webpack') return selected.output
  const relative = override?.trim() || `dist-vite${selected.name === 'default' ? '' : `-${selected.name}`}`
  const output = resolveInside(workspaceRoot, relative, 'VITE_OUT_DIR')
  if (!/^(?:dist(?:[-/]|$)|artifacts\/)/.test(path.relative(workspaceRoot, output)))
    throw new Error('VITE_OUT_DIR must be inside dist*, dist/, or artifacts/')
  return output
}
