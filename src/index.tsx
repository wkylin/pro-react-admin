import { renderProjectApp } from '@/bootstrap/renderProjectApp'
import { registerServiceWorker } from '@/pwa/registerServiceWorker'

registerServiceWorker()

renderProjectApp({
  identifierPrefix: 'wui',
  watermarkContent: 'Pro React Admin',
})
