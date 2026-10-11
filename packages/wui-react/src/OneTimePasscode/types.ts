export interface OneTimePasscodeProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  inputClassName?: string
  id?: string
  name?: string
  /** Allows custom single-character validation, for example digits only. */
  validateChar?: (character: string) => boolean
  variant?: 'modern' | 'compact' | 'classic'
}
