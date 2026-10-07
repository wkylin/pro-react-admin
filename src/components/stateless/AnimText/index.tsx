import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const AnimText = ({ animText = '' }) => {
  const arrText = animText.split('') || []
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <span>
      {arrText.map((item, index) => (
        <span key={item + index} style={{ '--delay': index + 1 }} className={styles[letterClass]}>
          {item}
        </span>
      ))}
    </span>
  )
}

export default AnimText
