import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Modal, Input, Avatar, InputRef, theme } from 'antd'
import Draggable from 'react-draggable'
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
  const [keyword, setKeyword] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const dragRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<InputRef>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { redirectTo } = useSafeNavigate()
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'
  const { token } = theme.useToken()

  const results = useMenuSearch(keyword, 100, true) as MenuSearchResult[]
  const allItems = useMenuSearch('', 2000, false) as MenuSearchResult[]

  // 为了兼容历史数据与避免序列化 React 节点，我们在 localStorage 中保存可序列化的路由摘要对象
  type StoredRecent = { key: string; label?: string; path?: string; i18nKey?: string; pinyin?: string }

  const [recentStored, setRecentStored] = useState<StoredRecent[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      // 兼容旧数据：如果是字符串数组则把每个字符串转换为对象 { key }
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
        return parsed.map((k: string) => ({ key: k }))
      }
      if (Array.isArray(parsed)) return parsed as StoredRecent[]
      return []
    } catch (e) {
      return []
    }
  })

  // recentEntries 优先从菜单项完整数据中取回，否则使用存储的摘要构建临时项
  const recentEntries: MenuSearchResult[] = recentStored
    .map((s) => {
      const found = allItems.find((a) => a.item.key === s.key)
      if (found) return found as MenuSearchResult
      // 回退构建一个最小的 MenuSearchResult（不包含复杂的 React 节点）
      return {
        item: {
          key: s.key,
          label: s.label || s.key,
          path: s.path || s.key,
          i18nKey: s.i18nKey,
          pinyin: s.pinyin,
        } as any,
      } as MenuSearchResult
    })
    .filter(Boolean) as MenuSearchResult[]

  const pushRecentItem = (item: MenuSearchResult) => {
    try {
      const s: StoredRecent = {
        key: item.item.key,
        label: item.item.label || '',
        path: item.item.path || item.item.key,
        i18nKey: item.item.i18nKey || '',
        pinyin: item.item.pinyin || '',
      }
      const next = [s, ...recentStored.filter((r) => r.key !== s.key)].slice(0, 10)
      setRecentStored(next)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    if (open) {
      setInputValue('')
      setKeyword('')
      setActiveIndex(-1)
      requestAnimationFrame(() => setTimeout(() => inputRef.current?.focus?.(), 50))
    }
  }, [open])

  useEffect(() => {
    const t = setTimeout(() => setKeyword(inputValue.trim()), 150)
    return () => clearTimeout(t)
  }, [inputValue])

  useEffect(() => {
    const list = keyword ? results : recentEntries
    if (!list || list.length === 0) setActiveIndex(-1)
    else setActiveIndex((idx) => (idx < 0 ? 0 : Math.min(idx, list.length - 1)))
  }, [results, recentEntries, keyword])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const container = listRef.current
      const activeElement = container.children[activeIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  const onStart = (_event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = dragRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }

  const handleSelectEntry = (entry: MenuSearchResult) => {
    const path = entry.item.path || entry.item.key
    pushRecentItem(entry)
    if (onNavigate) onNavigate(path)
    else redirectTo(path)
    onClose()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const list = keyword ? results : recentEntries
    if (e.key === 'ArrowDown') {
      if (!list || list.length === 0) return
      setActiveIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, list.length - 1)))
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      if (!list || list.length === 0) return
      setActiveIndex((prev) => (prev <= 0 ? 0 : Math.max(prev - 1, 0)))
      e.preventDefault()
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && list && list[activeIndex]) handleSelectEntry(list[activeIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const listToRender = (keyword ? results : recentEntries).slice(0, 50)

  const renderItemContent = (entry: MenuSearchResult) => {
    const item = entry.item
    const matches = (entry as any).matches || []
    const labelMatch = matches.find((m: any) => m.key === 'label')
    const i18nMatch = matches.find((m: any) => m.key === 'i18nKey' || m.key === 'i18n')
    const pinyinMatch = matches.find((m: any) => m.key === 'pinyin')

    const labelEl = labelMatch ? highlightWithIndices(item.label, labelMatch.indices as any, isDark) : <>{item.label}</>

    let subEl: React.ReactNode = null
    if (!labelMatch) {
      if (i18nMatch) {
        subEl = (
          <div style={{ color: isDark ? '#888' : '#999', fontSize: 12, marginTop: 4 }}>
            {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices as any, isDark)}
          </div>
        )
      } else if (pinyinMatch) {
        subEl = (
          <div style={{ color: isDark ? '#888' : '#999', fontSize: 12, marginTop: 4 }}>
            {highlightWithIndices(pinyinMatch.value || item.pinyin || '', pinyinMatch.indices as any, isDark)}
          </div>
        )
      }
    } else if (i18nMatch) {
      subEl = (
        <div style={{ color: isDark ? '#888' : '#999', fontSize: 12, marginTop: 4 }}>
          {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices as any, isDark)}
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

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={isFullscreen ? '100%' : 600}
      title={null}
      closable={false}
      destroyOnHidden
      className="fix-ant-modal"
      modalRender={(modal) => (
        <Draggable
          disabled={isFullscreen}
          bounds={bounds}
          handle=".draggable-handle"
          nodeRef={dragRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={dragRef} style={{ pointerEvents: 'auto' }}>
            <style>
              {`
            .fix-ant-modal .wui-ant-modal-container {
              padding: 0 !important;
              overflow: hidden;
            }
            `}
            </style>
            {modal}
          </div>
        </Draggable>
      )}
      styles={{
        body: {
          padding: 0,
          height: isFullscreen ? '100vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: isDark ? '#1f1f1f' : '#fff',
        },
        mask: { background: 'rgba(0,0,0,0.45)' },
      }}
      style={
        isFullscreen
          ? { top: 0, margin: 0, maxWidth: '100vw', padding: 0, height: '100vh' }
          : { top: 80, paddingBottom: 0 }
      }
    >
      {/* Header */}
      <div
        className="draggable-handle"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
          flexShrink: 0,
          cursor: isFullscreen ? 'default' : 'move',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: isDark ? '#eee' : '#333' }}>菜单搜索</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              cursor: 'pointer',
              color: isDark ? '#aaa' : '#666',
              fontSize: 16,
              transition: 'color 0.2s',
            }}
            title={isFullscreen ? '退出全屏' : '全屏'}
          >
            {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </span>
          <span
            onClick={onClose}
            style={{
              cursor: 'pointer',
              color: isDark ? '#aaa' : '#666',
              fontSize: 16,
              transition: 'color 0.2s',
            }}
            title="关闭"
          >
            <CloseOutlined />
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 24px', flexShrink: 0 }}>
        <Input
          ref={inputRef}
          prefix={<SearchOutlined style={{ color: isDark ? '#666' : '#bbb' }} />}
          placeholder="输入关键字搜索菜单（支持拼音/英文）"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          allowClear
          autoFocus
          size="large"
          style={{
            backgroundColor: isDark ? '#141414' : '#fff',
            borderColor: isDark ? '#424242' : '#d9d9d9',
            color: isDark ? '#eee' : undefined,
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
          <div style={{ padding: '32px 0', textAlign: 'center', color: isDark ? '#666' : '#999' }}>无匹配菜单</div>
        ) : (
          listToRender.map((entry, idx) => {
            const item = entry.item
            const isActive = idx === activeIndex
            return (
              <div
                key={item.key}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleSelectEntry(entry)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') handleSelectEntry(entry)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  marginBottom: 4,
                  borderRadius: 8,
                  background: isActive ? (isDark ? '#111b26' : '#e6f7ff') : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {item.icon && (
                  <Avatar
                    shape="square"
                    size={28}
                    icon={item.icon}
                    style={{
                      marginRight: 16,
                      backgroundColor: isActive ? token.colorPrimary : isDark ? '#333' : '#f0f0f0',
                      color: isActive ? '#fff' : isDark ? '#aaa' : '#666',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>{renderItemContent(entry)}</div>
                <span style={{ color: isDark ? '#555' : '#ccc', marginLeft: 12, fontSize: 12 }}>{item.key}</span>
                {isActive && <EnterOutlined style={{ color: isDark ? '#666' : '#999', marginLeft: 12 }} />}
              </div>
            )
          })
        )}
      </div>
      <div
        style={{
          padding: '12px 24px',
          color: isDark ? '#666' : '#999',
          fontSize: 12,
          borderTop: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 16,
          backgroundColor: isDark ? '#1f1f1f' : '#fafafa',
          flexShrink: 0,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ArrowUpOutlined style={{ fontSize: 10 }} />
          <ArrowDownOutlined style={{ fontSize: 10 }} /> 导航
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <EnterOutlined style={{ fontSize: 10 }} /> 选择
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontSize: 10,
              border: `1px solid ${isDark ? '#444' : '#ddd'}`,
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

export default GlobalSearchNew
