import { useState, type CSSProperties, type HTMLInputTypeAttribute, type ReactNode } from 'react'
import AnimatedIcon from '../../AnimatedIcon'
import { CheckCircle, Circle } from 'lucide-react'
import styles from './index.module.less'
export interface StepField {
  name: string
  type: HTMLInputTypeAttribute
  placeholder: string
  label?: string
}
export interface Step {
  label: string
  fields?: StepField[]
  content?: ReactNode
}
export interface DottedStepperProps {
  steps?: Step[]
  currentStep?: number
  defaultCurrentStep?: number
  onStepChange?: (index: number) => void
  className?: string
  activeColor?: string
  inactiveBgColor?: string
  circleSize?: number
  gradientColors?: string[]
  showPercent?: boolean
  theme?: 'light' | 'dark'
  previousLabel?: string
  nextLabel?: string
  progressLabel?: string
  renderStep?: (step: Step, index: number) => ReactNode
}
export default function DottedStepper({
  steps = [],
  currentStep,
  defaultCurrentStep = 0,
  onStepChange,
  className = '',
  activeColor = '#1677ff',
  inactiveBgColor,
  circleSize = 44,
  gradientColors = ['#ff7a18', '#af002d', '#319197'],
  showPercent = true,
  theme = 'light',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  progressLabel = 'Progress',
  renderStep,
}: DottedStepperProps) {
  const [internal, setInternal] = useState(defaultCurrentStep)
  const selected = Math.max(0, Math.min(steps.length - 1, Math.floor(currentStep ?? internal) || 0))
  const change = (next: number) => {
    if (currentStep === undefined) setInternal(next)
    onStepChange?.(next)
  }
  if (!steps.length) return null
  const percent = Math.round((selected / Math.max(1, steps.length - 1)) * 100)
  const css = {
    '--active': activeColor,
    '--inactive': inactiveBgColor ?? (theme === 'dark' ? '#313744' : '#edf0f5'),
    '--circle': `${circleSize}px`,
    '--gradient': `linear-gradient(90deg, ${gradientColors.join(',')})`,
  } as CSSProperties
  return (
    <section className={`${styles.stepper} ${theme === 'dark' ? styles.dark : ''} ${className}`} style={css}>
      <ol className={styles.steps} aria-label={progressLabel}>
        {steps.map((step, index) => (
          <li key={index} aria-current={index === selected ? 'step' : undefined} data-complete={index < selected}>
            <span className={styles.circle} data-active={index <= selected}>
              <AnimatedIcon variant="spin" mode="hover">
                {index < selected ? <CheckCircle size={18} /> : <Circle size={18} />}
              </AnimatedIcon>
            </span>
            <span>{step.label}</span>
          </li>
        ))}
      </ol>
      {showPercent && (
        <progress aria-label={progressLabel} max={100} value={percent}>
          {percent}%
        </progress>
      )}
      <div className={styles.content}>
        {steps.map((step, index) => (
          <div key={index} hidden={index !== selected}>
            {renderStep ? (
              renderStep(step, index)
            ) : (
              <>
                <h3>{step.label}</h3>
                {step.content}
                {step.fields?.map((field) => (
                  <label className={styles.field} key={field.name}>
                    <span>{field.label || field.placeholder || field.name}</span>
                    <input name={field.name} type={field.type} placeholder={field.placeholder} />
                  </label>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <nav className={styles.navigation} aria-label={progressLabel}>
        <button type="button" disabled={selected === 0} onClick={() => change(selected - 1)}>
          {previousLabel}
        </button>
        <button type="button" disabled={selected === steps.length - 1} onClick={() => change(selected + 1)}>
          {nextLabel}
        </button>
      </nav>
    </section>
  )
}
