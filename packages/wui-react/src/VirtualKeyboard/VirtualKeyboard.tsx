import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ClipboardPaste } from 'lucide-react'
import clsx from 'clsx'
import type { VirtualKeyboardAction, VirtualKeyboardLabels, VirtualKeyboardPage, VirtualKeyboardProps } from './types'
import { createKeyboardLayout, type KeyboardKeySpec } from './layouts'
import styles from './index.module.less'

const DEFAULT_LABELS: VirtualKeyboardLabels = {
  keyboard: 'On-screen keyboard',
  paste: 'Paste',
  collapse: 'Collapse keyboard',
  backspace: 'Backspace',
  shift: 'Shift',
  switchToDigits: 'Switch to digits',
  switchToSymbols: 'Switch to symbols',
  switchToLetters: 'Switch to letters',
  space: 'Space',
  next: 'Next',
  plus: 'Plus',
  decimal: 'Decimal point',
}

type KeyboardOperation = { kind: 'action'; action: VirtualKeyboardAction } | { kind: 'paste' }

export const VirtualKeyboard = ({
  layout,
  visible,
  onAction,
  onPasteError,
  className,
  labels: labelOverrides,
}: VirtualKeyboardProps) => {
  const [page, setPage] = useState<VirtualKeyboardPage>('letters')
  const [shifted, setShifted] = useState(false)
  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...labelOverrides }), [labelOverrides])
  const keyboardLayout = useMemo(
    () => createKeyboardLayout(layout, page, shifted, labels),
    [layout, page, shifted, labels]
  )

  const operationQueueRef = useRef<KeyboardOperation[]>([])
  const processingRef = useRef(false)
  const generationRef = useRef(0)
  const onActionRef = useRef(onAction)
  const onPasteErrorRef = useRef(onPasteError)
  const visibleRef = useRef(visible)

  useLayoutEffect(() => {
    onActionRef.current = onAction
    onPasteErrorRef.current = onPasteError
    visibleRef.current = visible
  })

  useLayoutEffect(() => {
    generationRef.current += 1
    return () => {
      generationRef.current += 1
      operationQueueRef.current = []
      processingRef.current = false
    }
  }, [layout, visible])

  useEffect(() => {
    setPage('letters')
    setShifted(false)
  }, [layout])

  const isCurrent = (generation: number) => generation === generationRef.current && visibleRef.current

  const readClipboard = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
      throw new Error('Clipboard access is unavailable in this browser.')
    }
    return navigator.clipboard.readText()
  }

  function processQueue() {
    if (processingRef.current || !visibleRef.current) return
    const operation = operationQueueRef.current.shift()
    if (!operation) return
    const generation = generationRef.current

    if (operation.kind === 'action') {
      if (isCurrent(generation)) onActionRef.current(operation.action)
      processQueue()
      return
    }

    processingRef.current = true
    void readClipboard()
      .then(
        (text) => {
          if (isCurrent(generation) && text) onActionRef.current({ type: 'paste', text })
        },
        (error: unknown) => {
          if (isCurrent(generation)) onPasteErrorRef.current?.(error)
        }
      )
      .finally(() => {
        if (!isCurrent(generation)) return
        processingRef.current = false
        processQueue()
      })
  }

  const emit = (action: VirtualKeyboardAction) => {
    if (action.type === 'close') {
      const queued = operationQueueRef.current.splice(0)
      generationRef.current += 1
      processingRef.current = false
      queued.forEach((operation) => {
        if (operation.kind === 'action') onActionRef.current(operation.action)
      })
      onActionRef.current(action)
      return
    }
    if (!visibleRef.current) return
    operationQueueRef.current.push({ kind: 'action', action })
    processQueue()
  }

  const requestPaste = () => {
    if (!visibleRef.current) return
    operationQueueRef.current.push({ kind: 'paste' })
    processQueue()
  }

  const pressKey = (key: KeyboardKeySpec) => {
    if (key.action === 'input') {
      const value = key.value ?? ''
      emit({ type: 'input', text: value.length === 1 && shifted ? value.toLocaleUpperCase() : value })
      if (shifted && page === 'letters') setShifted(false)
      return
    }
    if (key.action === 'backspace') {
      emit({ type: 'backspace' })
      return
    }
    if (key.action === 'shift') {
      setShifted((value) => !value)
      return
    }
    if (key.action === 'page') {
      setPage(key.value as VirtualKeyboardPage)
      return
    }
    if (key.action === 'paste') {
      requestPaste()
      return
    }
    if (key.action === 'next') emit({ type: 'next' })
    if (key.action === 'close') emit({ type: 'close' })
  }

  if (!visible) return null

  const renderKey = (key: KeyboardKeySpec) => (
    <button
      key={key.id}
      type="button"
      className={clsx(styles.key, key.primary && styles.primaryKey, key.action !== 'input' && styles.actionKey)}
      style={
        keyboardLayout.display === 'grid'
          ? {
              gridColumn: key.column ? key.column + ' / span ' + (key.columnSpan ?? 1) : undefined,
              gridRow: key.row ? key.row + ' / span ' + (key.rowSpan ?? 1) : undefined,
            }
          : { flexGrow: key.grow ?? 1 }
      }
      aria-label={key.ariaLabel ?? key.label}
      aria-pressed={key.action === 'shift' ? shifted : undefined}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => pressKey(key)}
    >
      {key.id === 'paste' ? <ClipboardPaste size={17} aria-hidden="true" /> : key.label}
    </button>
  )

  return (
    <section className={clsx(styles.keyboard, className)} aria-label={labels.keyboard}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.pasteButton}
          onMouseDown={(event) => event.preventDefault()}
          onClick={requestPaste}
        >
          <ClipboardPaste size={16} aria-hidden="true" />
          <span>{labels.paste}</span>
        </button>
        <button
          type="button"
          className={styles.collapseButton}
          aria-label={labels.collapse}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => emit({ type: 'close' })}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </button>
      </div>

      {keyboardLayout.display === 'grid' ? (
        <div
          className={styles.numericGrid}
          style={{
            gridTemplateColumns: 'repeat(' + keyboardLayout.columns + ', minmax(0, 1fr))',
            gridTemplateRows: 'repeat(' + keyboardLayout.rows + ', minmax(44px, 1fr))',
          }}
        >
          {keyboardLayout.keys.map(renderKey)}
        </div>
      ) : (
        <div className={styles.rows}>
          {keyboardLayout.rows.map((row, index) => (
            <div key={'row-' + index} className={clsx(styles.row, row.inset && styles.insetRow)}>
              {row.keys.map(renderKey)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default VirtualKeyboard
