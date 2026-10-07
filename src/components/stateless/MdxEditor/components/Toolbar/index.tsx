import { useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react'
import type { Editor } from '@tiptap/core'
import {
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Braces,
  Minus,
  Image,
  Link2,
  Table,
  X,
} from 'lucide-react'
import styles from './index.module.less'

type ViewMode = 'normal' | 'split' | 'code'
type TextAlignment = 'left' | 'center' | 'right'
type ToolbarCommand =
  | 'undo'
  | 'redo'
  | 'heading'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'textAlign'
  | 'bulletList'
  | 'orderedList'
  | 'taskList'
  | 'blockquote'
  | 'codeBlock'
  | 'horizontalRule'
  | 'image'
  | 'link'
  | 'table'
type ToolbarOption = '1' | '2' | '3' | TextAlignment
type ToolbarButton =
  | { type: 'separator' }
  | { type?: 'action'; icon: ReactNode; cmd: ToolbarCommand; opt?: ToolbarOption; tooltip: string }

// editorKey 参数用于触发重新渲染，确保工具栏高亮状态更新
function Toolbar({
  editor,
  viewMode,
  onChangeViewMode,
  editorKey,
}: {
  editor: Editor | null
  viewMode: ViewMode
  onChangeViewMode?: (mode: ViewMode) => void
  editorKey: number
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const iconSize = 18
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('https://')
  const linkInputRef = useRef<HTMLInputElement>(null)

  // editorKey 变化时强制重新计算
  void editorKey

  const handleLinkSubmit = () => {
    if (linkUrl && linkUrl !== 'https://') {
      editor?.chain().focus().setLink({ href: linkUrl }).run()
    }
    setShowLinkModal(false)
    setLinkUrl('https://')
  }

  const handleLinkCancel = () => {
    setShowLinkModal(false)
    setLinkUrl('https://')
    editor?.chain().focus().run()
  }

  const handleAction = (cmd: ToolbarCommand, opt?: ToolbarOption) => {
    if (!editor) return
    switch (cmd) {
      case 'image':
        fileInputRef.current?.click()
        return
      case 'link':
        setShowLinkModal(true)
        setTimeout(() => linkInputRef.current?.select(), 100)
        return
      case 'table':
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        return
      case 'heading': {
        const level = Number(opt)
        if (level === 1 || level === 2 || level === 3) {
          editor.chain().focus().toggleHeading({ level }).run()
        }
        return
      }
      case 'textAlign':
        if (opt === 'left' || opt === 'center' || opt === 'right') {
          editor.chain().focus().setTextAlign(opt).run()
        }
        return
      case 'undo':
        editor.chain().undo().run()
        return
      case 'redo':
        editor.chain().redo().run()
        return
      case 'bold':
        editor.chain().focus().toggleBold().run()
        return
      case 'italic':
        editor.chain().focus().toggleItalic().run()
        return
      case 'underline':
        editor.chain().focus().toggleUnderline().run()
        return
      case 'strike':
        editor.chain().focus().toggleStrike().run()
        return
      case 'code':
        editor.chain().focus().toggleCode().run()
        return
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run()
        return
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run()
        return
      case 'taskList':
        editor.chain().focus().toggleTaskList().run()
        return
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run()
        return
      case 'codeBlock':
        editor.chain().focus().toggleCodeBlock().run()
        return
      case 'horizontalRule':
        editor.chain().focus().insertContent({ type: 'horizontalRule' }).run()
        return
    }
  }

  const buttons = useMemo(
    (): ToolbarButton[] => [
      { icon: <Undo2 size={iconSize} />, cmd: 'undo', tooltip: '撤销' },
      { icon: <Redo2 size={iconSize} />, cmd: 'redo', tooltip: '重做' },
      { type: 'separator' },
      { icon: <Heading1 size={iconSize} />, cmd: 'heading', opt: '1', tooltip: 'H1' },
      { icon: <Heading2 size={iconSize} />, cmd: 'heading', opt: '2', tooltip: 'H2' },
      { icon: <Heading3 size={iconSize} />, cmd: 'heading', opt: '3', tooltip: 'H3' },
      { type: 'separator' },
      { icon: <Bold size={iconSize} />, cmd: 'bold', tooltip: '加粗' },
      { icon: <Italic size={iconSize} />, cmd: 'italic', tooltip: '斜体' },
      { icon: <Underline size={iconSize} />, cmd: 'underline', tooltip: '下划线' },
      { icon: <Strikethrough size={iconSize} />, cmd: 'strike', tooltip: '删除线' },
      { icon: <Code size={iconSize} />, cmd: 'code', tooltip: '行内代码' },
      { type: 'separator' },
      { icon: <AlignLeft size={iconSize} />, cmd: 'textAlign', opt: 'left', tooltip: '左对齐' },
      { icon: <AlignCenter size={iconSize} />, cmd: 'textAlign', opt: 'center', tooltip: '居中' },
      { icon: <AlignRight size={iconSize} />, cmd: 'textAlign', opt: 'right', tooltip: '右对齐' },
      { type: 'separator' },
      { icon: <List size={iconSize} />, cmd: 'bulletList', tooltip: '无序列表' },
      { icon: <ListOrdered size={iconSize} />, cmd: 'orderedList', tooltip: '有序列表' },
      { icon: <ListTodo size={iconSize} />, cmd: 'taskList', tooltip: '任务列表' },
      { icon: <Quote size={iconSize} />, cmd: 'blockquote', tooltip: '引用' },
      { icon: <Braces size={iconSize} />, cmd: 'codeBlock', tooltip: '代码块' },
      { icon: <Minus size={iconSize} />, cmd: 'horizontalRule', tooltip: '分割线' },
      { type: 'separator' },
      { icon: <Image size={iconSize} />, cmd: 'image', tooltip: '插入图片' },
      { icon: <Link2 size={iconSize} />, cmd: 'link', tooltip: '插入链接' },
      { icon: <Table size={iconSize} />, cmd: 'table', tooltip: '插入表格' },
    ],
    [iconSize]
  )

  if (!editor) return null

  // 检查按钮是否处于激活状态
  const checkActive = (cmd: ToolbarCommand, opt?: ToolbarOption) => {
    if (!editor || !editor.isActive) return false
    try {
      if (cmd === 'heading') {
        const level = Number(opt)
        // 必须严格检查当前是否是指定级别的 heading
        return level >= 1 && level <= 6 && editor.isActive('heading', { level })
      }
      if (cmd === 'textAlign') {
        return opt === 'left' || opt === 'center' || opt === 'right' ? editor.isActive({ textAlign: opt }) : false
      }
      if (cmd === 'link') {
        return editor.isActive('link')
      }
      // 对于其他命令，直接检查
      return editor.isActive(cmd)
    } catch {
      return false
    }
  }

  return (
    <div className={styles.mdxToolbar}>
      <input
        ref={fileInputRef}
        type="file"
        className={styles.mdxFileInput}
        accept="image/*"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0]
          if (!file) return
          const reader = new FileReader()
          reader.onload = (loadEvent) => {
            const src = loadEvent.target?.result
            if (typeof src !== 'string') return
            editor.chain().focus().setImage({ src }).run()
          }
          reader.readAsDataURL(file)
          event.target.value = ''
        }}
      />
      <div className={styles.mdxToolbarLeft}>
        {buttons.map((btn, idx) => {
          if (btn.type === 'separator') {
            return <div key={`sep-${idx}`} className={styles.mdxSeparator} />
          }
          const isActive = checkActive(btn.cmd, btn.opt)
          return (
            <button
              key={`${btn.cmd}-${idx}`}
              className={`${styles.mdxToolBtn} ${isActive ? styles.active : ''}`}
              onClick={() => handleAction(btn.cmd, btn.opt)}
              title={btn.tooltip}
              type="button"
            >
              {btn.icon}
            </button>
          )
        })}
      </div>

      <div className={styles.mdxToolbarRight}>
        <div className={styles.mdxViewToggle} role="tablist" aria-label="View mode">
          <button
            type="button"
            className={`${styles.mdxViewOpt} ${viewMode === 'normal' ? styles.active : ''}`}
            onClick={() => onChangeViewMode?.('normal')}
          >
            编辑
          </button>
          <button
            type="button"
            className={`${styles.mdxViewOpt} ${viewMode === 'split' ? styles.active : ''}`}
            onClick={() => onChangeViewMode?.('split')}
          >
            分屏
          </button>
          <button
            type="button"
            className={`${styles.mdxViewOpt} ${viewMode === 'code' ? styles.active : ''}`}
            onClick={() => onChangeViewMode?.('code')}
          >
            源码
          </button>
        </div>
      </div>

      {/* 链接输入弹窗 */}
      {showLinkModal && (
        <div className={styles.linkModalOverlay} onClick={handleLinkCancel}>
          <div className={styles.linkModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.linkModalHeader}>
              <span>插入链接</span>
              <button type="button" className={styles.linkModalClose} onClick={handleLinkCancel}>
                <X size={16} />
              </button>
            </div>
            <div className={styles.linkModalBody}>
              <input
                ref={linkInputRef}
                type="url"
                className={styles.linkInput}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === 'Enter') handleLinkSubmit()
                  if (event.key === 'Escape') handleLinkCancel()
                }}
                placeholder="https://example.com"
                autoFocus
              />
            </div>
            <div className={styles.linkModalFooter}>
              <button type="button" className={styles.linkBtnCancel} onClick={handleLinkCancel}>
                取消
              </button>
              <button type="button" className={styles.linkBtnConfirm} onClick={handleLinkSubmit}>
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Toolbar
