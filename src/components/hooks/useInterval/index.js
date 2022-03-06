import { useEffect, useRef } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval

// const [isRunning, setIsRunning] = useState(true)

// useInterval(
//   () => {
//     // Your custom logic here
//   },
//   isRunning ? delay : null
// )

// function handleIsRunningChange(e) {
//   setIsRunning(true)
// }
