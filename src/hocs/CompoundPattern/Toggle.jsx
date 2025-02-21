import React, { useState } from 'react'

const Toggle = ({ children }) => {
  const [on, setOn] = useState(false)
  const toggle = () => {
    setOn(!on)
  }
  const getChildProps = () => {
    return {
      on,
      toggle
    }
  }
  return <>{React.Children.map(children, (child) => React.cloneElement(child, getChildProps()))}</>
}
export default Toggle
