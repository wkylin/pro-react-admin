import React, { useMemo } from 'react'
import Fuse from 'fuse.js'
import { pinyin } from 'pinyin-pro'
import { mainLayoutMenu } from '../config/menu.config'

export interface MenuItem {
  label: string
  key: string
  icon?: React.ReactNode
  i18nKey?: string
  path?: string
  parentKeys?: string[]
  pinyin?: string
  children?: MenuItem[]
}

// 递归扁平化菜单，并为每项生成拼音
function flattenMenu(menu: MenuItem[], parentKeys: string[] = []): MenuItem[] {
  return menu.flatMap((item) => {
    const pinyinLabel = pinyin(item.label, { toneType: 'none', type: 'array' }).join(' ').toLowerCase()
    const flatItem = {
      ...item,
      parentKeys,
      pinyin: pinyinLabel,
      // 规范化 path 字段：优先使用 item.path，否则回退到 item.key（menu.config 中 key 通常就是路径）
      path: (item as any).path || item.key,
    }
    if (item.children) {
      return [flatItem, ...flattenMenu(item.children, [...parentKeys, item.key])]
    }
    return [flatItem]
  })
}

const menuList = flattenMenu(mainLayoutMenu)

const fuse = new Fuse(menuList, {
  // Ensure English (and pinyin strings) match case-insensitively.
  isCaseSensitive: false,
  keys: [
    { name: 'label', weight: 0.7 },
    { name: 'pinyin', weight: 0.6 },
    { name: 'i18nKey', weight: 0.5 },
    { name: 'key', weight: 0.3 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: true,
})

export const DEFAULT_MAX_RESULTS = 50

export type FuseMatch = {
  indices: Array<[number, number]>
  key: string
  value: string
}

export type MenuSearchResult = {
  item: MenuItem
  matches?: FuseMatch[]
  score?: number
}

/**
 * useMenuSearch
 * @param keyword 搜索关键字
 * @param maxResults 最多返回数量
 * @param includeMatches 是否返回匹配信息（用于高亮）
 */
export function useMenuSearch(
  keyword: string,
  maxResults: number = DEFAULT_MAX_RESULTS,
  includeMatches: boolean = false
) {
  return useMemo(() => {
    if (!keyword) {
      // 保证返回的始终是 MenuSearchResult 结构，便于调用方一致读取 `.item`
      return menuList.slice(0, maxResults).map((it) => ({ item: it })) as MenuSearchResult[]
    }
    const res = fuse.search(keyword, { limit: maxResults })
    if (includeMatches) {
      return res.map((r) => ({
        item: r.item,
        matches: r.matches as any,
        score: (r as any).score,
      })) as MenuSearchResult[]
    }
    return res.map((r) => ({ item: r.item })) as MenuSearchResult[]
  }, [keyword, maxResults, includeMatches])
}
