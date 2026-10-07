import React, { useState } from 'react'

type ToggleChildProps = {
  on?: boolean
  toggle?: () => void
}

const Toggle = ({ children }: { children: React.ReactNode }) => {
  const [on, setOn] = useState(false)
  const toggle = () => {
    setOn(!on)
  }
  const getChildProps = () => {
    return {
      on,
      toggle,
    }
  }
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement<ToggleChildProps>(child) ? React.cloneElement(child, getChildProps()) : child
      )}
    </>
  )
}
export default Toggle
