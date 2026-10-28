import React, { useRef } from 'react'
import { motion, useTransform, useScroll } from 'motion/react'
import clsx from 'clsx'

/**
 * ContactSection - 联系我们区域组件
 * 包含文字渐显动画效果
 *
 * @param {Object} props
 * @param {React.RefObject} props.scrollContainerRef - 滚动容器引用
 * @param {string} props.className - 额外的CSS类名
 * @param {string} props.text - 要显示的文字内容
 */
export interface ContactSectionProps {
  text?: string
  scrollContainerRef?: React.RefObject<HTMLElement | null>
  className?: string
}
const ContactSection = ({ scrollContainerRef, className = '', text = '' }: ContactSectionProps) => {
  const wordTargetRef = useRef(null)

  const words = text.split('')
  const { scrollYProgress: wordScrYPro } = useScroll({
    target: wordTargetRef,
    container: scrollContainerRef,
  })

  return (
    <div ref={wordTargetRef} className={clsx(className)} style={{ position: 'relative', zIndex: 0, height: '150vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          marginInline: 'auto',
          display: 'flex',
          alignItems: 'center',
          padding: '2rem 1rem',
        }}
      >
        <p
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: 12,
            fontSize: 'clamp(1.25rem, 3vw, 3rem)',
            fontWeight: 'bold',
          }}
        >
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clipPath: 'inset(50%)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            {text}
          </span>
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={wordScrYPro} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode
  progress: import('motion/react').MotionValue<number>
  range: [number, number]
}) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span aria-hidden="true" style={{ position: 'relative', marginInline: '.125rem' }}>
      <span style={{ position: 'absolute', opacity: 0.3 }}>{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  )
}

export default ContactSection
