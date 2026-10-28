import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react'
import { Input, Tree } from 'antd'
import type { TreeProps } from 'antd/es/tree'
import Loading from '../Loading'
import {
  getDefaultKey,
  loopTreeDataWithSearch,
  makeTree,
  _getParentKey,
  type TreeDisplayNode,
  type TreeKey,
  type TreeListItem,
  type TreeListNode,
} from './utils'
import styles from './index.module.less'

const { Search } = Input
const EMPTY_PARAMS: Record<string, unknown> = {}
export type { TreeListItem, TreeListNode, TreeDisplayNode, TreeKey, DefaultTreeKeys } from './utils'

type TreeSelectHandler = NonNullable<TreeProps<TreeDisplayNode>['onSelect']>
type TreeExpandHandler = NonNullable<TreeProps<TreeDisplayNode>['onExpand']>
export type TreeSelectInfo = Parameters<TreeSelectHandler>[1]

export interface TreeListResponse {
  status: number
  data: TreeListItem[]
}

export interface TreeListProps {
  getTreeList: (params: Record<string, unknown>, signal: AbortSignal) => Promise<TreeListResponse>
  onError?: (error: unknown) => void
  searchLabel?: string
  search?: boolean
  selectedKeys?: TreeKey[]
  setSelectedKeys: (keys: TreeKey[], info?: TreeSelectInfo) => void
  selectable?: boolean
  params?: Record<string, unknown>
}

export interface TreeListRef {
  reset: () => void
  updateTree: () => void
  getTreeListData: (type?: unknown) => void
  expandedKeys: TreeKey[]
  setExpandedKeys: (keys: TreeKey[]) => void
  setSelectedKeys: (keys: TreeKey[]) => void
  treeData: TreeListNode[]
}

const Index = forwardRef<TreeListRef, TreeListProps>(
  (
    {
      getTreeList,
      search = false,
      selectedKeys,
      setSelectedKeys,
      selectable = false,
      params = EMPTY_PARAMS,
      onError,
      searchLabel = 'Search',
    },
    ref
  ) => {
    const [treeList, setTreeList] = useState<TreeListItem[]>([])
    const [treeData, setTreeData] = useState<TreeListNode[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [expandedKeys, setExpandedKeys] = useState<TreeKey[]>([])
    const [fixSelectedKeys, setFixSelectedKeys] = useState<TreeKey[]>(selectedKeys ?? [])

    const toggleExpandedKey = (expandedKey: TreeKey) => {
      setExpandedKeys((currentKeys) =>
        currentKeys.includes(expandedKey)
          ? currentKeys.filter((key) => key !== expandedKey && !key.startsWith(`${expandedKey}.`))
          : [...currentKeys, expandedKey]
      )
    }

    const handleExpand: TreeExpandHandler = (_, info) => {
      toggleExpandedKey(info.node.key)
    }

    const onSearch = (value: string) => {
      if (value === searchValue) {
        return
      }

      if (!value) {
        const { expanded } = getDefaultKey(treeData)
        setExpandedKeys(expanded)
        setSearchValue(value)
        return
      }

      const keys = treeList
        .map((item) => (item.name.includes(value) ? _getParentKey(item.id, treeData) : undefined))
        .filter((key, index, values): key is TreeKey => key !== undefined && values.indexOf(key) === index)
      setSearchValue(value)
      setExpandedKeys(keys)
    }

    const selectTreeKeys = (keys: TreeKey[], info?: TreeSelectInfo) => {
      if (!keys.length) {
        return
      }
      if (selectable || !info || !info.node.children?.length) {
        setSelectedKeys(keys, info)
        setFixSelectedKeys(keys)
        return
      }
      toggleExpandedKey(info.node.key)
    }

    const onSelect: TreeSelectHandler = (keys, info) => {
      selectTreeKeys(
        keys.filter((key): key is TreeKey => typeof key === 'string'),
        info
      )
    }

    const reset = () => {
      const defaults =
        selectable && treeData.length
          ? { selected: [treeData[0].key], expanded: [treeData[0].key] }
          : getDefaultKey(treeData)
      setFixSelectedKeys(defaults.selected)
      selectTreeKeys(defaults.selected)
      setExpandedKeys(defaults.expanded)
    }

    const activeRequest = useRef<AbortController | null>(null)
    const getTreeListData = (type?: unknown) => {
      activeRequest.current?.abort()
      const controller = new AbortController()
      activeRequest.current = controller
      setLoading(true)
      void Promise.resolve()
        .then(() => getTreeList(params, controller.signal))
        .then((resp) => {
          if (controller.signal.aborted) return
          if (resp.status !== 1) throw new Error('Tree request failed')
          const setPath = (nodes: TreeListNode[], path?: TreeKey): TreeListNode[] =>
            nodes.map((item) => {
              const key = path ? `${path}.${item.id}` : item.id
              return { ...item, key, ...(item.children?.length ? { children: setPath(item.children, key) } : {}) }
            })
          const tree = setPath(makeTree(resp.data))
          setTreeList(resp.data)
          setTreeData(tree)
          if (!type) {
            let defaults =
              selectable && tree.length ? { selected: [tree[0].key], expanded: [tree[0].key] } : getDefaultKey(tree)
            const findSelected = (nodes: TreeListNode[]): TreeListNode | undefined => {
              for (const node of nodes) {
                if (selectedKeys?.includes(node.realId ?? node.id) || selectedKeys?.includes(node.key)) return node
                const found = findSelected(node.children ?? [])
                if (found) return found
              }
            }
            const selected = findSelected(tree)
            if (selected) defaults = { selected: [selected.key], expanded: [selected.key] }
            setFixSelectedKeys(defaults.selected)
            selectTreeKeys(defaults.selected)
            setExpandedKeys(defaults.expanded)
          }
        })
        .catch((error) => {
          if (!controller.signal.aborted) onError?.(error)
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false)
        })
    }
    const updateTree = () => getTreeListData()
    const loader = useRef(getTreeListData)
    loader.current = getTreeListData
    useEffect(() => {
      loader.current()
      return () => activeRequest.current?.abort()
    }, [getTreeList, params])

    useImperativeHandle(ref, () => ({
      reset,
      updateTree,
      getTreeListData,
      expandedKeys,
      setExpandedKeys,
      setSelectedKeys: setFixSelectedKeys,
      treeData,
    }))

    return (
      <div className={`${styles.treeList} treeList`}>
        <div>
          {search && (
            <Search
              placeholder={searchLabel}
              aria-label={searchLabel}
              onSearch={onSearch}
              style={{ marginBottom: 10, width: '100%' }}
              allowClear
            />
          )}
          <Tree<TreeDisplayNode>
            selectedKeys={selectedKeys ?? fixSelectedKeys}
            expandedKeys={expandedKeys}
            autoExpandParent
            onExpand={handleExpand}
            onSelect={onSelect}
            treeData={loopTreeDataWithSearch(treeData, searchValue)}
          />
        </div>
        {loading ? <Loading /> : null}
      </div>
    )
  }
)

export default Index
