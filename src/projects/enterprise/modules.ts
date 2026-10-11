import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from '@features/administration/module'

export const enterpriseModules = createModuleRegistry([administrationModule])
