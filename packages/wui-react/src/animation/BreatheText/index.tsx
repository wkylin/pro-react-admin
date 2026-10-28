import type { ReactNode } from 'react'
import styles from './index.module.less'
export interface BreatheTextProps {
  text?: string
  secondaryText?: string
  children?: ReactNode
}
export default function BreatheText({ text, secondaryText, children }: BreatheTextProps) {
  return (
    <>
      <section className={styles.breatheItem}>
        <span>{children ?? text}</span>
      </section>
      {secondaryText && (
        <section className={styles.loopRotate}>
          <section className={styles.outside}>
            <section className={styles.inner} />
            <section className={styles.text}>{secondaryText}</section>
          </section>
        </section>
      )}
    </>
  )
}
