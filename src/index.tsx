import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import WatermarkProvider from '@/components/WatermarkProvider'
import { renderApp } from '@/bootstrap/renderApp'
import { registerServiceWorker } from '@/pwa/registerServiceWorker'

registerServiceWorker()

renderApp({
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Pro React Admin">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
