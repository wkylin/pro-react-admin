import type { ReactNode } from 'react'
import CopyToClipboard, { type ClipboardOptions } from '../CopyToClipboard'
import styles from '../display.module.less'
export interface StaticStepProps {
  step: number
  title: string
  children: ReactNode
  titleClassName?: string
  stepClassName?: string
}
export interface CodeContainerProps extends ClipboardOptions {
  children: string
  copyLabel?: string
  copiedLabel?: string
}
export const StaticStep = ({ step, title, children, titleClassName = '', stepClassName = '' }: StaticStepProps) => (
  <div className={styles.step}>
    <div className={styles.stepTrack}>
      <p className={`${styles.stepNumber} ${stepClassName}`}>{step}</p>
      <i />
    </div>
    <div className={styles.stepContent}>
      <h6 className={titleClassName}>{title}</h6>
      {children}
    </div>
  </div>
)
export const CodeContainer = ({ children, copyLabel, copiedLabel, ...options }: CodeContainerProps) => (
  <div className={styles.code}>
    <code>{children}</code>
    <CopyToClipboard code={children} label={copyLabel} copiedLabel={copiedLabel} {...options} />
  </div>
)
const StaticStepper = { StaticStep, CodeContainer }
export default StaticStepper
