import React from 'react'

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = React.useState(false)

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setKeyPressed(true)
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setKeyPressed(false)
  }

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

export default useKeyPress
