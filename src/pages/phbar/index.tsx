import FixTabPanel from '@shared/ui/FixTabPanel'
import PHBarChart from '@wui/visualization/PHBarChart'
import { useOptionalProThemeContext } from '@/theme/hooks'
const ranges = ['pH范围1', 'pH范围2', 'pH范围3'].map((name) => ({
  name,
  values: Array.from({ length: 15 }, (_, i) => i),
}))
const markers = [
  { value: 7, label: '中性点 (pH=7)', color: '#ff0000' },
  { value: 3.5, label: '弱酸性 (pH=3.5)', color: '#ff9900' },
  { value: 10.5, label: '弱碱性 (pH=10.5)', color: '#0066ff' },
]
export default function PHBar() {
  const theme = useOptionalProThemeContext()
  return (
    <FixTabPanel>
      <PHBarChart
        ranges={ranges}
        markers={markers}
        title="pH值堆叠柱状图（0-14）"
        theme={theme?.resolvedTheme === 'dark' ? 'dark' : null}
      />
    </FixTabPanel>
  )
}
