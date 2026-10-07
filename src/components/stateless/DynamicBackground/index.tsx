import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import icons from './icons'
import styles from './index.module.less'

type IconSize = 'sm' | 'md' | 'lg'

interface Position {
  xPos: number
  yPos: number
}

interface IconReference {
  refItem: HTMLSpanElement | null
  initialPositions: Position
  size: IconSize
}

const isIconSize = (size: string): size is IconSize => size === 'sm' || size === 'md' || size === 'lg'

const setThresholds = (size: IconSize, x: number, y: number) => {
  if (size === 'sm') {
    return {
      hoverX: x * 0.03,
      hoverY: y * 0.03,
    }
  }

  if (size === 'md') {
    return {
      hoverX: x * 0.06,
      hoverY: y * 0.06,
    }
  }

  return {
    hoverX: x * 0.1,
    hoverY: y * 0.1,
  }
}

const DynamicBackground = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const [positions, setPositions] = useState<Position[]>([])
  const heroRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<IconReference[]>([])
  const iconCount = icons?.length

  const onHover = (event: Event) => {
    if (!(event instanceof MouseEvent)) return

    const { clientX, clientY } = event
    iconsRef.current.forEach((item) => {
      const { xPos, yPos } = item.initialPositions
      const size = item.size
      const { hoverX, hoverY } = setThresholds(size, clientX, clientY)

      if (item.refItem) {
        item.refItem.style.transform = `translate(${xPos + hoverX}px, ${yPos + hoverY}px)`
      }
    })
  }
  const onHoverDebounced = useDebouncedCallback(onHover, 10)

  useEffect(() => {
    const id = setTimeout(() => setHasMounted(true), 0)
    const refVal = heroRef?.current

    if (!refVal) return () => clearTimeout(id)

    // 计算初始位置（只在挂载时进行一次），避免在 render 中使用 Math.random
    const width = refVal.offsetWidth || refVal.getBoundingClientRect().width || 0
    const height = refVal.offsetHeight || refVal.getBoundingClientRect().height || 0

    const rows = Math.ceil(Math.sqrt(iconCount))
    const cols = Math.ceil(iconCount / rows)
    const cellWidth = width / cols
    const cellHeight = height / rows

    const computed: Position[] = []
    for (let i = 0; i < iconCount; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      const xOffset = Math.random() * Math.max(0, cellWidth - 75)
      const yOffset = Math.random() * Math.max(0, cellHeight - 75)
      const baseX = col * cellWidth
      const baseY = row * cellHeight
      const xPos = baseX + xOffset
      const yPos = baseY + yOffset
      computed.push({ xPos, yPos })
    }

    // 延迟设置 state（使用 requestAnimationFrame）以避免在 effect 中同步 setState
    let rafId = 0
    if (typeof requestAnimationFrame !== 'undefined') {
      rafId = requestAnimationFrame(() => setPositions(computed))
    } else {
      setTimeout(() => setPositions(computed), 0)
    }

    refVal.addEventListener('mousemove', onHoverDebounced)
    refVal.addEventListener('resize', onHoverDebounced)

    return () => {
      clearTimeout(id)
      if (rafId) cancelAnimationFrame(rafId)
      if (!refVal) return
      refVal.removeEventListener('mousemove', onHoverDebounced)
      refVal.removeEventListener('resize', onHoverDebounced)
    }
  }, [iconCount, onHoverDebounced])

  return (
    <div className={styles.hero} ref={heroRef}>
      {hasMounted && positions.length > 0 && (
        <div className={styles.iconLayer}>
          {icons.map(({ size, type, icon }, i) => {
            const { xPos = 0, yPos = 0 } = positions[i] || {}

            return (
              <span
                key={i}
                ref={(refItem) => {
                  if (!isIconSize(size)) return

                  iconsRef.current[i] = {
                    refItem,
                    initialPositions: {
                      xPos,
                      yPos,
                    },
                    size,
                  }
                }}
                className={`${styles.icon} ${styles[type]} ${styles[size]}`}
                style={{
                  transform: `translateX(${xPos}px) translateY(${yPos}px)`,
                }}
              >
                {icon && icon}
              </span>
            )
          })}
        </div>
      )}
      <div className={styles.heroText}>
        <h1>
          Grow your <br /> <span>Frontend Skills</span>
        </h1>
        <h3>
          with <span>React</span>, <span>Angular</span>, <span>Vue</span>, <span>Typescript</span>, <span>Redux</span>,{' '}
          <span>Node</span>, <span>GraphQL</span>,<span>CSS</span>, <span>HTML</span>, <span>Webpack</span>,{' '}
          <span>Rollup</span>, <span>ESLint</span>, <span>Prettier</span>, <span>Stylelint</span>,<span>PostCSS</span>,{' '}
          <span>Styled Components</span>, <span>Emotion</span>, <span>Material UI</span>, <span>Ant Design</span>,{' '}
          <span>Bootstrap</span>, <span>Foundation</span>,<span>React Native</span>, <span>Flutter</span>,{' '}
          <span>Python</span>, <span>Go</span>,<span>JavaScript</span>, and <span>NPM</span>
        </h3>
      </div>
    </div>
  )
}

export default DynamicBackground
