import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import VirtualKeyboard, { type VirtualKeyboardAction, type VirtualKeyboardLayout } from './index'
import styles from './index.module.less'

const layouts: VirtualKeyboardLayout[] = ['phone', 'numeric', 'text', 'password']
const layoutLabels: Record<VirtualKeyboardLayout, string> = {
  phone: 'Phone',
  numeric: 'Numeric',
  text: 'Text',
  password: 'Password',
}
const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const
type DemoTheme = (typeof themes)[number]['value']

const KeyboardDemo = ({
  initialLayout,
  initialVisible,
}: {
  initialLayout: VirtualKeyboardLayout
  initialVisible: boolean
}) => {
  const [layout, setLayout] = useState(initialLayout)
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(initialVisible)
  const [theme, setTheme] = useState<DemoTheme>('light')
  const [notice, setNotice] = useState('')

  useEffect(() => setLayout(initialLayout), [initialLayout])
  useEffect(() => setVisible(initialVisible), [initialVisible])

  const handleAction = (action: VirtualKeyboardAction) => {
    if (action.type === 'input') {
      setValue((current) => current + action.text)
      setNotice('')
    } else if (action.type === 'paste') {
      setValue((current) => current + action.text)
      setNotice('Pasted ' + action.text.length + ' characters')
    } else if (action.type === 'backspace') {
      setValue((current) => Array.from(current).slice(0, -1).join(''))
      setNotice('')
    } else if (action.type === 'next') {
      setNotice('Next pressed')
    } else {
      setVisible(false)
      setNotice('Keyboard closed')
    }
  }

  return (
    <div className={styles.demo} data-theme={theme}>
      <div className={styles.demoControls}>
        <div className={styles.demoGroup} role="group" aria-label="Theme">
          {themes.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={theme === option.value}
              className={styles.demoOption}
              onClick={() => setTheme(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.demoGroup} role="group" aria-label="Keyboard layout">
          {layouts.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={layout === option}
              className={styles.demoOption}
              onClick={() => setLayout(option)}
            >
              {layoutLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <label className={styles.demoLabel} htmlFor="virtual-keyboard-preview">
        Focused field
      </label>
      <input
        id="virtual-keyboard-preview"
        aria-label="Keyboard input preview"
        autoComplete="off"
        inputMode="none"
        type={layout === 'password' ? 'password' : 'text'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setVisible(true)}
        placeholder={layout === 'phone' ? '+254 700 000 000' : 'Type with the custom keyboard'}
        className={styles.demoInput}
      />

      {visible ? (
        <VirtualKeyboard
          layout={layout}
          visible={visible}
          onAction={handleAction}
          onPasteError={(error) => setNotice(error instanceof Error ? error.message : 'Clipboard access failed')}
        />
      ) : (
        <button type="button" className={styles.demoOpenButton} onClick={() => setVisible(true)}>
          Open keyboard
        </button>
      )}

      <div aria-live="polite" className={styles.demoNotice}>
        {notice}
      </div>
    </div>
  )
}

const meta = {
  title: 'WUI/Components/VirtualKeyboard',
  component: VirtualKeyboard,
  parameters: { layout: 'centered' },
  args: {
    layout: 'phone',
    visible: true,
    onAction: (_action: VirtualKeyboardAction) => undefined,
  },
  argTypes: {
    layout: { control: 'select', options: layouts },
    visible: { control: 'boolean' },
    onAction: { control: false },
    onPasteError: { control: false },
  },
} satisfies Meta<typeof VirtualKeyboard>

export default meta
type Story = StoryObj<typeof meta>

const renderDemo =
  (layout: VirtualKeyboardLayout): Story['render'] =>
  (args) => <KeyboardDemo initialLayout={args.layout ?? layout} initialVisible={args.visible ?? true} />

export const Phone: Story = {
  args: { layout: 'phone' },
  render: renderDemo('phone'),
}

export const Numeric: Story = {
  args: { layout: 'numeric' },
  render: renderDemo('numeric'),
}

export const Text: Story = {
  args: { layout: 'text' },
  render: renderDemo('text'),
}

export const Password: Story = {
  args: { layout: 'password' },
  render: renderDemo('password'),
}
