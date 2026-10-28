import type { ReactNode } from 'react'
import styles from './index.module.less'
export interface AnimateWaveProps {
  text?: string
  words?: readonly string[]
  children?: ReactNode
}
export default function AnimateWave({ text = '', words = [], children }: AnimateWaveProps) {
  return (
    <>
      <section className={styles.hIBkFg}>
        {children}
        <span className={styles.kqOLaE}>
          {Array.from(text).map((letter, index) => (
            <span key={index} style={{ animationDelay: `${(index + 1) * 0.1}s`, whiteSpace: 'pre' }}>
              {letter}
            </span>
          ))}
        </span>
      </section>
      <div className={styles.droppingTexts}>
        {words.map((word, index) => (
          <div
            key={index}
            style={{ animationDuration: `${Math.max(1, words.length) + 1}s`, animationDelay: `${index}s` }}
          >
            {word}
          </div>
        ))}
      </div>
    </>
  )
}
