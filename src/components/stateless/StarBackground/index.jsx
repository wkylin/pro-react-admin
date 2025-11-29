import React, { useState } from 'react'
import styles from './index.module.less'
// 生成随机阴影值的函数
const generateBoxShadow = (n) => {
  let shadowValues = []
  for (let i = 0; i < n; i++) {
    const randomX = Math.floor(Math.random() * 2000)
    const randomY = Math.floor(Math.random() * 2000)
    shadowValues.push(`${randomX}px ${randomY}px #333`)
  }
  return shadowValues.join(', ')
}
const StarBack = () => {
  const [smallShadows] = useState(generateBoxShadow(1400))
  const [mediumShadows] = useState(generateBoxShadow(400))
  const [bigShadows] = useState(generateBoxShadow(200))
  return (
    <section className="absolute top-0 left-0">
      <section className={styles.stars} style={{ '--box-shadow': smallShadows }}></section>
      <section className={styles.medium} style={{ '--box-shadow': mediumShadows }}></section>
      <section className={styles.big} style={{ '--box-shadow': bigShadows }}></section>
    </section>
  )
}

export default StarBack
