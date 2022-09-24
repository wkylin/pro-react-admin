import React, { memo, useState, useEffect } from 'react'

const TypedText = ({ children, delay = 110 }) => {
  const [revealedLetters, setRevealedLetters] = useState(0)
  const interval = setInterval(() => setRevealedLetters((l) => l + 1), delay)

  useEffect(() => {
    if (revealedLetters === children.length) clearInterval(interval)
  }, [children, interval, revealedLetters])

  useEffect(() => () => clearInterval(interval), [interval])

  return <>{children.substring(0, revealedLetters)}</>
}

export default memo(TypedText)
