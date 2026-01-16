import React, { createContext, useContext } from 'react'

const EditorContext = createContext(null)

export const EditorProvider = ({ children, editor }) => {
  return <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
}

export const useEditorContext = () => {
  return useContext(EditorContext)
}
