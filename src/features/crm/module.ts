import type { ApplicationModule } from '@platform/modules'
import { CrmProvider } from './model/CrmProvider'
import { crmManifest } from './manifest'
import { crmRoutes } from './routes'

export const crmModule: ApplicationModule = {
  ...crmManifest,
  routes: crmRoutes,
  Provider: CrmProvider,
}
