import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import WatermarkProvider from '@/components/WatermarkProvider'
import { renderApp } from '@/bootstrap/renderApp'

renderApp({
  children: (
    <ProThemeProvider>
      <WatermarkProvider content="Pro React Admin">
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  ),
})
