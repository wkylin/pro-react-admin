import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const AlternatingText = ({ alternateText = [] }) => {
  useEffect(() => {
    const element = document.getElementById('alternating-text')

    if (!element) return

    let i = 0
    const listener = () => {
      i = i < alternateText.length - 1 ? i + 1 : 0
      if (element) element.innerHTML = alternateText[i]
    }

    element.innerHTML = alternateText[0] ?? ''
    element.addEventListener('animationiteration', listener, false)

    return () => {
      if (element) element.removeEventListener('animationiteration', listener, false)
    }
  }, [])

  return (
    <span className={styles.alternating} id='alternating-text'>
      {alternateText[0] || 'Text goes here'}
    </span>
  )
}
export default AlternatingText
