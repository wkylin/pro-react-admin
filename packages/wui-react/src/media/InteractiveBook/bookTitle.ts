import type { ReactNode } from 'react'

/** Separate a descriptive suffix only for long plain titles; explicit copy always wins. */
export function bookTitleParts(title: ReactNode, subtitle?: ReactNode) {
  if (typeof title !== 'string') return { title, subtitle, short: title }
  const match = title.length > 18 ? title.match(/^(.{2,18}?)[：:]\s*(.+)$/u) : null
  return {
    title: match && (subtitle == null || subtitle === match[2]) ? match[1] : title,
    subtitle: subtitle ?? match?.[2],
    short: match ? match[1] : title,
  }
}
