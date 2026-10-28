import { useId, useState, type KeyboardEvent } from 'react'
export function useTabs<T extends string | number>(
  keys: T[],
  controlled: T | undefined,
  initial: T | undefined,
  onChange?: (key: T) => void
) {
  const id = useId()
  const [internal, setInternal] = useState(initial ?? keys[0])
  const selected = controlled !== undefined ? controlled : keys.includes(internal) ? internal : keys[0]
  const select = (key: T) => {
    if (controlled === undefined) setInternal(key)
    onChange?.(key)
  }
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % keys.length
        break
      case 'ArrowLeft':
        next = (index - 1 + keys.length) % keys.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = keys.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    select(keys[next])
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }
  return { id, selected, select, keyDown }
}
