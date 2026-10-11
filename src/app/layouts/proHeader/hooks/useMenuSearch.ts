import React, { useMemo } from 'react'
import Fuse from 'fuse.js'
import { pinyin } from 'pinyin-pro'
import { createMenuIcon } from '@layouts/navigation/menu.config'
import { useNavigation } from '@layouts/navigation/useNavigation'
import { useTranslation } from 'react-i18next'
import type { NavigationItem } from '@platform/navigation/menu'

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

function flattenMenu(
  menu: NavigationItem[],
  translate: (key: string, fallback: string) => string,
  parentKeys: string[] = []
): MenuItem[] {
  return menu.flatMap((item) => {
    const label = item.i18nKey ? translate(item.i18nKey, item.label) : item.label
    if (item.children?.length) return flattenMenu(item.children, translate, [...parentKeys, item.key])
    return [
      {
        ...item,
        label,
        icon: createMenuIcon(item.iconName),
        children: undefined,
        parentKeys,
        pinyin: pinyin(label, { toneType: 'none', type: 'array' }).join(' ').toLowerCase(),
      },
    ]
  })
}

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
  const navigation = useNavigation()
  const { t } = useTranslation()
  const menuList = useMemo(
    () => flattenMenu(navigation, (key, fallback) => t(key, { defaultValue: fallback })),
    [navigation, t]
  )
  const fuse = useMemo(
    () =>
      new Fuse(menuList, {
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
        includeMatches,
      }),
    [menuList, includeMatches]
  )
  return useMemo(() => {
    if (!keyword) return menuList.slice(0, maxResults).map((item) => ({ item }))
    return fuse.search(keyword, { limit: maxResults }).map((result) => ({
      item: result.item,
      score: result.score,
      ...(includeMatches
        ? {
            matches: result.matches?.map((match) => ({
              indices: [...match.indices],
              key: match.key || '',
              value: match.value || '',
            })),
          }
        : {}),
    }))
  }, [keyword, maxResults, includeMatches, menuList, fuse])
}
