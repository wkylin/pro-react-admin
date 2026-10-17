import ThemeIndex from '@/theme'
import { ProThemeProvider } from '@/theme/hooks'
import WatermarkProvider from '@wui/WatermarkProvider'

/** Shared application assembly, with project-specific routes selected at build time. */
export default function Application({
  name = 'Pro React Admin',
  watermark = true,
}: {
  name?: string
  watermark?: boolean
}) {
  const app = <ThemeIndex />
  return (
    <ProThemeProvider>{watermark ? <WatermarkProvider content={name}>{app}</WatermarkProvider> : app}</ProThemeProvider>
  )
}
