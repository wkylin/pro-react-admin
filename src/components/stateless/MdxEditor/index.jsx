import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
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
import './styles/global.less'
import './styles/codeHighlight.less'

// 创建 lowlight 实例，加载常用语言
const lowlight = createLowlight(common)

const initialMarkdown = `# Pro MDX Editor

欢迎使用 **React 19** + **Tiptap** 编辑器。

试着点击下方空白区域，或切换视图查看源码。

> 开始创作吧！
`

export default function ProMdxEditor() {
  const [viewMode, setViewMode] = useState('normal')
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const [stats, setStats] = useState({ cursorPos: '行 1, 列 1', stats: '0 字符 / 0 词' })
  const [toast, setToast] = useState(null)
  const [theme, setTheme] = useState('light')
  const [editorKey, setEditorKey] = useState(0) // 用于强制刷新工具栏
  const lastMarkdownFromEditorRef = useRef(markdown)
  const toastTimerRef = useRef(null)
  const editorScrollRef = useRef(null)
  const sourceScrollRef = useRef(null)
  const isSyncingRef = useRef(false)

  const extensions = useMemo(() => {
    return [
      StarterKit.configure({
        codeBlock: false, // 禁用默认的 codeBlock，使用带高亮的版本
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Placeholder.configure({ placeholder: '输入 "/" 开始创作...' }),
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
  }, [])

  const editor = useEditor({
    extensions,
    content: markdownToHtml(markdown),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const md = htmlToMarkdown(html)
      lastMarkdownFromEditorRef.current = md
      setMarkdown(md)
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
    editor.commands.setContent(newHtml, false)
  }, [markdown, editor])

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type })
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2000)
  }, [])

  const handleThemeChange = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  const handleMarkdownChange = (newMarkdown) => setMarkdown(newMarkdown)

  const handleEditorScroll = useCallback(
    (e) => {
      if (viewMode !== 'split' || isSyncingRef.current) return
      isSyncingRef.current = true
      const editorContainer = e.target
      const sourceContainer = sourceScrollRef.current
      if (sourceContainer) {
        const scrollRatio = editorContainer.scrollTop / (editorContainer.scrollHeight - editorContainer.clientHeight)
        sourceContainer.scrollTop = scrollRatio * (sourceContainer.scrollHeight - sourceContainer.clientHeight)
      }
      setTimeout(() => {
        isSyncingRef.current = false
      }, 10)
    },
    [viewMode]
  )

  const handleSourceScroll = useCallback(
    (e) => {
      if (viewMode !== 'split' || isSyncingRef.current) return
      isSyncingRef.current = true
      const sourceContainer = e.target
      const editorContainer = editorScrollRef.current
      if (editorContainer) {
        const scrollRatio = sourceContainer.scrollTop / (sourceContainer.scrollHeight - sourceContainer.clientHeight)
        editorContainer.scrollTop = scrollRatio * (editorContainer.scrollHeight - editorContainer.clientHeight)
      }
      setTimeout(() => {
        isSyncingRef.current = false
      }, 10)
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
    a.download = 'document.mdx'
    a.click()
  }

  const viewClass = viewMode === 'split' ? styles.viewSplit : viewMode === 'code' ? styles.viewCode : ''
  const themeClass = theme === 'dark' ? styles.themeDark : ''

  return (
    <div className={`${styles.mdxApp} ${viewClass} ${themeClass}`}>
      <Header theme={theme} onThemeChange={handleThemeChange} onCopy={handleCopy} onDownload={handleDownload} />
      <Toolbar editor={editor} viewMode={viewMode} onChangeViewMode={setViewMode} editorKey={editorKey} />
      <main className={styles.mdxMainContent}>
        <EditorCore
          editor={editor}
          onStatsUpdate={setStats}
          onScroll={handleEditorScroll}
          scrollRef={editorScrollRef}
        />
        {viewMode !== 'normal' && (
          <SourceView
            markdown={markdown}
            onChange={handleMarkdownChange}
            onScroll={handleSourceScroll}
            scrollRef={sourceScrollRef}
          />
        )}
      </main>
      <Footer cursorPos={stats.cursorPos} stats={stats.stats} />
      {toast && <div className={`${styles.mdxToast} ${styles[`mdxToast_${toast.type}`] || ''}`}>{toast.message}</div>}
    </div>
  )
}
