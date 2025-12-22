import React from 'react'
import styles from './index.module.less'

const AnimateWave = ({ children }) => {
  return (
    <>
      <section className={styles.hIBkFg}>
        <h2>
          Design and code{' '}
          <span className={styles.kqOLaE}>
            <span>R</span>
            <span>e</span>
            <span>a</span>
            <span>c</span>
            <span>t</span>
          </span>{' '}
          apps
        </h2>
      </section>
      <section style={{ fontSize: 30, position: 'relative' }}>
        Dropping Texts:
        <div className={styles.droppingTexts}>
          <div>React</div>
          <div>Vue</div>
          <div>Angular</div>
          <div>Remix!</div>
        </div>
      </section>
    </>
  )
}

export default AnimateWave
// https://svgwave.in/
// https://codepen.io/natgeyzentech/pen/PoRYvRM
// https://codepen.io/tedmcdo/pen/PqxKXg
