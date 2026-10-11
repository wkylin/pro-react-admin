import { loadProjectRegistry, resolveProject } from './project-registry.mjs'
import { URL } from 'node:url'

export const pagesTargets = ['all', 'default', 'enterprise', 'mfe', 'multi', 'storybook']

export function createPagesPlan(
  { target = 'all', basePath = '/pro-react-admin/', siteUrl = 'https://wkylin.github.io' } = {},
  registry = loadProjectRegistry()
) {
  if (!pagesTargets.includes(target)) throw new Error(`Unknown Pages target: ${target}`)
  const base = basePath === '' || basePath === '/' ? '/' : `/${basePath.replace(/^\/+|\/+$/g, '')}/`
  if (!/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(base) || base.includes('/../'))
    throw new Error('PAGES_BASE_PATH must be a site path such as /pro-react-admin/')
  const site = new URL(siteUrl)
  if (site.protocol !== 'https:' || site.username || site.password || site.pathname !== '/' || site.search || site.hash)
    throw new Error('PAGES_SITE_URL must be a credential-free HTTPS origin')
  const selected = (name) => target === 'all' || target === name
  const tasks = []
  const app = (name, destination, action = 'build', extra = {}) => {
    const project = resolveProject(name, registry)
    tasks.push({
      kind: 'app',
      name,
      action,
      destination,
      source: project.output,
      env: { PUBLIC_URL: base + (destination ? destination + '/' : ''), REACT_APP_USE_MOCK: 'true', ...extra },
    })
  }
  if (selected('default')) app('default', '')
  if (selected('enterprise')) app('enterprise', 'enterprise')
  if (selected('multi')) {
    for (const name of Object.keys(registry.projects).filter(
      (name) => !['default', 'enterprise'].includes(name) && !registry.projects[name].mfeHost
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
    for (const remote of registry.remotes)
      app(remote.name, 'mfe' + remote.prodPath.replace(/\/remoteEntry\.js$/, ''), 'mfe-build', remotes)
    app(host, 'mfe', 'mfe-build', remotes)
  }
  tasks.push({
    kind: 'storybook',
    name: 'storybook',
    destination: 'storybook',
    source: 'storybook-static',
    env: { STORYBOOK_BASE_HREF: base + 'storybook/' },
  })
  return { target, base, origin: site.origin, tasks }
}
