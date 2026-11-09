import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'
import { notificationsModule } from '@features/notifications/module'
import { pagePatternsModule } from '@features/pagePatterns/module'
import { crmModule } from '@features/crm/module'

export const defaultModules = createModuleRegistry(
  [administrationModule, notificationsModule, pagePatternsModule, crmModule],
  {
    hostVersion: __APP_VERSION__,
  }
)
