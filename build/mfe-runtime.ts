import { areMfeSharedDependenciesCompatible, MFE_MANIFEST_SCHEMA_VERSION } from '../config/mfe-contract.mjs'

type RuntimeOptions = {
  protocolVersion: number
  sharedDependencies: Record<string, string>
  remotes: Record<string, string>
}
type RequestArgs = { id: string; options: { remotes: { name: string; entry?: string }[] } }

export default function remoteContract(options: RuntimeOptions) {
  const verified = new Map<string, Promise<void>>()
  return {
    name: 'remote-contract-validation',
    async beforeRequest(args: RequestArgs) {
      const remote = args.options.remotes.find(({ name }) => args.id === name || args.id.startsWith(`${name}/`))
      if (!remote?.entry) return args
      const entry = new URL(remote.entry, document.baseURI)
      const name = Object.keys(options.remotes).find(
        (name) => new URL(options.remotes[name], document.baseURI).href === entry.href
      )
      if (!name) throw new Error('Remote URL is not registered')
      const manifestUrl = new URL('remote-manifest.json', entry)
      if (!verified.has(entry.href)) {
        const validation = (async () => {
          const signal = AbortSignal.timeout(15000)
          for (let attempt = 0; attempt < 2; attempt++) {
            try {
              const response = await fetch(manifestUrl, { cache: 'no-store', credentials: 'omit', signal })
              if (!response.ok) throw new Error(`Remote manifest is unavailable for ${name}`)
              const manifest = await response.json()
              if (
                manifest.schemaVersion !== MFE_MANIFEST_SCHEMA_VERSION ||
                manifest.name !== name ||
                manifest.protocolVersion !== options.protocolVersion ||
                !areMfeSharedDependenciesCompatible(manifest.sharedDependencies, options.sharedDependencies)
              ) {
                throw new Error(`Remote manifest is incompatible for ${name}`)
              }
              return
            } catch (error) {
              if (attempt === 1 || signal.aborted) throw error
              await new Promise((resolve) => setTimeout(resolve, 250))
            }
          }
        })()
        verified.set(entry.href, validation)
      }
      await verified.get(entry.href)
      return args
    },
  }
}
