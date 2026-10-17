import type { ApplicationModule } from '@platform/modules'
import { AdministrationProvider } from './model/AdministrationProvider'
import { administrationResources } from './model/resources'
import { administrationRoutes } from './routes'
import { administrationManifest } from './manifest'

export const administrationModule: ApplicationModule = {
  ...administrationManifest,
  routes: administrationRoutes,
  resources: administrationResources,
  Provider: AdministrationProvider,
}
