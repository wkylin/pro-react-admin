import { useMemo, useRef, useState, useEffect, useCallback, type UIEvent } from 'react'
import Header from './components/Header/index'
import Toolbar from './components/Toolbar/index'
import EditorCore from './components/EditorCore/index'
import SourceView from './components/SourceView/index'
import Footer from './components/Footer/index'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { htmlToMarkdown, markdownToHtml } from './utils/markdownHelper'
import styles from './index.module.less'

// 创建 lowlight 实例，加载常用语言
const lowlight = createLowlight(common)

export interface MdxEditorProps {
  initialMarkdown?: string
  value?: string
  onChange?: (markdown: string) => void
  readOnly?: boolean
  theme?: 'light' | 'dark'
  onThemeChange?: (theme: 'light' | 'dark') => void
  title?: string
  labels?: { theme?: string; copy?: string; download?: string; placeholder?: string; source?: string }
  downloadFileName?: string
}

type ViewMode = 'normal' | 'split' | 'code'

type Stats = {
  cursorPos: string
  stats: string
}

type Toast = {
  message: string
  type: 'info' | 'success' | 'error'
}

export default function ProMdxEditor({
  initialMarkdown: initialMarkdownProp,
  onChange,
  readOnly = false,
  value,
  theme,
  onThemeChange,
  title,
  labels = {},
  downloadFileName = 'document.md',
}: MdxEditorProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>('normal')
  const [markdown, setMarkdown] = useState(value ?? initialMarkdownProp ?? '')
  const [stats, setStats] = useState<Stats>({ cursorPos: '行 1, 列 1', stats: '0 字符 / 0 词' })
  const [toast, setToast] = useState<Toast | null>(null)
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('light')
  const activeTheme = theme ?? localTheme
  const [editorKey, setEditorKey] = useState(0) // 用于强制刷新工具栏
  const lastMarkdownFromEditorRef = useRef(markdown)
  const toastTimerRef = useRef<number | null>(null)
  const editorScrollRef = useRef<HTMLDivElement | null>(null)
  const sourceScrollRef = useRef<HTMLDivElement | null>(null)
  const isSyncingRef = useRef(false)

  const extensions = useMemo(() => {
    return [
      StarterKit.configure({
        link: false,
        underline: false,
        codeBlock: false, // 禁用默认的 codeBlock，使用带高亮的版本
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Placeholder.configure({ placeholder: labels.placeholder ?? '' }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ]
  }, [labels.placeholder])

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: markdownToHtml(markdown),
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const md = htmlToMarkdown(html)
      lastMarkdownFromEditorRef.current = md
      setMarkdown(md)
      if (typeof onChange === 'function') onChange(md)
    },
    onSelectionUpdate: () => {
      // 触发工具栏更新
      setEditorKey((k) => k + 1)
    },
    onTransaction: () => {
      // 触发工具栏更新
      setEditorKey((k) => k + 1)
    },
  })

  useEffect(() => {
    if (!editor) return
    const isExternalChange = markdown !== lastMarkdownFromEditorRef.current
    if (!isExternalChange) return

    const newHtml = markdownToHtml(markdown)
    editor.commands.setContent(newHtml, { emitUpdate: false })
    lastMarkdownFromEditorRef.current = markdown
  }, [markdown, editor])

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    setToast({ message, type })
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2000)
  }, [])

  const handleThemeChange = useCallback(() => {
    const next = activeTheme === 'dark' ? 'light' : 'dark'
    if (theme === undefined) setLocalTheme(next)
    onThemeChange?.(next)
  }, [activeTheme, theme, onThemeChange])
  useEffect(() => {
    if (value !== undefined) setMarkdown(value)
  }, [value])
  useEffect(() => {
    editor?.setEditable(!readOnly, false)
  }, [editor, readOnly])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown)
    if (typeof onChange === 'function') onChange(newMarkdown)
  }

  const handleEditorScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (viewMode !== 'split' || isSyncingRef.current) return
      isSyncingRef.current = true
      const editorContainer = e.currentTarget
      const sourceContainer = sourceScrollRef.current
      if (sourceContainer) {
        const scrollRatio =
          editorContainer.scrollTop / Math.max(1, editorContainer.scrollHeight - editorContainer.clientHeight)
        sourceContainer.scrollTop =
          scrollRatio * Math.max(1, sourceContainer.scrollHeight - sourceContainer.clientHeight)
      }
      isSyncingRef.current = false
    },
    [viewMode]
  )

  const handleSourceScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (viewMode !== 'split' || isSyncingRef.current) return
      isSyncingRef.current = true
      const sourceContainer = e.currentTarget
      const editorContainer = editorScrollRef.current
      if (editorContainer) {
        const scrollRatio =
          sourceContainer.scrollTop / Math.max(1, sourceContainer.scrollHeight - sourceContainer.clientHeight)
        editorContainer.scrollTop =
          scrollRatio * Math.max(1, editorContainer.scrollHeight - editorContainer.clientHeight)
      }
      isSyncingRef.current = false
    },
    [viewMode]
  )

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      showToast('已复制到剪贴板', 'success')
    } catch {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = markdown
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        textarea.style.top = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(textarea)
        if (ok) {
          showToast('已复制到剪贴板', 'success')
        } else {
          showToast('复制失败，请手动复制', 'error')
        }
      } catch {
        showToast('复制失败，请手动复制', 'error')
      }
    }
  }, [markdown, showToast])

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = downloadFileName
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const viewClass = viewMode === 'split' ? styles.viewSplit : viewMode === 'code' ? styles.viewCode : ''
  const themeClass = activeTheme === 'dark' ? styles.themeDark : ''

  return (
    <div className={`wui-mdx-editor ${styles.mdxApp} ${viewClass} ${themeClass}`}>
      <Header
        title={title}
        labels={labels}
        theme={activeTheme}
        onThemeChange={handleThemeChange}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />
      <Toolbar
        editor={readOnly ? null : editor}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        editorKey={editorKey}
      />
      <div className={styles.mdxMainContent}>
        <EditorCore
          editor={editor}
          onStatsUpdate={setStats}
          onScroll={handleEditorScroll}
          scrollRef={editorScrollRef}
        />
        {viewMode !== 'normal' && (
          <SourceView
            readOnly={readOnly}
            label={labels.source}
            markdown={markdown}
            onChange={handleMarkdownChange}
            onScroll={handleSourceScroll}
            scrollRef={sourceScrollRef}
          />
        )}
      </div>
      <Footer cursorPos={stats.cursorPos} stats={stats.stats} />
      {toast && <div className={`${styles.mdxToast} ${styles[`mdxToast_${toast.type}`] || ''}`}>{toast.message}</div>}
    </div>
  )
}
