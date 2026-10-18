import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'
import { notificationsModule } from '@features/notifications/module'

export const defaultModules = createModuleRegistry([administrationModule, notificationsModule], {
  hostVersion: __APP_VERSION__,
})
