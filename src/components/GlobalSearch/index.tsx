import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Modal, Input, Avatar, InputRef } from 'antd'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { useMenuSearch, MenuSearchResult } from '@src/hooks/useMenuSearch'
import { SearchOutlined } from '@ant-design/icons'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
  onNavigate?: (path: string) => void
}

const RECENT_KEY = 'global_search_recent_v1'

function highlightWithIndices(text: string, indices?: Array<[number, number]>) {
  if (!indices || indices.length === 0) return <>{text}</>
  const parts: React.ReactNode[] = []
  let last = 0
  indices.forEach(([s, e], i) => {
    if (s > last) parts.push(<span key={`t-${i}-${last}`}>{text.slice(last, s)}</span>)
    parts.push(
      <span key={`h-${i}-${s}`} style={{ background: 'rgba(250,230,140,0.9)', padding: '0 2px', borderRadius: 2 }}>
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
  const inputRef = useRef<InputRef>(null)
  const { redirectTo } = useSafeNavigate()

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

    const labelEl = labelMatch ? highlightWithIndices(item.label, labelMatch.indices as any) : <>{item.label}</>

    let subEl: React.ReactNode = null
    if (!labelMatch) {
      if (i18nMatch) {
        subEl = (
          <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
            {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices as any)}
          </div>
        )
      } else if (pinyinMatch) {
        subEl = (
          <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
            {highlightWithIndices(pinyinMatch.value || item.pinyin || '', pinyinMatch.indices as any)}
          </div>
        )
      }
    } else if (i18nMatch) {
      subEl = (
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          {highlightWithIndices(i18nMatch.value || String(item.i18nKey || ''), i18nMatch.indices as any)}
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{labelEl}</div>
        {subEl}
      </div>
    )
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={520}
      title={null}
      closable={false}
      styles={{ body: { padding: 0 }, mask: { background: 'rgba(0,0,0,0.15)' } }}
      style={{ top: 80 }}
    >
      <div style={{ padding: 24, paddingBottom: 0 }}>
        <Input
          ref={inputRef}
          prefix={<SearchOutlined />}
          placeholder="搜索菜单（支持拼音/汉字/英文）"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          allowClear
          autoFocus
        />
      </div>
      <div style={{ maxHeight: 360, overflow: 'auto', marginTop: 8 }}>
        {listToRender.length === 0 ? (
          <div style={{ padding: 16, color: '#999' }}>无匹配菜单</div>
        ) : (
          listToRender.map((entry, idx) => {
            const item = entry.item
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
                  padding: '10px 16px',
                  background: idx === activeIndex ? '#e6f7ff' : undefined,
                  cursor: 'pointer',
                }}
              >
                {item.icon && <Avatar shape="square" size={24} icon={item.icon} style={{ marginRight: 12 }} />}
                <div style={{ flex: 1 }}>{renderItemContent(entry)}</div>
                <span style={{ color: '#999', marginLeft: 8, fontSize: 12 }}>{item.key}</span>
              </div>
            )
          })
        )}
      </div>
      <div style={{ padding: '8px 24px', color: '#999', fontSize: 12 }}>
        <span>↑↓ 导航&nbsp;&nbsp;⏎ 选择&nbsp;&nbsp;ESC 关闭</span>
      </div>
    </Modal>
  )
}

export default GlobalSearchNew
