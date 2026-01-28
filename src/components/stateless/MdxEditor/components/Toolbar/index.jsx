import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useMemo, useRef, useState } from 'react'
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

// editorKey 参数用于触发重新渲染，确保工具栏高亮状态更新
function Toolbar({ editor, viewMode, onChangeViewMode, editorKey }) {
  const fileInputRef = useRef(null)
  const iconSize = 18
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('https://')
  const linkInputRef = useRef(null)

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

  const handleAction = (cmd, opt) => {
    if (!editor) return
    if (cmd === 'image') {
      fileInputRef.current?.click()
      return
    }
    if (cmd === 'link') {
      setShowLinkModal(true)
      setTimeout(() => linkInputRef.current?.select(), 100)
      return
    }
    if (cmd === 'table') {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      return
    }
    if (cmd === 'heading') {
      const level = parseInt(opt, 10)
      if (!isNaN(level)) editor.chain().focus().toggleHeading({ level }).run()
      return
    }
    if (cmd === 'textAlign') {
      if (opt) editor.chain().focus().setTextAlign(opt).run()
      return
    }
    if (cmd === 'undo' || cmd === 'redo') {
      editor.chain()[cmd]().run()
      return
    }
    const toggleCmd = `toggle${cmd.charAt(0).toUpperCase() + cmd.slice(1)}`
    if (editor.chain()[toggleCmd]) {
      editor.chain().focus()[toggleCmd]().run()
    } else {
      editor.chain().focus()[cmd]().run()
    }
  }

  const buttons = useMemo(
    () => [
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Undo2 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'undo',
        tooltip: '撤销',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Redo2 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'redo',
        tooltip: '重做',
      },
      { type: 'separator' },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Heading1 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'heading',
        opt: '1',
        tooltip: 'H1',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Heading2 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'heading',
        opt: '2',
        tooltip: 'H2',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Heading3 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'heading',
        opt: '3',
        tooltip: 'H3',
      },
      { type: 'separator' },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Bold size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'bold',
        tooltip: '加粗',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Italic size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'italic',
        tooltip: '斜体',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Underline size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'underline',
        tooltip: '下划线',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Strikethrough size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'strike',
        tooltip: '删除线',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Code size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'code',
        tooltip: '行内代码',
      },
      { type: 'separator' },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <AlignLeft size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'textAlign',
        opt: 'left',
        tooltip: '左对齐',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <AlignCenter size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'textAlign',
        opt: 'center',
        tooltip: '居中',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <AlignRight size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'textAlign',
        opt: 'right',
        tooltip: '右对齐',
      },
      { type: 'separator' },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <List size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'bulletList',
        tooltip: '无序列表',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <ListOrdered size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'orderedList',
        tooltip: '有序列表',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <ListTodo size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'taskList',
        tooltip: '任务列表',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Quote size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'blockquote',
        tooltip: '引用',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Braces size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'codeBlock',
        tooltip: '代码块',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Minus size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'horizontalRule',
        tooltip: '分割线',
      },
      { type: 'separator' },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Image size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'image',
        tooltip: '插入图片',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Link2 size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'link',
        tooltip: '插入链接',
      },
      {
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Table size={iconSize} />
          </AnimatedIcon>
        ),
        cmd: 'table',
        tooltip: '插入表格',
      },
    ],
    [iconSize]
  )

  if (!editor) return null

  // 检查按钮是否处于激活状态
  const checkActive = (cmd, opt) => {
    if (!editor || !editor.isActive) return false
    try {
      if (cmd === 'heading') {
        const level = Number(opt)
        // 必须严格检查当前是否是指定级别的 heading
        return level >= 1 && level <= 6 && editor.isActive('heading', { level })
      }
      if (cmd === 'textAlign') {
        return opt ? editor.isActive({ textAlign: opt }) : false
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
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const reader = new FileReader()
          reader.onload = (event) => {
            const src = event.target?.result
            if (!src) return
            editor.chain().focus().setImage({ src }).run()
          }
          reader.readAsDataURL(file)
          e.target.value = ''
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
                <AnimatedIcon variant="spin" mode="hover">
                  <X size={16} />
                </AnimatedIcon>
              </button>
            </div>
            <div className={styles.linkModalBody}>
              <input
                ref={linkInputRef}
                type="url"
                className={styles.linkInput}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLinkSubmit()
                  if (e.key === 'Escape') handleLinkCancel()
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
