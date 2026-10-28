import type { ApplicationModule } from '@platform/modules'
import { ExampleRequestsProvider } from './model/ExampleRequestsProvider'
import { pagePatternsManifest } from './manifest'
import { pagePatternsRoutes } from './routes'

export const pagePatternsModule: ApplicationModule = {
  ...pagePatternsManifest,
  routes: pagePatternsRoutes,
  Provider: ExampleRequestsProvider,
}
