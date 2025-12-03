import React from 'react'
import clsx from 'clsx'
import styles from './index.module.less'

const CubeSpinner = ({ items = ['Face Front', 'Face Top', 'Face Bottom'] }) => {
  const defaultFaces = ['faceFront', 'faceTop', 'faceBottom']
  const normalizedItems = items.map((item, index) => {
    if (typeof item === 'string') {
      return { text: item, face: defaultFaces[index] }
    }
    return { ...item, face: item.face || defaultFaces[index] }
  })

  return (
    <div className={styles.stages}>
      <div className={styles.cubeSpinner}>
        {normalizedItems.map((item, index) => {
          const faceClass = styles[item.face] || styles[defaultFaces[index]]
          return (
            <span key={index} className={clsx(faceClass, item.className)}>
              {item.text}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default CubeSpinner
