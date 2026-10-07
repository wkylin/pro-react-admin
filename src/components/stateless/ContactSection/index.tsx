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
const ContactSection = ({
  scrollContainerRef,
  className = '',
  text = '新的一年，愿你的生活充满阳光，每一天都被幸福环绕。工作上顺顺利利，所有的努力都能得到丰厚的回报，每一个目标都能成功实现。',
}) => {
  const wordTargetRef = useRef(null)

  const words = text.split('')
  const { scrollYProgress: wordScrYPro } = useScroll({
    target: wordTargetRef,
    container: scrollContainerRef,
  })

  return (
    <div ref={wordTargetRef} className={clsx('relative z-0 h-[150vh] sm:h-[200vh]', className)}>
      <div className={'sticky top-0 mx-auto flex items-center bg-transparent px-[1rem] py-[2rem] sm:py-[5rem]'}>
        <p
          className={
            'flex flex-wrap justify-center p-3 text-xl font-bold text-black sm:p-5 sm:text-2xl md:p-8 lg:p-10 lg:text-3xl xl:text-4xl 2xl:text-5xl dark:text-white'
          }
        >
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

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-0.5 sm:mx-1 lg:mx-2.5">
      <span className="absolute text-black opacity-30 dark:text-white">{children}</span>
      <motion.span style={{ opacity: opacity }} className={'text-black dark:text-white'}>
        {children}
      </motion.span>
    </span>
  )
}

export default ContactSection
