import type { ApplicationModule } from '@platform/modules'
import { AdministrationProvider } from './model/AdministrationProvider'
import { administrationResources } from './model/resources'
import { administrationRoutes } from './routes'

export const administrationModule: ApplicationModule = {
  id: 'administration',
  contractVersion: 1,
  routes: administrationRoutes,
  resources: administrationResources,
  Provider: AdministrationProvider,
}
