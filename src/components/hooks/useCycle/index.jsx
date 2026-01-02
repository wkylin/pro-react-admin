import { useState } from 'react'

const useCycle = (options = [], defaultValue = '') => {
  const [index, setIndex] = useState(defaultValue ? undefined : 0)
  const next = () => setIndex((i) => ((i ?? -1) + 1) % options.length)

  return [index == null && defaultValue ? defaultValue : options[index ?? 0], next]
}

// const values[] = [398.43, -3243.5, 1435237]
// const [value, cycleValue] = useCycle(values);

export default useCycle
