import { useState, useEffect, type HTMLAttributes } from 'react'
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki'
import SafeHtml from '../../SafeHtml'
export interface CodeHighlighterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onError' | 'children'> {
  code: string
  lang?: BundledLanguage | 'text' | 'plaintext'
  theme?: BundledTheme
  onError?: (error: unknown) => void
}
export default function CodeHighlighter({
  code,
  lang = 'typescript',
  theme = 'github-light',
  onError,
  ...props
}: CodeHighlighterProps) {
  const [result, setResult] = useState<{ code: string; lang: string; theme: string; html: string } | null>(null)
  useEffect(() => {
    let active = true
    void codeToHtml(code, { lang, theme }).then(
      (html) => {
        if (active) setResult({ code, lang, theme, html })
      },
      (error) => {
        if (active) {
          setResult(null)
          onError?.(error)
        }
      }
    )
    return () => {
      active = false
    }
  }, [code, lang, theme, onError])
  return (
    <div {...props}>
      {result?.code === code && result.lang === lang && result.theme === theme ? (
        <SafeHtml html={result.html} config={{ ADD_ATTR: ['style'] }} />
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
