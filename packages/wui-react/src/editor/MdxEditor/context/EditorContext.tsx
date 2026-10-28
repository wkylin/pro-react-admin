import { createContext, useContext, type ReactNode } from 'react'
import type { Editor } from '@tiptap/core'

const EditorContext = createContext<Editor | null>(null)

export const EditorProvider = ({ children, editor }: { children: ReactNode; editor: Editor | null }) => {
  return <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
}

export const useEditorContext = () => {
  return useContext(EditorContext)
}
