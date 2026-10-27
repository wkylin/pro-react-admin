import path from 'node:path'
import { createBuildPlan, loadProjectRegistry, workspaceRoot } from './project-registry.mjs'
import { URL } from 'node:url'

export const pagesTargets = ['all', 'default', 'enterprise', 'mfe', 'multi', 'storybook']

export function createPagesPlan(
  { target = 'all', basePath = '/pro-react-admin/', siteUrl = 'https://wkylin.github.io', buildTool } = {},
  registry = loadProjectRegistry()
) {
  if (!pagesTargets.includes(target)) throw new Error(`Unknown Pages target: ${target}`)
  if (buildTool !== undefined && !['webpack', 'vite'].includes(buildTool))
    throw new Error(`Unknown Pages build tool: ${buildTool}`)
  const base = basePath === '' || basePath === '/' ? '/' : `/${basePath.replace(/^\/+|\/+$/g, '')}/`
  if (!/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(base) || base.includes('/../'))
    throw new Error('PAGES_BASE_PATH must be a site path such as /pro-react-admin/')
  const site = new URL(siteUrl)
  if (site.protocol !== 'https:' || site.username || site.password || site.pathname !== '/' || site.search || site.hash)
    throw new Error('PAGES_SITE_URL must be a credential-free HTTPS origin')
  const selected = (name) => target === 'all' || target === name
  const tasks = []
  const app = (name, destination, action = 'build', extra = {}) => {
    const { selected: project, bundler } = createBuildPlan(action, name, { BUILD_TOOL: buildTool }, registry)
    tasks.push({
      kind: 'app',
      name,
      action,
      bundler,
      destination,
      source: project.output,
      env: {
        BUILD_TOOL: bundler,
        PUBLIC_URL: base + (destination ? destination + '/' : ''),
        REACT_APP_USE_MOCK: 'true',
        ...extra,
      },
    })
  }
  if (selected('default')) app('default', '')
  if (selected('enterprise')) app('enterprise', 'enterprise')
  if (selected('multi')) {
    for (const name of Object.keys(registry.projects).filter(
      (name) =>
        !['default', 'enterprise'].includes(name) &&
        !registry.projects[name].mfeHost &&
        registry.projects[name].authentication !== 'enterprise'
    )) {
      app(name, `projects/${name}`)
    }
  }
  if (selected('mfe')) {
    const host = Object.keys(registry.projects).find((name) => registry.projects[name].mfeHost)
    if (!host) throw new Error('Pages MFE target requires a federation host')
    const remotes = Object.fromEntries(
      registry.remotes.map((remote) => [remote.envKey, site.origin + base + 'mfe' + remote.prodPath])
    )
    for (const remote of registry.remotes) {
      // The all target includes the standalone projectB artifact at this sibling path.
      const standaloneProjectB =
        target === 'all' && remote.name === 'projectB'
          ? { PROJECTB_STANDALONE_BASE_URL: `${site.origin}${base}projects/projectB/` }
          : {}
      app(remote.name, 'mfe' + remote.prodPath.replace(/\/remoteEntry\.js$/, ''), 'mfe-build', {
        ...remotes,
        ...standaloneProjectB,
      })
    }
    app(host, 'mfe', 'mfe-build', remotes)
  }
  tasks.push({
    kind: 'storybook',
    name: 'storybook',
    bundler: buildTool || 'webpack',
    destination: 'storybook',
    source: 'storybook-static',
    env: { STORYBOOK_BASE_HREF: base + 'storybook/' },
  })
  return { target, base, origin: site.origin, tasks }
}

export function createPagesTaskEnv(task, inherited = {}) {
  const env = {
    ...inherited,
    NODE_ENV: 'production',
    CI: 'true',
    SENTRY_SOURCE_MAP: 'no',
    ...task.env,
    BUILD_TOOL: task.bundler,
  }
  // Each Pages artifact uses the project's registered output as its copy source.
  delete env.MFE_ROLE
  if (task.kind === 'app' && task.bundler === 'vite') env.VITE_OUT_DIR = path.relative(workspaceRoot, task.source)
  else delete env.VITE_OUT_DIR
  return env
}

export function getPagesEntryBundler(entry, deployment) {
  const bundler = entry.bundler || deployment.bundler || 'webpack'
  if (!['webpack', 'vite'].includes(bundler)) throw new Error(`Unknown Pages build tool: ${bundler}`)
  return bundler
}
