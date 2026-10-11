import ThemeIndex from '@/theme'
import { ProThemeProvider } from '@/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'

/** Shared application assembly, with project-specific routes selected at build time. */
export default function Application({ name = 'Pro React Admin' }: { name?: string }) {
  return (
    <ProThemeProvider>
      <WatermarkProvider content={name}>
        <ThemeIndex />
      </WatermarkProvider>
    </ProThemeProvider>
  )
}
