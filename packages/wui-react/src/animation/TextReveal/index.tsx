import batchStyles from '../batch-c.module.less'
void batchStyles
import { motion, useScroll, useTransform } from 'motion/react'
import { forwardRef, useRef } from 'react'

import clsx from 'clsx'

export type TextRevealProps = {
  text: string
  className?: string
}

export type WordProps = {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}

const TextReveal = forwardRef<HTMLElement, TextRevealProps>(({ text, className }, ref) => {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: ref && typeof ref !== 'function' ? ref : undefined,
    target: targetRef,
  })

  const words = text.split(' ')

  return (
    <div ref={targetRef} className={clsx('wui-c-d89972fe wui-c-942abb7c wui-c-49356274', className)}>
      <div
        className={
          'wui-c-3e0fd166 wui-c-2167406b wui-c-0e12dc7d wui-c-60fbb771 wui-c-6aa23245 wui-c-cf3893e3 wui-c-3960ffc2 wui-c-7f19cdf4 wui-c-be4c7fb5 wui-c-697ec897'
        }
      >
        <p
          aria-label={text}
          className={
            'wui-c-60fbb771 wui-c-1eb5c6df wui-c-c07e54fd wui-c-3febee09 wui-c-69450ef1 wui-c-bb71c00c wui-c-0e69a2e2 wui-c-c58992ca wui-c-00a16e4f wui-c-0c5d3369 wui-c-4adefb10 wui-c-6d6c81fa'
          }
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
})

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span aria-hidden="true" className="xl:lg-3 wui-c-d89972fe wui-c-0da48290 wui-c-49319c4e">
      <span className="wui-c-da4dbfbc wui-c-78e6d0eb">{children}</span>
      <motion.span style={{ opacity: opacity }} className={'wui-c-d2a412c3 wui-c-889e4e87'}>
        {children}
      </motion.span>
    </span>
  )
}

export default TextReveal
