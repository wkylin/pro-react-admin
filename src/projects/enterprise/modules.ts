import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'
import { pagePatternsModule } from '@features/pagePatterns/module'

export const enterpriseModules = createModuleRegistry([administrationModule, pagePatternsModule], {
  hostVersion: __APP_VERSION__,
})
