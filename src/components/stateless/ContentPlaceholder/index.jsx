import React from 'react'
import { motion } from 'motion/react'
import { mix } from 'popmotion'
import styles from './index.module.less'

const randomInt = (min, max) => Math.round(mix(min, max, Math.random()))
const generateParagraphLength = () => randomInt(5, 20)
const generateWordLength = () => randomInt(20, 100)

const paragraphs = [...Array(3)].map(() => {
  return [...Array(generateParagraphLength())].map(generateWordLength)
})

export const Word = ({ width }) => <div className={styles.word} style={{ width }} />

const Paragraph = ({ words }) => (
  <div className={styles.paragraph}>
    {words.map((width) => (
      <Word width={width} />
    ))}
  </div>
)

const ContentPlaceholder = () => (
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    initial="collapsed"
    animate="open"
    whileInView={true}
    transition={{ duration: 0.8 }}
    className={styles.contentPlaceholder}
  >
    {paragraphs.map((words) => (
      <Paragraph words={words} />
    ))}
  </motion.div>
)

export default ContentPlaceholder
