import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import WatermarkProvider from '@/components/WatermarkProvider'
import { renderApp } from '@/bootstrap/renderApp'
import { registerServiceWorker } from '@/pwa/registerServiceWorker'
import { TrackerCore, PageViewPlugin } from '@/lib/tracking'

registerServiceWorker()

// Populate the local tracking dashboard with page views during development only.
if (process.env.NODE_ENV === 'development') {
  const tracker = new TrackerCore({
    appId: 'pro-react-admin',
    appVersion: 'local',
    endpoint: '/api/tracking/collect',
    batchInterval: 1000,
  })
  tracker.use(PageViewPlugin)
}

renderApp({
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Pro React Admin">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
