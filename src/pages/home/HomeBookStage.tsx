import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import styles from './HomeBookStage.module.less'

const rotateSensitivity = 0.62
const tiltSensitivity = 0.42

const anglePresets = [
  { label: '正面', yaw: 0, pitch: 3 },
  { label: '3/4', yaw: -28, pitch: 8 },
  { label: '书脊', yaw: 90, pitch: 8 },
  { label: '封底', yaw: 180, pitch: 8 },
  { label: '俯视', yaw: -28, pitch: -44 },
] as const

type AnglePreset = (typeof anglePresets)[number]['label'] | '自定义'

interface DragState {
  pointerId: number
  startX: number
  startY: number
  startPitch: number
  startYaw: number
  lastX: number
  lastY: number
  lastAt: number
  velocityX: number
  velocityY: number
  moved: boolean
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function HomeBookStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)
  const anglesRef = useRef({ yaw: -28, pitch: 8 })
  const [activePreset, setActivePreset] = useState<AnglePreset>('3/4')

  const applyAngles = (yaw: number, pitch: number) => {
    const viewport = stageRef.current?.querySelector<HTMLElement>('[data-interactive-book-viewport]')
    anglesRef.current = { yaw, pitch }
    viewport?.style.setProperty('--home-book-yaw', `${yaw}deg`)
    viewport?.style.setProperty('--home-book-pitch', `${pitch}deg`)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClickRef.current = false
    if (!event.isPrimary || event.button !== 0 || !(event.target instanceof Element)) return
    const viewport = event.target.closest<HTMLElement>('[data-interactive-book-viewport][data-book-open="false"]')
    if (!viewport) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPitch: anglesRef.current.pitch,
      startYaw: anglesRef.current.yaw,
      lastX: event.clientX,
      lastY: event.clientY,
      lastAt: performance.now(),
      velocityX: 0,
      velocityY: 0,
      moved: false,
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const stage = stageRef.current
    if (!drag || !stage || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return

    const now = performance.now()
    const elapsed = Math.max(1, now - drag.lastAt)
    drag.velocityX = ((event.clientX - drag.lastX) / elapsed) * rotateSensitivity
    drag.velocityY = ((event.clientY - drag.lastY) / elapsed) * tiltSensitivity
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    drag.lastAt = now
    drag.moved = true

    stage.dataset.dragging = 'true'
    setActivePreset('自定义')
    if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId)

    applyAngles(drag.startYaw + deltaX * rotateSensitivity, clamp(drag.startPitch + deltaY * tiltSensitivity, -58, 48))
    event.preventDefault()
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>, withInertia: boolean) => {
    const drag = dragRef.current
    const stage = stageRef.current
    if (!drag || !stage || drag.pointerId !== event.pointerId) return

    if (drag.moved) {
      suppressClickRef.current = true
      if (withInertia) {
        applyAngles(
          anglesRef.current.yaw + clamp(drag.velocityX * 24, -10, 10),
          clamp(anglesRef.current.pitch + clamp(drag.velocityY * 20, -7, 7), -58, 48)
        )
      }
      event.preventDefault()
    }

    dragRef.current = null
    delete stage.dataset.dragging
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
  }

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      if (event.detail > 0) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }

    if (
      event.target instanceof Element &&
      event.target.closest('[data-interactive-book-viewport][data-book-open="false"]')
    ) {
      applyAngles(0, 0)
      setActivePreset('正面')
    }
  }

  const selectPreset = (preset: (typeof anglePresets)[number]) => {
    applyAngles(preset.yaw, preset.pitch)
    setActivePreset(preset.label)
  }

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
      onClickCapture={handleClickCapture}
    >
      <div className={styles.scene}>{children}</div>
      <nav className={styles.angleControls} aria-label="主页书本 3D 视角">
        {anglePresets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className={styles.angleButton}
            aria-pressed={activePreset === preset.label}
            onClick={() => selectPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </nav>
      <p className={styles.dragHint} aria-live="polite">
        {activePreset === '自定义' ? '拖动已调整视角' : '拖动封面旋转 · 点击封面阅读'}
      </p>
    </div>
  )
}
