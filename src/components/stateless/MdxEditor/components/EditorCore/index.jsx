import React, { memo, useEffect, useRef } from 'react'
import { EditorContent } from '@tiptap/react'
import styles from './index.module.less'

function EditorCore({ editor, onStatsUpdate, onScroll, scrollRef }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!editor) return
    const updateStats = () => {
      const text = editor.getText()
      const chars = text.length
      const words = text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
      const { from } = editor.state.selection
      const state = editor.state
      const textBefore = state.doc.textBetween(0, from, '\n')
      const lines = textBefore.split('\n')
      const line = lines.length
      const col = lines[lines.length - 1].length + 1
      onStatsUpdate({ cursorPos: `行 ${line}, 列 ${col}`, stats: `${chars} 字符 / ${words} 词` })
    }

    updateStats()
    editor.on('selectionUpdate', updateStats)
    editor.on('update', updateStats)
    return () => {
      editor.off('selectionUpdate', updateStats)
      editor.off('update', updateStats)
    }
  }, [editor, onStatsUpdate])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !editor) return
    const handleClick = (e) => {
      if (e.target.classList.contains('ProseMirror')) {
        const contentHeight = editor.view.dom.scrollHeight
        const clickY = e.offsetY
        if (clickY > contentHeight - 50) {
          e.preventDefault()
          const estimatedLineHeight = 45
          const distance = clickY - contentHeight
          const linesToAdd = Math.floor(distance / estimatedLineHeight)
          let finalLines = Math.min(Math.max(linesToAdd, 1), 50)
          if (finalLines > 0) {
            const newParagraphs = Array(finalLines).fill('<p></p>').join('')
            editor.chain().focus('end').insertContent(newParagraphs).run()
          }
        }
      }
    }
    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [editor])

  return (
    <div
      className={`${styles.mdxEditorCol} mdxEditorCol`}
      ref={(el) => {
        containerRef.current = el
        if (scrollRef) scrollRef.current = el
      }}
      onScroll={onScroll}
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export default memo(EditorCore)
