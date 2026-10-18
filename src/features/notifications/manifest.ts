import type { ApplicationModule } from '@platform/modules'

type ManifestMetadata = Pick<
  ApplicationModule,
  'id' | 'contractVersion' | 'version' | 'compatibility' | 'capabilities' | 'data' | 'uninstall'
>

export const notificationsManifest: ManifestMetadata = {
  id: 'notifications',
  contractVersion: 2,
  version: '1.0.0',
  compatibility: { application: '>=5.1.0 <6.0.0' },
  capabilities: ['routes', 'provider', 'header-action'],
  data: { minimumSupportedVersion: 0, currentVersion: 0, migrations: [] },
  uninstall: { dataPolicy: 'ephemeral', cleanup: 'provider-unmount' },
}
