import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'
import { notificationsModule } from '@features/notifications/module'
import { pagePatternsModule } from '@features/pagePatterns/module'

export const defaultModules = createModuleRegistry([administrationModule, notificationsModule, pagePatternsModule], {
  hostVersion: __APP_VERSION__,
})
