import ThemeIndex from '@src/theme'
import WatermarkProvider from '@src/components/WatermarkProvider'
import { ProThemeProvider } from '@src/theme/hooks'
import { renderApp } from './renderApp'

type RenderProjectAppOptions = {
  identifierPrefix: string
  watermarkContent: string
}

export function renderProjectApp({ identifierPrefix, watermarkContent }: RenderProjectAppOptions) {
  renderApp({
    identifierPrefix,
    children: (
      <ProThemeProvider>
        <WatermarkProvider content={watermarkContent}>
          <ThemeIndex />
        </WatermarkProvider>
      </ProThemeProvider>
    ),
  })
}
