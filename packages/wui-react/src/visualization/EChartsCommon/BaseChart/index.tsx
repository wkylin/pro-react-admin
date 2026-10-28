import { forwardRef, useMemo } from 'react'
import EChart, { type EChartHandle, type EChartProps } from '../../EChart'
export type BaseChartProps = Omit<EChartProps, 'option'> & {
  options?: EChartProps['option']
  onClick?: (event: unknown) => void
}
const BaseChart = forwardRef<EChartHandle, BaseChartProps>(({ options, onClick, onEvents, ...props }, ref) => {
  // The convenience alias wins for click; every other caller event is preserved.
  const events = useMemo(() => (onClick ? { ...onEvents, click: onClick } : onEvents), [onClick, onEvents])
  return <EChart renderer="svg" notMerge {...props} ref={ref} option={options} onEvents={events} />
})
BaseChart.displayName = 'BaseChart'
export default BaseChart
