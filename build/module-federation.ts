import { federation } from '@module-federation/vite'
import type { PluginOption, Plugin } from 'vite'
import path from 'node:path'
import { loadProjectRegistry, resolveProject, workspaceRoot } from '../config/project-registry.mjs'
import { getMfeSharedDependencies, MFE_MANIFEST_SCHEMA_VERSION } from '../config/mfe-contract.mjs'
import packageJson from '../package.json' with { type: 'json' }
import protocol from '../config/mfe-protocol.json' with { type: 'json' }

export function createFederationPlugins(options: {
  project: string
  role: 'host' | 'remote' | ''
  isDev: boolean
  env: Record<string, string | undefined>
}): PluginOption[] {
  const { project, role, isDev, env } = options
  if (!role) return []
  const registry = loadProjectRegistry()
  const selected = resolveProject(project, registry)
  const sharedDependencies = getMfeSharedDependencies(packageJson.dependencies)
  const shared = Object.fromEntries(
    Object.entries(sharedDependencies).map(([name, requiredVersion]) => [
      name,
      { singleton: true, requiredVersion: String(requiredVersion) },
    ])
  )
  if (role === 'host') {
    if (!selected.project.mfeHost) throw new Error(`${project} is not a registered federation host`)
    const remotes = Object.fromEntries(
      registry.remotes.map((remote) => {
        const entry = (env[remote.envKey] || (isDev ? remote.devUrl : remote.prodPath)).trim()
        const url = new URL(entry, 'https://same-origin.invalid')
        const relative = entry.startsWith('/') && !entry.startsWith('//')
        if (
          (!relative && (!/^https?:$/.test(url.protocol) || (!isDev && url.protocol !== 'https:'))) ||
          url.username ||
          url.password ||
          !url.pathname.endsWith('/remoteEntry.js')
        ) {
          throw new Error(
            `Invalid Remote URL for ${remote.name}: expected ${isDev ? 'HTTP(S)' : 'HTTPS or same-origin path'} to remoteEntry.js`
          )
        }
        return [remote.name, { name: remote.name, entry, type: 'module' }]
      })
    )
    return [
      federation({
        name: project,
        dts: false,
        remotes,
        shared,
        runtimePlugins: [
          [
            path.join(workspaceRoot, 'build/mfe-runtime.ts'),
            {
              protocolVersion: protocol.protocolVersion,
              sharedDependencies,
              remotes: Object.fromEntries(Object.entries(remotes).map(([name, remote]) => [name, remote.entry])),
            },
          ],
        ],
      }),
    ]
  }
  if (!selected.remote || !selected.mfeExpose) throw new Error(`${project} is not a registered federation remote`)
  const manifest =
    JSON.stringify(
      {
        schemaVersion: MFE_MANIFEST_SCHEMA_VERSION,
        name: project,
        label: selected.remote.label,
        version: packageJson.version,
        gitSha: env.GITHUB_SHA || env.VERCEL_GIT_COMMIT_SHA || null,
        protocolVersion: protocol.protocolVersion,
        exposes: { './App': selected.project.mfeExpose },
        sharedDependencies,
      },
      null,
      2
    ) + '\n'
  const manifestPlugin: Plugin = {
    name: 'remote-contract-manifest',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'remote-manifest.json', source: manifest })
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url?.split('?')[0].endsWith('/remote-manifest.json')) return next()
        response.setHeader('Content-Type', 'application/json')
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Cache-Control', 'no-store')
        response.end(manifest)
      })
    },
  }
  return [
    federation({
      name: project,
      filename: 'remoteEntry.js',
      dts: false,
      exposes: { './App': selected.mfeExpose },
      shared,
    }),
    manifestPlugin,
  ]
}
