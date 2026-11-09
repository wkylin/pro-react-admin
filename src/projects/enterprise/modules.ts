import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'
import { pagePatternsModule } from '@features/pagePatterns/module'
import { crmModule } from '@features/crm/module'

export const enterpriseModules = createModuleRegistry([administrationModule, pagePatternsModule, crmModule], {
  hostVersion: __APP_VERSION__,
})
