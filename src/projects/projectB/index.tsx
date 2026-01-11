import ThemeIndex from '@src/theme'
import { ProThemeProvider } from '@src/theme/hooks'
import WatermarkProvider from '@src/components/WatermarkProvider'
import { renderApp } from '@src/bootstrap/renderApp'

renderApp({
  identifierPrefix: 'wuiB',
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Project B">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
