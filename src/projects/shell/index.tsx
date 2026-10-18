import ThemeIndex from '@src/theme'
import { ProThemeProvider } from '@src/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'
import { renderApp } from '@app/bootstrap/renderApp'

renderApp({
  projectId: 'shell',
  identifierPrefix: 'wuiShell',
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Micro Frontend Shell">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
