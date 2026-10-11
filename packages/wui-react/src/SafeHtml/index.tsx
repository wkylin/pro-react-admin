import React, { memo, useMemo } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import type { Config as DOMPurifyConfig } from 'dompurify'

const DEFAULT_CONFIG = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'b',
    'i',
    'em',
    'strong',
    'u',
    's',
    'del',
    'blockquote',
    'code',
    'pre',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'caption',
    'span',
    'div',
    'svg',
    'path',
    'rect',
    'circle',
    'line',
    'text',
    'g',
  ],
  ALLOWED_ATTR: [
    'href',
    'src',
    'alt',
    'title',
    'target',
    'rel',
    'class',
    'id',
    'width',
    'height',
    'align',
    'colspan',
    'rowspan',
    /^data-(?!.*(on|exec|eval))/,
    /^aria-/,
  ],
  FORBID_TAGS: ['script', 'style', 'iframe', 'frame', 'frameset', 'object', 'embed', 'form', 'input', 'textarea'],
  WHOLE_DOCUMENT: false,
} as unknown as DOMPurifyConfig

const EMPTY_CONFIG: Partial<DOMPurifyConfig> = {}

export interface SafeHtmlProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML'> {
  html: string
  config?: Partial<DOMPurifyConfig>
  tag?: React.ElementType
  fallback?: React.ReactNode
}

const SafeHtml = memo<SafeHtmlProps>(
  ({ html, config = EMPTY_CONFIG, tag = 'div', fallback = null, className = '', ...props }) => {
    const WrapperEl: React.ElementType = tag as React.ElementType
    const cleanHtml = useMemo(() => {
      const finalConfig: DOMPurifyConfig = { ...DEFAULT_CONFIG, ...(config as Partial<DOMPurifyConfig>) }
      const sanitized = DOMPurify.sanitize(html, finalConfig)
      // sanitize may return TrustedHTML in some environments, cast via unknown to string safely
      return sanitized as unknown as string
    }, [html, config])

    if (!cleanHtml && fallback) return <>{fallback}</>

    return React.createElement(WrapperEl, {
      ...props,
      className: `safe-html ${className}`,
      dangerouslySetInnerHTML: { __html: cleanHtml },
    })
  }
)

export default SafeHtml
