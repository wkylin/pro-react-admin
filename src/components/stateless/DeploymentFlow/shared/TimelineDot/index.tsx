import React from 'react'
import styles from '../../index.module.less'

interface Props {
  type: 'git' | 'ci' | 'env' | 'strategy' | 'ops'
}

const colorMap: Record<Props['type'], string> = {
  git: '#0277bd',
  ci: '#ef6c00',
  env: '#2e7d32',
  strategy: '#6a1b9a',
  ops: '#c62828',
}

const TimelineDot: React.FC<Props> = ({ type }) => {
  const typeClass = styles[type] || ''
  const className = `${styles.dot} ${typeClass}`.trim()
  const fallbackStyle = typeClass ? undefined : { backgroundColor: colorMap[type] }

  return <div className={className} style={fallbackStyle} />
}

export default TimelineDot
