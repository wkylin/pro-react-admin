import ThemeIndex from '@src/theme'
import { ProThemeProvider } from '@src/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'
import { renderApp } from '@app/bootstrap/renderApp'

renderApp({
  projectId: 'projectB',
  identifierPrefix: 'wuiB',
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Project B">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
