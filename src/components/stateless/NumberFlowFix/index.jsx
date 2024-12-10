import NumberFlow from '@number-flow/react'
import useCycle from '@hooks/useCycle'
import useRootClick from '@hooks/useRootClick'

const values = [398.43, -3243.5, 1435237]

const NumberFlowFix = () => {
  const [value, cycleValue] = useCycle(values)

  useRootClick(cycleValue)

  return <NumberFlow value={value} trend={0} />
}
export default NumberFlowFix
