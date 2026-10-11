import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'
import { renderApp } from '@app/bootstrap/renderApp'
import { registerServiceWorker } from '@platform/pwa/registerServiceWorker'

registerServiceWorker()

// Populate the local tracking dashboard with page views during development only.
if (process.env.NODE_ENV === 'development') {
  void import('@platform/tracking').then(({ TrackerCore, PageViewPlugin }) => {
    const tracker = new TrackerCore({
      appId: 'pro-react-admin',
      appVersion: 'local',
      endpoint: '/api/tracking/collect',
      batchInterval: 1000,
    })
    tracker.use(PageViewPlugin)
  })
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
