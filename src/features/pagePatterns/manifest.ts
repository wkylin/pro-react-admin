import type { ApplicationModule } from '@platform/modules'

type ManifestMetadata = Pick<
  ApplicationModule,
  'id' | 'contractVersion' | 'version' | 'compatibility' | 'capabilities' | 'data' | 'uninstall'
>

export const pagePatternsManifest: ManifestMetadata = {
  id: 'page-patterns',
  contractVersion: 2,
  version: '1.0.0',
  compatibility: { application: '>=6.0.0 <7.0.0' },
  capabilities: ['routes', 'provider'],
  data: { minimumSupportedVersion: 0, currentVersion: 0, migrations: [] },
  uninstall: { dataPolicy: 'ephemeral', cleanup: 'provider-unmount' },
}
