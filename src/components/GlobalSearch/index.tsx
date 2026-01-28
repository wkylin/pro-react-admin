import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Modal, Input, Avatar, InputRef, theme } from 'antd'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { useMenuSearch, MenuSearchResult } from '@src/app-hooks/useMenuSearch'
import {
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CloseOutlined,
  EnterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import { useProThemeContext } from '@src/theme/hooks'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
  onNavigate?: (path: string) => void
}

const RECENT_KEY = 'global_search_recent_v1'

type StoredRecent = {
  key: string
  label?: string
  path?: string
  i18nKey?: string
  pinyin?: string
}

const isDev = () => {
  try {
    return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production'
  } catch {
    return false
  }
}

const devWarn = (message: string, error?: unknown) => {
  if (!isDev()) return
  console.warn(message, error)
}

const readRecentFromStorage = (): StoredRecent[] => {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
      return parsed.map((k: string) => ({ key: k }))
    }
    if (Array.isArray(parsed)) return parsed as StoredRecent[]
    return []
  } catch (e) {
    devWarn('[GlobalSearch] Failed to parse recent items from localStorage', e)
    return []
  }
}

const persistRecentToStorage = (next: StoredRecent[]) => {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch (e) {
    devWarn('[GlobalSearch] Failed to persist recent items to localStorage', e)
  }
}

const buildRecentEntries = (recentStored: StoredRecent[], allItems: MenuSearchResult[]): MenuSearchResult[] => {
  return recentStored.map((s) => {
    const found = allItems.find((a) => a.item.key === s.key)
    if (found) return found
    const fallbackItem: MenuSearchResult['item'] = {
      key: s.key,
      label: s.label || s.key,
      path: s.path || s.key,
      ...(s.i18nKey ? { i18nKey: s.i18nKey } : {}),
      ...(s.pinyin ? { pinyin: s.pinyin } : {}),
    }

    return { item: fallbackItem }
  })
}

const renderEntryContent = (entry: MenuSearchResult, isDark: boolean) => {
  const item = entry.item
  const matches = entry.matches ?? []
  const labelMatch = matches.find((m) => m.key === 'label')
  const i18nMatch = matches.find((m) => m.key === 'i18nKey' || m.key === 'i18n')
  const pinyinMatch = matches.find((m) => m.key === 'pinyin')

  const labelEl = labelMatch ? highlightWithIndices(item.label, labelMatch.indices, isDark) : <>{item.label}</>

  let subEl: React.ReactNode = null
  if (!labelMatch) {
    if (i18nMatch) {
      subEl = (
        <div
          style={{
            color: isDark ? '#888' : '#999',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices, isDark)}
        </div>
      )
    } else if (pinyinMatch) {
      subEl = (
        <div
          style={{
            color: isDark ? '#888' : '#999',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {highlightWithIndices(pinyinMatch.value || item.pinyin || '', pinyinMatch.indices, isDark)}
        </div>
      )
    }
  } else if (i18nMatch) {
    subEl = (
      <div style={{ color: isDark ? '#888' : '#999', fontSize: 12, marginTop: 4 }}>
        {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices, isDark)}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ color: isDark ? '#eee' : '#333', fontWeight: 500 }}>{labelEl}</div>
      {subEl}
    </div>
  )
}

type DraggableModalRenderProps = {
  modal: React.ReactNode
  isFullscreen: boolean
  bounds: { left: number; top: number; right: number; bottom: number }
  dragRef: React.RefObject<HTMLDivElement | null>
  onStart: (event: DraggableEvent, data: DraggableData) => void
}

const DraggableModalRender: React.FC<DraggableModalRenderProps> = ({
  modal,
  isFullscreen,
  bounds,
  dragRef,
  onStart,
}) => (
  <Draggable disabled={isFullscreen} bounds={bounds} handle=".draggable-handle" nodeRef={dragRef} onStart={onStart}>
    <div ref={dragRef} style={{ pointerEvents: 'auto' }}>
      <style>
        {`
          .fix-ant-modal .wui-ant-modal-container {
            padding: 0 !important;
            overflow: hidden;
          }

          .global-search-input {
            /* className is applied to the affix wrapper in AntD, not the native input */
          }

          .global-search-input .ant-input,
          .global-search-input input {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .global-search-input .ant-input:focus,
          .global-search-input input:focus {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .global-search-input .ant-input::placeholder,
          .global-search-input input::placeholder {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        `}
      </style>
      {modal}
    </div>
  </Draggable>
)

type SearchRowProps = {
  entry: MenuSearchResult
  idx: number
  isActive: boolean
  isDark: boolean
  token: ReturnType<typeof theme.useToken>['token']
  setActiveIndex: (idx: number) => void
  onSelect: (entry: MenuSearchResult) => void
}

const SearchRow: React.FC<SearchRowProps> = ({ entry, idx, isActive, isDark, token, setActiveIndex, onSelect }) => {
  const item = entry.item

  const activeBg = isDark ? '#111b26' : '#e6f7ff'
  const rowBackground = isActive ? activeBg : 'transparent'

  let avatarBg = isDark ? '#333' : '#f0f0f0'
  if (isActive) avatarBg = token.colorPrimary

  let avatarColor = isDark ? '#aaa' : '#666'
  if (isActive) avatarColor = '#fff'

  return (
    <button
      key={item.key}
      type="button"
      onMouseEnter={() => setActiveIndex(idx)}
      onFocus={() => setActiveIndex(idx)}
      onClick={() => onSelect(entry)}
      style={{
        display: 'flex',
        width: '100%',
        textAlign: 'left',
        alignItems: 'center',
        padding: '12px 16px',
        marginBottom: 4,
        borderRadius: 8,
        background: rowBackground,
        cursor: 'pointer',
        transition: 'background 0.2s',
        border: 'none',
        outline: 'none',
      }}
    >
      {item.icon && (
        <Avatar
          shape="square"
          size={28}
          icon={item.icon}
          style={{
            marginRight: 16,
            backgroundColor: avatarBg,
            color: avatarColor,
          }}
        />
      )}
      <div style={{ flex: 1 }}>{renderEntryContent(entry, isDark)}</div>
      <span
        style={{
          color: isDark ? '#555' : '#ccc',
          marginLeft: 12,
          fontSize: 12,
        }}
      >
        {item.key}
      </span>
      {isActive && (
        <AnimatedIcon variant="spin" mode="hover">
          <EnterOutlined style={{ color: isDark ? '#666' : '#999', marginLeft: 12 }} />
        </AnimatedIcon>
      )}
    </button>
  )
}

const useDebouncedTrimmedValue = (value: string, delayMs: number) => {
  const [debounced, setDebounced] = useState(() => value.trim())

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value.trim()), delayMs)
    return () => clearTimeout(t)
  }, [value, delayMs])

  return debounced
}

const useResetOnOpen = (
  open: boolean,
  setInputValue: (v: string) => void,
  setActiveIndex: (n: number) => void,
  inputRef: React.RefObject<InputRef | null>
) => {
  useEffect(() => {
    if (!open) return
    setInputValue('')
    setActiveIndex(-1)
    requestAnimationFrame(() => setTimeout(() => inputRef.current?.focus?.(), 50))
  }, [open, setInputValue, setActiveIndex, inputRef])
}

const useClampActiveIndex = (
  keyword: string,
  resultsLength: number,
  recentLength: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    const len = keyword ? resultsLength : recentLength
    if (len <= 0) {
      setActiveIndex(-1)
      return
    }
    setActiveIndex((idx) => (idx < 0 ? 0 : Math.min(idx, len - 1)))
  }, [keyword, resultsLength, recentLength, setActiveIndex])
}

const useScrollActiveIntoView = (activeIndex: number, listRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (activeIndex < 0) return
    const container = listRef.current
    if (!container) return
    const activeElement = container.children.item(activeIndex) as HTMLElement | null
    activeElement?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, listRef])
}

const useRecentMenuEntries = (allItems: MenuSearchResult[]) => {
  const [recentStored, setRecentStored] = useState<StoredRecent[]>(() => readRecentFromStorage())
  const recentEntries = React.useMemo(() => buildRecentEntries(recentStored, allItems), [recentStored, allItems])

  const pushRecentItem = React.useCallback((item: MenuSearchResult) => {
    try {
      const s: StoredRecent = {
        key: item.item.key,
        label: item.item.label || '',
        path: item.item.path || item.item.key,
        i18nKey: item.item.i18nKey || '',
        pinyin: item.item.pinyin || '',
      }

      setRecentStored((prev) => {
        const next = [s, ...prev.filter((r) => r.key !== s.key)].slice(0, 10)
        persistRecentToStorage(next)
        return next
      })
    } catch (e) {
      devWarn('[GlobalSearch] Failed to update recent items', e)
    }
  }, [])

  return { recentEntries, pushRecentItem }
}

const useDraggableBounds = () => {
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const dragRef = useRef<HTMLDivElement>(null)

  const onStart = React.useCallback((_: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = dragRef.current?.getBoundingClientRect()
    if (!targetRect) return

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }, [])

  return { bounds, dragRef, onStart }
}

const useSearchKeyDown = (
  keyword: string,
  results: MenuSearchResult[],
  recentEntries: MenuSearchResult[],
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  onSelect: (entry: MenuSearchResult) => void,
  onClose: () => void
) => {
  return React.useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const list = keyword ? results : recentEntries

      switch (e.key) {
        case 'ArrowDown': {
          if (list.length === 0) return
          setActiveIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, list.length - 1)))
          e.preventDefault()
          break
        }
        case 'ArrowUp': {
          if (list.length === 0) return
          setActiveIndex((prev) => (prev <= 0 ? 0 : Math.max(prev - 1, 0)))
          e.preventDefault()
          break
        }
        case 'Enter': {
          const activeEntry = list[activeIndex]
          if (activeIndex >= 0 && activeEntry) onSelect(activeEntry)
          break
        }
        case 'Escape': {
          onClose()
          break
        }
        default:
          break
      }
    },
    [keyword, results, recentEntries, activeIndex, setActiveIndex, onSelect, onClose]
  )
}

type SearchPalette = {
  modalBg: string
  headerBorder: string
  titleColor: string
  iconBtnColor: string
  inputPrefixColor: string
  inputBg: string
  inputBorder: string
  inputText: string | undefined
  listEmptyText: string
  keyText: string
  enterIcon: string
  footerBg: string
  footerText: string
  footerBorder: string
  escBorder: string
  maskBg: string
}

const getSearchPalette = (isDark: boolean): SearchPalette => ({
  modalBg: isDark ? '#1f1f1f' : '#fff',
  headerBorder: isDark ? '#303030' : '#f0f0f0',
  titleColor: isDark ? '#eee' : '#333',
  iconBtnColor: isDark ? '#aaa' : '#666',
  inputPrefixColor: isDark ? '#666' : '#bbb',
  inputBg: isDark ? '#141414' : '#fff',
  inputBorder: isDark ? '#424242' : '#d9d9d9',
  inputText: isDark ? '#eee' : undefined,
  listEmptyText: isDark ? '#666' : '#999',
  keyText: isDark ? '#555' : '#ccc',
  enterIcon: isDark ? '#666' : '#999',
  footerBg: isDark ? '#1f1f1f' : '#fafafa',
  footerText: isDark ? '#666' : '#999',
  footerBorder: isDark ? '#303030' : '#f0f0f0',
  escBorder: isDark ? '#444' : '#ddd',
  maskBg: 'rgba(0,0,0,0.45)',
})

type GlobalSearchViewProps = {
  open: boolean
  onClose: () => void
  inputValue: string
  setInputValue: (v: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<InputRef | null>
  listRef: React.RefObject<HTMLDivElement | null>
  listToRender: MenuSearchResult[]
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  onSelectEntry: (entry: MenuSearchResult) => void
  isFullscreen: boolean
  toggleFullscreen: () => void
  isDark: boolean
  palette: SearchPalette
  token: ReturnType<typeof theme.useToken>['token']
  modalRender: (node: React.ReactNode) => React.ReactNode
}

const GlobalSearchView: React.FC<GlobalSearchViewProps> = ({
  open,
  onClose,
  inputValue,
  setInputValue,
  onKeyDown,
  inputRef,
  listRef,
  listToRender,
  activeIndex,
  setActiveIndex,
  onSelectEntry,
  isFullscreen,
  toggleFullscreen,
  isDark,
  palette,
  token,
  modalRender,
}) => {
  const modalWidth = isFullscreen ? '100%' : 600
  const modalStyle = isFullscreen
    ? { top: 0, margin: 0, maxWidth: '100vw', padding: 0, height: '100vh' }
    : { top: 80, paddingBottom: 0 }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={modalWidth}
      title={null}
      closable={false}
      destroyOnHidden
      className="fix-ant-modal"
      modalRender={modalRender}
      styles={{
        body: {
          padding: 0,
          height: isFullscreen ? '100vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: palette.modalBg,
        },
        mask: { background: palette.maskBg },
      }}
      style={modalStyle}
    >
      <div
        className="draggable-handle"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: `1px solid ${palette.headerBorder}`,
          flexShrink: 0,
          cursor: isFullscreen ? 'default' : 'move',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: palette.titleColor }}>菜单搜索</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button
            type="button"
            onClick={toggleFullscreen}
            style={{
              cursor: 'pointer',
              color: palette.iconBtnColor,
              fontSize: 16,
              transition: 'color 0.2s',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
            title={isFullscreen ? '退出全屏' : '全屏'}
          >
            {isFullscreen ? (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenExitOutlined />
              </AnimatedIcon>
            ) : (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenOutlined />
              </AnimatedIcon>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              cursor: 'pointer',
              color: palette.iconBtnColor,
              fontSize: 16,
              transition: 'color 0.2s',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
            title="关闭"
          >
            <AnimatedIcon variant="spin" mode="hover">
              <CloseOutlined />
            </AnimatedIcon>
          </button>
        </div>
      </div>
      <div style={{ padding: '16px 24px', flexShrink: 0 }}>
        <Input
          ref={inputRef}
          prefix={
            <AnimatedIcon variant="spin" mode="hover">
              <SearchOutlined style={{ color: palette.inputPrefixColor }} />
            </AnimatedIcon>
          }
          placeholder="请输入...（支持中文、拼音及英文）"
          title="请输入...（支持中文、拼音及英文）"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          allowClear
          autoFocus
          size="large"
          className="global-search-input"
          style={{
            backgroundColor: palette.inputBg,
            borderColor: palette.inputBorder,
            color: palette.inputText,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          marginTop: 0,
          padding: '0 12px',
          maxHeight: isFullscreen ? undefined : 280,
        }}
      >
        {listToRender.length === 0 ? (
          <div
            style={{
              padding: '32px 0',
              textAlign: 'center',
              color: palette.listEmptyText,
            }}
          >
            无匹配菜单
          </div>
        ) : (
          listToRender.map((entry, idx) => (
            <SearchRow
              key={entry.item.key}
              entry={entry}
              idx={idx}
              isActive={idx === activeIndex}
              isDark={isDark}
              token={token}
              setActiveIndex={setActiveIndex}
              onSelect={onSelectEntry}
            />
          ))
        )}
      </div>
      <div
        style={{
          padding: '12px 24px',
          color: palette.footerText,
          fontSize: 12,
          borderTop: `1px solid ${palette.footerBorder}`,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 16,
          backgroundColor: palette.footerBg,
          flexShrink: 0,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowUpOutlined style={{ fontSize: 10 }} />
          </AnimatedIcon>
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowDownOutlined style={{ fontSize: 10 }} />
          </AnimatedIcon>{' '}
          导航
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <AnimatedIcon variant="spin" mode="hover">
            <EnterOutlined style={{ fontSize: 10, color: palette.enterIcon }} />
          </AnimatedIcon>{' '}
          选择
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontSize: 10,
              border: `1px solid ${palette.escBorder}`,
              borderRadius: 3,
              padding: '0 4px',
              lineHeight: '14px',
            }}
          >
            ESC
          </span>{' '}
          关闭
        </span>
      </div>
    </Modal>
  )
}

function highlightWithIndices(text: string, indices?: Array<[number, number]>, isDark: boolean = false) {
  if (!indices || indices.length === 0) return <>{text}</>
  const parts: React.ReactNode[] = []
  let last = 0
  indices.forEach(([s, e], i) => {
    if (s > last) parts.push(<span key={`t-${i}-${last}`}>{text.slice(last, s)}</span>)
    parts.push(
      <span
        key={`h-${i}-${s}`}
        style={{
          background: isDark ? 'rgba(250, 230, 140, 0.4)' : 'rgba(250, 230, 140, 0.9)',
          color: isDark ? '#fff' : '#000',
          padding: '0 2px',
          borderRadius: 2,
          fontWeight: 500,
        }}
      >
        {text.slice(s, e + 1)}
      </span>
    )
    last = e + 1
  })
  if (last < text.length) parts.push(<span key={`t-last`}>{text.slice(last)}</span>)
  return <>{parts}</>
}

const GlobalSearchNew: React.FC<GlobalSearchProps> = ({ open, onClose, onNavigate }) => {
  const [inputValue, setInputValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { redirectTo } = useSafeNavigate()
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'
  const { token } = theme.useToken()

  const keyword = useDebouncedTrimmedValue(inputValue, 150)

  const results = useMenuSearch(keyword, 100, true)
  const allItems = useMenuSearch('', 2000, false)

  const { recentEntries, pushRecentItem } = useRecentMenuEntries(allItems)

  const { bounds, dragRef, onStart } = useDraggableBounds()

  const palette = React.useMemo(() => getSearchPalette(isDark), [isDark])

  useResetOnOpen(open, setInputValue, setActiveIndex, inputRef)
  useClampActiveIndex(keyword, results.length, recentEntries.length, setActiveIndex)
  useScrollActiveIntoView(activeIndex, listRef)

  const navigate = onNavigate ?? redirectTo

  const handleSelectEntry = React.useCallback(
    (entry: MenuSearchResult) => {
      const path = entry.item.path || entry.item.key
      pushRecentItem(entry)
      navigate(path)
      onClose()
    },
    [pushRecentItem, navigate, onClose]
  )

  const handleKeyDown = useSearchKeyDown(
    keyword,
    results,
    recentEntries,
    activeIndex,
    setActiveIndex,
    handleSelectEntry,
    onClose
  )

  const listToRender = React.useMemo(
    () => (keyword ? results : recentEntries).slice(0, 50),
    [keyword, results, recentEntries]
  )

  const modalRender = React.useCallback(
    (modal: React.ReactNode) => (
      <DraggableModalRender
        modal={modal}
        isFullscreen={isFullscreen}
        bounds={bounds}
        dragRef={dragRef}
        onStart={onStart}
      />
    ),
    [isFullscreen, bounds, onStart, dragRef]
  )

  return (
    <GlobalSearchView
      open={open}
      onClose={onClose}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
      listRef={listRef}
      listToRender={listToRender}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      onSelectEntry={handleSelectEntry}
      isFullscreen={isFullscreen}
      toggleFullscreen={() => setIsFullscreen((v) => !v)}
      isDark={isDark}
      palette={palette}
      token={token}
      modalRender={modalRender}
    />
  )
}

export default GlobalSearchNew
