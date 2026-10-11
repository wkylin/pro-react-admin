import ThemeIndex from '@src/theme'
import { ProThemeProvider } from '@src/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'
import { renderApp } from '@src/bootstrap/renderApp'

renderApp({
  identifierPrefix: 'wuiA',
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Project A">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
