import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import AiCover from '@assets/images/ai-cover.webp'
import InteractiveBook from '@/pages/mediaAdapters/InteractiveBook'
import styles from './HomeBookStage.module.less'

const bookPages = [
  {
    pageNumber: 1,
    title: '第一章：AI Agent 简介',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 是人工智能领域的一个重要概念，它代表着能够自主执行任务的智能实体。"</p>
        <p>"AI Agent 不仅仅是简单的程序，它们能够感知环境、做出决策并采取行动，就像人类一样。"</p>
        <p>"在现代科技中，AI Agent 正在改变我们与技术交互的方式，从简单的聊天机器人到复杂的自动化系统。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的工作原理</p>
      </div>
    ),
  },
  {
    pageNumber: 2,
    title: '第二章：AI Agent 的工作原理',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 的核心是感知-决策-行动循环。它首先通过传感器或输入接口感知环境。"</p>
        <p>"然后使用算法和模型分析信息，做出最佳决策。"</p>
        <p>"最后，通过执行器或输出接口采取行动。这个循环不断重复，使 Agent 能够适应变化的环境。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的类型</p>
      </div>
    ),
  },
  {
    pageNumber: 3,
    title: '第三章：AI Agent 的类型',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 可以分为多种类型：反应型 Agent、 deliberation Agent、混合型 Agent 等。"</p>
        <ul
          style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <li>反应型 Agent：基于当前感知做出反应</li>
          <li>Deliberation Agent：具有规划和推理能力</li>
          <li>学习型 Agent：能够从经验中学习和改进</li>
          <li>多 Agent 系统：多个 Agent 协同工作</li>
        </ul>
        <p>"每种类型的 Agent 都有其独特的优势和应用场景。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的应用领域</p>
      </div>
    ),
  },
  {
    pageNumber: 4,
    title: '第四章：AI Agent 的应用领域',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 在各个领域都有广泛应用，从日常生活到工业生产。"</p>
        <p>"在医疗领域，AI Agent 可以帮助诊断疾病、制定治疗方案。在金融领域，它们可以进行风险评估和投资建议。"</p>
        <p>"在交通领域，自动驾驶汽车就是一种复杂的 AI Agent。在娱乐领域，游戏中的 NPC 也越来越智能化。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的挑战</p>
      </div>
    ),
  },
  {
    pageNumber: 5,
    title: '第五章：AI Agent 的挑战',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"尽管 AI Agent 技术发展迅速，但仍面临诸多挑战。"</p>
        <p>"安全性是首要问题，如何确保 Agent 的行为符合人类价值观？"</p>
        <p>"可解释性：Agent 的决策过程往往像黑箱，如何让人类理解其推理过程？"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#6b7280' }}>
          AI Agent 的挑战
        </h3>
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>继续阅读下一页</p>
      </div>
    ),
  },
  {
    pageNumber: 6,
    title: '第六章：AI Agent 的未来发展',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 的未来充满无限可能。随着技术的进步，它们将变得更加智能和自主。"</p>
        <p>"多模态 Agent 将能够处理文本、图像、声音等多种信息。"</p>
        <p>"通用人工智能 Agent（AGI）可能会实现，能够在各种任务中表现出色。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af', marginBottom: '8px' }}>翻到下一页，探索更多...</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>下一章：AI Agent 的伦理考虑</p>
      </div>
    ),
  },
  {
    pageNumber: 7,
    title: '第七章：AI Agent 的伦理考虑',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"随着 AI Agent 的普及，伦理问题变得越来越重要。"</p>
        <p>"我们需要确保 Agent 的行为符合道德标准，避免偏见和歧视。"</p>
        <p>"隐私保护、透明度和问责制都是需要重点关注的领域。"</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>AI 时代的伦理思考继续...</p>
      </div>
    ),
  },
  {
    pageNumber: 8,
    title: '结语：拥抱 AI Agent 的时代',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"AI Agent 不仅仅是技术工具，它们正在重塑我们的世界。"</p>
        <p>"通过理解和正确应用 AI Agent，我们可以创造更美好的未来。"</p>
        <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '24px', color: '#6b7280' }}>— AI 专家</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>书籍结束</p>
      </div>
    ),
  },
]

const rotateSensitivity = 0.62
const tiltSensitivity = 0.42

const anglePresets = [
  { label: '正面', yaw: 0, pitch: 3 },
  { label: '3/4', yaw: -38, pitch: 10 },
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

export default function HomeBookStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)
  const anglesRef = useRef({ yaw: -38, pitch: 10 })
  const [activePreset, setActivePreset] = useState<AnglePreset>('3/4')
  const [bookOpen, setBookOpen] = useState(false)

  useEffect(() => {
    const viewport = stageRef.current?.querySelector<HTMLElement>('[data-interactive-book-viewport]')
    if (!viewport) return

    const syncBookState = () => setBookOpen(viewport.dataset.bookOpen === 'true')
    syncBookState()

    const observer = new MutationObserver(syncBookState)
    observer.observe(viewport, { attributes: true, attributeFilter: ['data-book-open'] })
    return () => observer.disconnect()
  }, [])

  const applyAngles = (yaw: number, pitch: number) => {
    const surface = stageRef.current?.querySelector<HTMLElement>('[data-book-preview-surface]')
    anglesRef.current = { yaw, pitch }
    surface?.style.setProperty('--home-book-yaw', `${yaw}deg`)
    surface?.style.setProperty('--home-book-pitch', `${pitch}deg`)
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
      <div className={styles.scene}>
        <InteractiveBook
          coverImage={AiCover}
          backCoverImage={AiCover}
          backCoverContent={
            <>
              <p>从感知、决策到行动，了解 AI Agent 的工作原理，探索智能体如何改变我们的生活。</p>
              <p>保持好奇，下一次探索从这里开始。</p>
            </>
          }
          bookTitle="AI Agent 完全指南"
          coverTitle={
            <>
              AI Agent
              <br />
              完全指南
            </>
          }
          bookAuthor="AI 专家"
          coverStyle="illustrated"
          coverLayout="standard"
          coverSubtitle="从感知到行动"
          coverPublisher="PRO REACT ADMIN"
          coverColor="#17181d"
          coverAccentColor="#d8ba68"
          spineTitle="AI Agent 完全指南"
          spineSubtitle="从感知到行动"
          spineAuthor="AI 专家"
          pages={bookPages}
          mode="double"
          width={350}
          height={500}
          thickness={44}
          tilt={0}
          rotation={0}
          enable3DViewControls={false}
          textured
        />
      </div>
      {!bookOpen && (
        <>
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
        </>
      )}
    </div>
  )
}
