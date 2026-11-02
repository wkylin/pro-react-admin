export type VirtualKeyboardLayout = 'phone' | 'numeric' | 'text' | 'password'

export type VirtualKeyboardPage = 'letters' | 'digits' | 'symbols'

export type VirtualKeyboardAction =
  | { type: 'input'; text: string }
  | { type: 'backspace' }
  | { type: 'paste'; text: string }
  | { type: 'next' }
  | { type: 'close' }

export interface VirtualKeyboardLabels {
  keyboard: string
  paste: string
  collapse: string
  backspace: string
  shift: string
  switchToDigits: string
  switchToSymbols: string
  switchToLetters: string
  space: string
  next: string
  plus: string
  decimal: string
}

export interface VirtualKeyboardProps {
  layout: VirtualKeyboardLayout
  visible: boolean
  onAction: (action: VirtualKeyboardAction) => void
  onPasteError?: (error: unknown) => void
  className?: string
  labels?: Partial<VirtualKeyboardLabels>
}
