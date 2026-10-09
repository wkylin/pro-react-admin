import { mfeProtocolVersion, projectRegistry } from './mfe.config.js'

export default class RemoteManifestPlugin {
  constructor({ projectName, version, sharedDependencies = {} }) {
    this.projectName = projectName
    this.version = version
    this.sharedDependencies = sharedDependencies
  }

  apply(compiler) {
    const remote = projectRegistry.remotes.find(({ name }) => name === this.projectName)
    if (!remote) throw new Error(`[mfe] Missing registry contract for Remote "${this.projectName}"`)

    compiler.hooks.thisCompilation.tap('RemoteManifestPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RemoteManifestPlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          const manifest = {
            schemaVersion: 1,
            name: remote.name,
            label: remote.label,
            version: this.version,
            gitSha: process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || null,
            protocolVersion: mfeProtocolVersion,
            exposes: { './App': projectRegistry.projects[remote.name].mfeExpose },
            sharedDependencies: this.sharedDependencies,
          }

          compilation.emitAsset(
            'remote-manifest.json',
            new compiler.webpack.sources.RawSource(`${JSON.stringify(manifest, null, 2)}\n`)
          )
        }
      )
    })
  }
}
