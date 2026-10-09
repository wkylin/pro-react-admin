import { federation } from '@module-federation/vite'

type FederationRole = 'host' | 'remote' | ''

type RemoteDefinition = {
  name: string
  devUrl: string
  prodPath: string
  envKey: string
}

const defaultRemotes: RemoteDefinition[] = [
  {
    name: 'projectA',
    devUrl: 'http://localhost:8081/remoteEntry.js',
    prodPath: '/projectA/remoteEntry.js',
    envKey: 'MFE_PROJECTA_URL',
  },
  {
    name: 'projectB',
    devUrl: 'http://localhost:8082/remoteEntry.js',
    prodPath: '/projectB/remoteEntry.js',
    envKey: 'MFE_PROJECTB_URL',
  },
]

const shared = {
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router-dom': { singleton: true },
  antd: { singleton: true },
  '@ant-design/cssinjs': { singleton: true },
}

function parseRemoteOverrides(raw: string | undefined) {
  if (!raw?.trim()) return new Map<string, string>()

  const overrides = new Map<string, string>()
  for (const item of raw.split(',')) {
    const separator = item.indexOf('@')
    if (separator <= 0) continue
    const name = item.slice(0, separator).trim()
    const entry = item.slice(separator + 1).trim()
    if (name && entry) overrides.set(name, entry)
  }
  return overrides
}

function getHostRemotes(isDev: boolean, env: Record<string, string | undefined>) {
  const overrides = parseRemoteOverrides(env.MFE_REMOTES)

  return Object.fromEntries(
    defaultRemotes.map(({ name, devUrl, prodPath, envKey }) => {
      const entry = env[envKey]?.trim() || overrides.get(name) || (isDev ? devUrl : prodPath)
      return [name, { name, entry, type: 'module' as const }]
    })
  )
}

export function createFederationPlugin(options: {
  project: string
  role: FederationRole
  isDev: boolean
  env: Record<string, string | undefined>
}) {
  const { project, role, isDev, env } = options
  if (!role) return undefined

  if (role === 'host') {
    if (project !== 'shell') {
      throw new Error(`MFE_ROLE=host requires PROJECT=shell (received "${project}")`)
    }

    return federation({
      name: 'shell',
      remotes: getHostRemotes(isDev, env),
      shared,
    })
  }

  if (project !== 'projectA' && project !== 'projectB') {
    throw new Error(`MFE_ROLE=remote requires PROJECT=projectA or PROJECT=projectB (received "${project}")`)
  }

  return federation({
    name: project,
    filename: 'remoteEntry.js',
    dts: false,
    exposes: {
      './App': `./src/projects/${project}/mfe/App.tsx`,
    },
    shared,
  })
}
