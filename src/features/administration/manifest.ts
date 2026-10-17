import type { ApplicationModule } from '@platform/modules'

type ManifestMetadata = Pick<
  ApplicationModule,
  'id' | 'contractVersion' | 'version' | 'compatibility' | 'capabilities' | 'data' | 'uninstall'
>

export const administrationManifest: ManifestMetadata = {
  id: 'administration',
  contractVersion: 2,
  version: '1.0.0',
  compatibility: { application: '>=5.1.0 <6.0.0' },
  capabilities: ['routes', 'resources', 'provider'],
  data: { minimumSupportedVersion: 0, currentVersion: 0, migrations: [] },
  uninstall: { dataPolicy: 'retain', cleanup: 'provider-unmount' },
}
