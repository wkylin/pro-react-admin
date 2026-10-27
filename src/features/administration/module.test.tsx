import { createModuleRegistry } from '@platform/modules'
import { administrationModule } from './module'

test('the shipped administration routes register before sign-in renders', () => {
  expect(() => createModuleRegistry([administrationModule], { hostVersion: '6.0.0' })).not.toThrow()
})
