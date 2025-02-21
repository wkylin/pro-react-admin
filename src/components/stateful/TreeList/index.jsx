import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Tree } from 'antd'
import Loading from '@stateless/Loading'
import { isEmpty, makeTree, _getParentKey, loopTreeDataWithSearch, getDefaultKey } from './utils'
import styles from './index.module.less'

const { Search } = Input

const Index = forwardRef((props, ref) => {
  const {
    getTreeList, // 获取数据的接口
    search = false, // 是否展示搜索框
    selectedKeys, // 选中的节点
    setSelectedKeys, // 选中外传函数
    selectable = false, // 父级节点是否可以选中
    params = {}, // 额外的参数
  } = props
  const [treeList, setTreeList] = useState([]) // 全量数据源列表
  const [treeData, setTreeData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState([])
  const [fixSelectedKeys, setFixSelectedKeys] = useState(selectedKeys || [])

  // 展开树
  const handleExpand = (a, b) => {
    const expandedKey = b.node.key

    if (expandedKeys.includes(expandedKey)) {
      setExpandedKeys([...expandedKeys.filter((e) => !e.startsWith(expandedKey))])
    } else {
      setExpandedKeys([...expandedKeys, expandedKey])
    }
  }

  const onSearch = (value) => {
    if (value !== searchValue) {
      if (!value) {
        const { expanded } = getDefaultKey(treeData)
        setExpandedKeys(expanded)
        setSearchValue(value)
        return
      }
      const expandedKeys = treeList
        .map((item) => {
          if (item.name.includes(value)) {
            return _getParentKey(item.id, treeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      setSearchValue(value)

      setExpandedKeys(expandedKeys)
    }
  }

  const onSelect = (selectedKeys, info) => {
    if (!selectedKeys.length) return
    if (selectable) {
      setSelectedKeys(selectedKeys, info)
      return setFixSelectedKeys(selectedKeys, info)
    }
    if (!info) {
      setSelectedKeys(selectedKeys, info)
      return setFixSelectedKeys(selectedKeys, info)
    }
    if (!info?.node?.children?.length) {
      setSelectedKeys(selectedKeys, info)
      return setFixSelectedKeys(selectedKeys, info)
    }
    handleExpand(selectedKeys, info)
  }

  const getTreeListData = (type) => {
    setLoading(true)

    getTreeList(params).then((resp) => {
      if (resp.status === 1) {
        setTreeList(resp.data)

        let treeData = makeTree(resp.data, 'id', 'pid')
        const setPath = (data, path) =>
          data.map((item) => {
            const itemPath = path ? `${path}.${item.id}` : item.id

            return {
              ...item,
              key: itemPath,
              ...(item.children?.length ? { children: setPath(item.children, itemPath) } : {}),
            }
          })
        treeData = setPath(treeData)

        setTreeData(treeData)

        if (!type) {
          treeInit(resp.data)
          let selected = []
          let expanded = []
          try {
            if (selectedKeys?.length) {
              resp.data.some((item) => {
                if (item.id === selectedKeys[0]) {
                  return item.id === selectedKeys[0]
                }
              })
              selected = selectedKeys

              const loop = (params) =>
                params.some((item) => {
                  if (item.realId === selectedKeys[0]) {
                    expanded = [item.key]
                    selected = [item.key]
                    return true
                  }
                  if (item.children && item.children.length) {
                    return loop(item.children)
                  }
                })
              loop(treeData)
            } else {
              const defaultKey = selectable
                ? {
                    selected: [treeData[0].key],
                    expanded: [treeData[0].key],
                  }
                : getDefaultKey(treeData)
              selected = defaultKey.selected
              expanded = defaultKey.expanded
            }
          } catch {
            const defaultKey = selectable
              ? {
                  selected: [treeData[0].key],
                  expanded: [treeData[0].key],
                }
              : getDefaultKey(treeData)
            selected = defaultKey.selected
            expanded = defaultKey.expanded
          }
          onSelect(selected)
          setExpandedKeys(expanded)
        }
      }
      setLoading(false)
    })
  }

  const treeInit = (resData, isReset) => {
    let selected = []
    let expanded = []
    try {
      if (selectedKeys?.length && !isReset) {
        resData.some((item) => {
          if (item.id === selectedKeys[0]) {
            return item.id === selectedKeys[0]
          }
        })
        selected = selectedKeys

        function loop(params) {
          return params.some((item) => {
            if (item.realId === selectedKeys[0]) {
              expanded = [item.key]
              selected = [item.key]
              return true
            }
            if (item?.children?.length) {
              return loop(item.children)
            }
          })
        }
        loop(treeData)
      } else {
        const defaultKey = selectable
          ? {
              selected: [treeData[0].key],
              expanded: [treeData[0].key],
            }
          : getDefaultKey(treeData)
        selected = defaultKey.selected
        expanded = defaultKey.expanded
      }
    } catch {
      const defaultKey = getDefaultKey(treeData)
      selected = defaultKey.selected
      expanded = defaultKey.expanded
    }

    onSelect(selected)
    setExpandedKeys(expanded) // 默认展开的节点
  }
  const updateTree = () => {
    getTreeListData()
  }
  useEffect(() => {
    getTreeListData()
    return () => {
      setTreeList([])
      setTreeData([])
      setSearchValue('')
      setFixSelectedKeys([])
      setExpandedKeys([])
    }
  }, [])

  useImperativeHandle(ref, () => ({
    reset: () => {
      treeInit(treeList, true)
    },
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
          <Search placeholder="搜索" onSearch={onSearch} style={{ marginBottom: 10, width: '100%' }} allowClear />
        )}
        <Tree
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
})
export default Index
