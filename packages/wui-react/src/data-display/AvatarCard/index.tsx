import type { HTMLAttributes, ReactNode } from 'react'
export interface AvatarCardProps extends HTMLAttributes<HTMLDivElement> {
  avatar: string
  text: ReactNode
  alt?: string
}
import styles from './index.module.less'
const AvatarCard = ({ avatar, text, alt = '', className = '', ...props }: AvatarCardProps) => {
  return (
    <div {...props} className={`${styles.avatarCard} ${className}`}>
      <div className={styles.card}>
        <figure>
          <img alt={alt} src={avatar} className={styles.avatar} />
        </figure>
        <p className={styles.content}>{text}</p>
      </div>
    </div>
  )
}

export default AvatarCard
