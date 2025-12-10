import React, { useRef } from 'react'
import { motion, useTransform, useScroll } from 'motion/react'
import HorizontalScrollParallax from '@stateless/HorizontalScroll'

/**
 * AboutSection - 关于我们区域组件
 * 包含水平滚动视差效果
 *
 * @param {Object} props
 * @param {React.RefObject} props.scrollContainerRef - 滚动容器引用
 * @param {string} props.className - 额外的CSS类名
 */
const AboutSection = ({ scrollContainerRef, className = '' }) => {
  const targetRef = useRef(null)

  const { scrollYProgress: scrYProCard } = useScroll({
    target: targetRef,
    container: scrollContainerRef,
  })
  const scrYProCardX = useTransform(scrYProCard, [0, 1], ['1%', '-50%'])

  return (
    <section ref={targetRef} className={`relative h-[300vh] pt-4 ${className}`}>
      <div className="sticky top-0 flex w-full items-center overflow-hidden">
        <motion.div style={{ x: scrYProCardX }} className="flex w-full gap-4">
          <HorizontalScrollParallax />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
