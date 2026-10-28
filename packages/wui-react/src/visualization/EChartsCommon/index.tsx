import EChart, { type EChartProps } from '../EChart'
export type EChartsCommonProps = EChartProps & { instanceHandle?: EChartProps['onInit'] }
export default function EChartsCommon({ instanceHandle, onInit, style, ...props }: EChartsCommonProps) {
  return <EChart {...props} onInit={onInit ?? instanceHandle} style={{ minHeight: 200, ...style }} />
}
