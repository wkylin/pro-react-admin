import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'
import { Input, Tree } from 'antd'
import type { TreeProps } from 'antd/es/tree'
import Loading from '@stateless/Loading'
import {
  getDefaultKey,
  isEmpty,
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

type TreeSelectHandler = NonNullable<TreeProps<TreeDisplayNode>['onSelect']>
type TreeExpandHandler = NonNullable<TreeProps<TreeDisplayNode>['onExpand']>
type TreeSelectInfo = Parameters<TreeSelectHandler>[1]

interface TreeListResponse {
  status: number
  data: TreeListItem[]
}

interface TreeListProps {
  getTreeList: (params: Record<string, unknown>) => Promise<TreeListResponse>
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
  ({ getTreeList, search = false, selectedKeys, setSelectedKeys, selectable = false, params = {} }, ref) => {
    const [treeList, setTreeList] = useState<TreeListItem[]>([])
    const [treeData, setTreeData] = useState<TreeListNode[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [expandedKeys, setExpandedKeys] = useState<TreeKey[]>([])
    const [fixSelectedKeys, setFixSelectedKeys] = useState<TreeKey[]>(selectedKeys ?? [])

    const toggleExpandedKey = (expandedKey: TreeKey) => {
      setExpandedKeys((currentKeys) =>
        currentKeys.includes(expandedKey)
          ? currentKeys.filter((key) => !key.startsWith(expandedKey))
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

    const treeInit = (resData: TreeListItem[], isReset = false) => {
      let selected: TreeKey[] = []
      let expanded: TreeKey[] = []

      try {
        if (selectedKeys?.length && !isReset) {
          resData.some((item) => item.id === selectedKeys[0])
          selected = selectedKeys

          const findSelectedNode = (nodes: TreeListNode[]): boolean =>
            nodes.some((item) => {
              if (item.realId === selectedKeys[0]) {
                expanded = [item.key]
                selected = [item.key]
                return true
              }
              return item.children?.length ? findSelectedNode(item.children) : false
            })
          findSelectedNode(treeData)
        } else {
          const defaultKey = selectable
            ? { selected: [treeData[0].key], expanded: [treeData[0].key] }
            : getDefaultKey(treeData)
          selected = defaultKey.selected
          expanded = defaultKey.expanded
        }
      } catch {
        const defaultKey = getDefaultKey(treeData)
        selected = defaultKey.selected
        expanded = defaultKey.expanded
      }

      selectTreeKeys(selected)
      setExpandedKeys(expanded)
    }

    const getTreeListData = (type?: unknown) => {
      setLoading(true)
      getTreeList(params).then((resp) => {
        if (resp.status === 1) {
          setTreeList(resp.data)

          const data = makeTree(resp.data)
          const setPath = (nodes: TreeListNode[], path?: TreeKey): TreeListNode[] =>
            nodes.map((item) => {
              const key = path ? `${path}.${item.id}` : item.id
              return {
                ...item,
                key,
                ...(item.children?.length ? { children: setPath(item.children, key) } : {}),
              }
            })
          const tree = setPath(data)
          setTreeData(tree)

          if (!type) {
            treeInit(resp.data)
            let selected: TreeKey[] = []
            let expanded: TreeKey[] = []
            try {
              if (selectedKeys?.length) {
                resp.data.some((item) => item.id === selectedKeys[0])
                selected = selectedKeys

                const findSelectedNode = (nodes: TreeListNode[]): boolean =>
                  nodes.some((item) => {
                    if (item.realId === selectedKeys[0]) {
                      expanded = [item.key]
                      selected = [item.key]
                      return true
                    }
                    return item.children?.length ? findSelectedNode(item.children) : false
                  })
                findSelectedNode(tree)
              } else {
                const defaultKey = selectable
                  ? { selected: [tree[0].key], expanded: [tree[0].key] }
                  : getDefaultKey(tree)
                selected = defaultKey.selected
                expanded = defaultKey.expanded
              }
            } catch {
              const defaultKey = selectable ? { selected: [tree[0].key], expanded: [tree[0].key] } : getDefaultKey(tree)
              selected = defaultKey.selected
              expanded = defaultKey.expanded
            }
            selectTreeKeys(selected)
            setExpandedKeys(expanded)
          }
        }
        setLoading(false)
      })
    }

    const updateTree = () => {
      getTreeListData()
    }

    useEffect(() => {
      const id = setTimeout(() => getTreeListData(), 0)
      return () => {
        clearTimeout(id)
        setTreeList([])
        setTreeData([])
        setSearchValue('')
        setFixSelectedKeys([])
        setExpandedKeys([])
      }
    }, [])

    useImperativeHandle(ref, () => ({
      reset: () => treeInit(treeList, true),
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
            <Search placeholder="查询" onSearch={onSearch} style={{ marginBottom: 10, width: '100%' }} allowClear />
          )}
          <Tree<TreeDisplayNode>
            selectedKeys={!isEmpty(selectedKeys) ? selectedKeys : fixSelectedKeys}
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
