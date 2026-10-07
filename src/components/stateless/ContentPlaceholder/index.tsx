import React, { type CSSProperties } from 'react'
import { motion } from 'motion/react'
import { mix } from 'popmotion'
import styles from './index.module.less'

const randomInt = (min: number, max: number): number => Math.round(mix(min, max, Math.random()))
const generateParagraphLength = (): number => randomInt(5, 20)
const generateWordLength = (): number => randomInt(20, 100)

const paragraphs: number[][] = Array.from({ length: 3 }, () =>
  Array.from({ length: generateParagraphLength() }, generateWordLength)
)

type WordProps = {
  width: CSSProperties['width']
}

type ParagraphProps = {
  words: number[]
}

export const Word = ({ width }: WordProps) => <div className={styles.word} style={{ width }} />

const Paragraph = ({ words }: ParagraphProps) => (
  <div className={styles.paragraph}>
    {words.map((width, index) => (
      <Word key={index} width={width} />
    ))}
  </div>
)

const ContentPlaceholder = () => (
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    initial="collapsed"
    animate="open"
    transition={{ duration: 0.8 }}
    className={styles.contentPlaceholder}
  >
    <section>
      <Word width={75} />
      <Word width={245} />
      <Word width={120} />
    </section>
    {paragraphs.map((words, index) => (
      <Paragraph key={index} words={words} />
    ))}
  </motion.div>
)

export default ContentPlaceholder
