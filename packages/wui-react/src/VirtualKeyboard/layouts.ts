import type { VirtualKeyboardLabels, VirtualKeyboardLayout, VirtualKeyboardPage } from './types'

export type KeyboardKeyAction = 'input' | 'backspace' | 'shift' | 'page' | 'paste' | 'next' | 'close'

export interface KeyboardKeySpec {
  id: string
  action: KeyboardKeyAction
  label: string
  value?: string
  ariaLabel?: string
  grow?: number
  row?: number
  column?: number
  rowSpan?: number
  columnSpan?: number
  primary?: boolean
}

export interface KeyboardRowSpec {
  keys: KeyboardKeySpec[]
  inset?: boolean
}

export type KeyboardLayoutSpec =
  | { display: 'rows'; rows: KeyboardRowSpec[] }
  | { display: 'grid'; rows: number; columns: number; keys: KeyboardKeySpec[] }

const inputKey = (value: string, grow = 1): KeyboardKeySpec => ({
  id: 'input-' + value,
  action: 'input',
  label: value,
  value,
  grow,
})

const inputKeys = (values: string, grow = 1) => Array.from(values).map((value) => inputKey(value, grow))

const pageKey = (page: VirtualKeyboardPage, label: string, ariaLabel: string, grow = 1): KeyboardKeySpec => ({
  id: 'page-' + page,
  action: 'page',
  label,
  value: page,
  ariaLabel,
  grow,
})

const backspaceKey = (labels: VirtualKeyboardLabels, options: Partial<KeyboardKeySpec> = {}): KeyboardKeySpec => ({
  id: 'backspace',
  action: 'backspace',
  label: '⌫',
  ariaLabel: labels.backspace,
  ...options,
})

const pasteKey = (labels: VirtualKeyboardLabels, options: Partial<KeyboardKeySpec> = {}): KeyboardKeySpec => ({
  id: 'paste',
  action: 'paste',
  label: '⎘',
  ariaLabel: labels.paste,
  ...options,
})

const nextKey = (labels: VirtualKeyboardLabels, options: Partial<KeyboardKeySpec> = {}): KeyboardKeySpec => ({
  id: 'next',
  action: 'next',
  label: labels.next,
  ariaLabel: labels.next,
  primary: true,
  ...options,
})

export function createKeyboardLayout(
  layout: VirtualKeyboardLayout,
  page: VirtualKeyboardPage,
  shifted: boolean,
  labels: VirtualKeyboardLabels
): KeyboardLayoutSpec {
  if (layout === 'phone' || layout === 'numeric') {
    const bottomLeft = layout === 'phone' ? '+' : '.'
    const bottomLeftLabel = layout === 'phone' ? labels.plus : labels.decimal
    return {
      display: 'grid',
      rows: 4,
      columns: 4,
      keys: [
        ...['1', '2', '3'].map((value, index) => ({ ...inputKey(value), row: 1, column: index + 1 })),
        { ...backspaceKey(labels), row: 1, column: 4 },
        ...['4', '5', '6'].map((value, index) => ({ ...inputKey(value), row: 2, column: index + 1 })),
        { ...pasteKey(labels), row: 2, column: 4 },
        ...['7', '8', '9'].map((value, index) => ({ ...inputKey(value), row: 3, column: index + 1 })),
        { ...nextKey(labels), row: 3, column: 4, rowSpan: 2 },
        {
          ...inputKey(bottomLeft),
          id: 'input-bottom-left',
          label: bottomLeft,
          ariaLabel: bottomLeftLabel,
          row: 4,
          column: 1,
        },
        { ...inputKey('0'), row: 4, column: 2, columnSpan: 2 },
      ],
    }
  }

  const alphabet = shifted ? 'QWERTYUIOP' : 'qwertyuiop'
  const home = shifted ? 'ASDFGHJKL' : 'asdfghjkl'
  const bottom = shifted ? 'ZXCVBNM' : 'zxcvbnm'

  if (page === 'letters') {
    return {
      display: 'rows',
      rows: [
        { keys: inputKeys(alphabet) },
        { keys: inputKeys(home), inset: true },
        {
          keys: [
            { id: 'shift', action: 'shift', label: '⇧', ariaLabel: labels.shift, grow: 1.5 },
            ...inputKeys(bottom),
            backspaceKey(labels, { grow: 1.5 }),
          ],
        },
        {
          keys: [
            pageKey('digits', '123', labels.switchToDigits, 1.35),
            pageKey('symbols', '#+=', labels.switchToSymbols, 1.35),
            { id: 'space', action: 'input', value: ' ', label: 'Space', ariaLabel: labels.space, grow: 4.4 },
            nextKey(labels, { grow: 1.8 }),
          ],
        },
      ],
    }
  }

  if (page === 'digits') {
    return {
      display: 'rows',
      rows: [
        { keys: inputKeys('1234567890') },
        { keys: inputKeys('-/:;()&@#') },
        {
          keys: [
            pageKey('symbols', '#+=', labels.switchToSymbols, 1.4),
            ...inputKeys(".,?!'"),
            backspaceKey(labels, { grow: 1.4 }),
          ],
        },
        {
          keys: [
            pageKey('letters', 'ABC', labels.switchToLetters, 1.5),
            { id: 'space', action: 'input', value: ' ', label: 'Space', ariaLabel: labels.space, grow: 4 },
            nextKey(labels, { grow: 2 }),
          ],
        },
      ],
    }
  }

  return {
    display: 'rows',
    rows: [
      { keys: inputKeys('[]{}%^*+=~') },
      { keys: inputKeys('<>\u00a3\u20ac$\u00a5\u2022') },
      {
        keys: [
          pageKey('digits', '123', labels.switchToDigits, 1.4),
          ...inputKeys(".,?!'"),
          backspaceKey(labels, { grow: 1.4 }),
        ],
      },
      {
        keys: [
          pageKey('letters', 'ABC', labels.switchToLetters, 1.5),
          { id: 'space', action: 'input', value: ' ', label: 'Space', ariaLabel: labels.space, grow: 4 },
          nextKey(labels, { grow: 2 }),
        ],
      },
    ],
  }
}
