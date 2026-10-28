import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedIcon from '../../AnimatedIcon'
import styles from '../layout.module.less'
export interface FooterLink {
  label: string
  href: string
  external?: boolean
}
export interface FooterNavigation {
  title: ReactNode
  links: FooterLink[]
}
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode
  description?: ReactNode
  navigation?: FooterNavigation[]
  socialLinks?: FooterLink[]
  socialLabel?: string
  legalItems?: FooterLink[]
  copyright?: ReactNode
}
export default function Footer({
  brand,
  description,
  navigation = [],
  socialLinks = [],
  socialLabel = 'Social links',
  legalItems = [],
  copyright,
  children,
  className = '',
  ...props
}: FooterProps) {
  const link = (item: FooterLink) => (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
    >
      {item.label}
      {item.external && (
        <AnimatedIcon variant="spin" mode="hover">
          <ArrowUpRight size={16} aria-hidden />
        </AnimatedIcon>
      )}
    </a>
  )
  return (
    <footer className={`${styles.footer} ${className}`} {...props}>
      <div className={styles.footerColumns}>
        <div>
          {brand && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {brand}
            </motion.div>
          )}
          {description && <p>{description}</p>}
        </div>
        {navigation.map((group, index) => (
          <nav key={index}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((item) => (
                <li key={item.href}>{link(item)}</li>
              ))}
            </ul>
          </nav>
        ))}
        {socialLinks.length > 0 && (
          <nav aria-label={socialLabel}>
            <ul>
              {socialLinks.map((item) => (
                <li key={item.href}>{link(item)}</li>
              ))}
            </ul>
          </nav>
        )}
        {children}
      </div>
      {(copyright || legalItems.length > 0) && (
        <div className={styles.footerLegal}>
          {copyright}
          <nav>
            {legalItems.map((item) => (
              <span key={item.href}>{link(item)}</span>
            ))}
          </nav>
        </div>
      )}
    </footer>
  )
}
