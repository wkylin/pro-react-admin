import EChartsCommon, { type EChartsCommonProps } from '@wui/visualization/EChartsCommon'
import type { EChartMap } from '@wui/visualization/EChart'
import china from '@assets/map/china.json'
import { useOptionalProThemeContext } from '@/theme/hooks'
const maps: EChartMap[] = [{ name: 'china', data: china as unknown as EChartMap['data'] }]
export default function AppEChartsCommon(props: EChartsCommonProps) {
  const theme = useOptionalProThemeContext()
  return <EChartsCommon maps={maps} theme={theme?.resolvedTheme === 'dark' ? 'dark' : null} {...props} />
}
