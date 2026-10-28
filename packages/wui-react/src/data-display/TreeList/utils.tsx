import type { ReactNode } from 'react'
import type { BasicDataNode } from 'antd/es/tree'

export type TreeKey = string

export interface TreeListItem {
  id: TreeKey
  pid: TreeKey | null
  name: string
  realId?: TreeKey
}

export interface TreeListNode extends TreeListItem {
  key: TreeKey
  title: string
  children?: TreeListNode[]
}

export interface TreeDisplayNode extends BasicDataNode {
  key: TreeKey
  title: ReactNode
  pid: TreeKey | null
  children?: TreeDisplayNode[]
}

export interface DefaultTreeKeys {
  selected: TreeKey[]
  expanded: TreeKey[]
}

export function getDefaultKey(treeData: TreeListNode[]): DefaultTreeKeys {
  let selected: TreeKey[] = []
  let expanded: TreeKey[] = []

  function findFirstLeaf(data: TreeListNode[], parentKey?: TreeKey): boolean {
    return data.some((item) => {
      if (item.children?.length) {
        return findFirstLeaf(item.children, item.key)
      }

      selected = [item.key]
      expanded = parentKey ? [parentKey] : []
      return true
    })
  }

  findFirstLeaf(treeData)
  return { selected, expanded }
}

export function processTreeData(list: TreeListItem[], pid: TreeKey | null): TreeListNode[] {
  return list
    .filter((item) => item.pid === pid)
    .map((item) => ({
      ...item,
      key: item.id,
      title: item.name,
      children: processTreeData(list, item.id),
    }))
}

export const loopTreeData = (data: TreeListNode[]): TreeDisplayNode[] =>
  data.map((item) => ({
    title: <span>{item.title}</span>,
    key: item.key,
    pid: item.pid,
    ...(item.children?.length ? { children: loopTreeData(item.children) } : {}),
  }))

export function expandTree(
  expandedKeys: TreeKey[],
  info: { expanded: boolean; node: TreeListNode },
  setExpandedKeys: (keys: TreeKey[]) => void
): void {
  if (info.expanded) {
    if (expandedKeys.length > 0) {
      expandedKeys.splice(0, expandedKeys.length - 1)
    }
    setExpandedKeys(expandedKeys)
    return
  }

  const childKeys = (info.node.children ?? [])
    .map((child) => {
      const index = expandedKeys.indexOf(child.key)
      if (index > -1) {
        expandedKeys.splice(index, 1)
        return child.key
      }
      return ''
    })
    .filter((key): key is TreeKey => key !== '')
  const index = expandedKeys.indexOf(childKeys[0])
  if (index > 0) {
    expandedKeys.splice(0, index + 1)
  }
  setExpandedKeys(expandedKeys)
}

export const loopTreeDataWithSearch = (data: TreeListNode[], searchValue: string): TreeDisplayNode[] =>
  data.map((item) => {
    const index = item.title.indexOf(searchValue)
    const beforeStr = item.title.slice(0, index)
    const afterStr = item.title.slice(index + searchValue.length)
    const title =
      index > -1 ? (
        <span>
          {beforeStr} <span style={{ color: '#D12604' }}>{searchValue}</span> {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      )

    return {
      title,
      key: item.key,
      pid: item.pid,
      ...(item.children?.length ? { children: loopTreeDataWithSearch(item.children, searchValue) } : {}),
    }
  })

export const getParentKey = (key: TreeKey, tree: TreeListNode[]): TreeKey | undefined => {
  for (const node of tree) {
    if (node.children?.some((item) => item.key === key)) {
      return node.key
    }

    const parentKey = node.children ? getParentKey(key, node.children) : undefined
    if (parentKey) {
      return parentKey
    }
  }
  return undefined
}

export const _getParentKey = (key: TreeKey, tree: TreeListNode[]): TreeKey | undefined => {
  for (const node of tree) {
    if (node.children?.some((item) => item.key.split('.').pop() === key)) {
      return node.key
    }

    const parentKey = node.children ? _getParentKey(key, node.children) : undefined
    if (parentKey) {
      return parentKey
    }
  }
  return undefined
}

export const makeTree = (list: TreeListItem[], idField: 'id' = 'id', pidField: 'pid' = 'pid'): TreeListNode[] => {
  const nodes = new Map<TreeKey, TreeListNode>()
  const roots: TreeListNode[] = []

  list.forEach((item) => {
    nodes.set(item[idField], {
      ...item,
      key: item.id,
      title: item.name,
    })
  })

  list.forEach((item) => {
    const node = nodes.get(item[idField])
    if (!node) {
      return
    }

    const parent = item[pidField] ? nodes.get(item[pidField]) : undefined
    if (parent) {
      node.key = `${parent.id}.${node.id}`
      parent.children = [...(parent.children ?? []), node]
    } else {
      roots.push(node)
    }
  })

  return roots
}

export const isEmpty = (value: unknown): boolean => {
  if (value == null) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}
