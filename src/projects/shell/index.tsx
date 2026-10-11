import ThemeIndex from '@src/theme'
import { ProThemeProvider } from '@src/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'
import { renderApp } from '@src/bootstrap/renderApp'

renderApp({
  identifierPrefix: 'wuiShell',
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Micro Frontend Shell">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
