import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

export interface AnimTextProps {
  animText?: string
}
const AnimText = ({ animText = '' }: AnimTextProps) => {
  const arrText = animText.split('') || []
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span>
      {arrText.map((item, index) => (
        <span
          key={item + index}
          style={{ '--delay': index + 1 } as React.CSSProperties}
          className={styles[letterClass]}
        >
          {item}
        </span>
      ))}
    </span>
  )
}

export default AnimText
