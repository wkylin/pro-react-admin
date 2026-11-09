import { useId, type ReactNode } from 'react'
import FixTabPanel from '../FixTabPanel'
import styles from './index.module.less'

export interface BusinessPageProps {
  title: string
  description?: string
  eyebrow?: ReactNode
  actions?: ReactNode
  notice?: ReactNode
  toolbar?: ReactNode
  children: ReactNode
  className?: string
  headingId?: string
  fill?: boolean
}

/** The common reading order and spacing for pages inside the workspace. */
export default function BusinessPage({
  title,
  description,
  eyebrow,
  actions,
  notice,
  toolbar,
  children,
  className = '',
  headingId,
  fill = false,
}: BusinessPageProps) {
  const generatedId = useId()
  const titleId = headingId ?? generatedId
  return (
    <FixTabPanel fill={fill} showScrollProgress={false}>
      <section className={`${styles.page} ${className}`} aria-labelledby={titleId}>
        <header className={styles.header}>
          <div className={styles.heading}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            <h1 id={titleId} className={styles.title}>
              {title}
            </h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
        {notice}
        {toolbar}
        {children}
      </section>
    </FixTabPanel>
  )
}

export function BusinessToolbar({
  children,
  actions,
  label,
}: {
  children?: ReactNode
  actions?: ReactNode
  label?: string
}) {
  return (
    <div className={styles.toolbar} role={label ? 'search' : undefined} aria-label={label}>
      {children && <div className={styles.controls}>{children}</div>}
      {actions && <div className={styles.toolbarActions}>{actions}</div>}
    </div>
  )
}
