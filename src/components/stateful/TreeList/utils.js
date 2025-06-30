import React from 'react'

export function getDefaultKey(treeData) {
  let selected = []
  let expanded = []
  function forFn(data, parentKey) {
    return data.some((item) => {
      if (item.children && item.children.length) {
        return forFn(item.children, item.key)
      }
      selected = [item.key]
      expanded = [parentKey]
      return true
    })
  }
  forFn(treeData)

  return { selected, expanded }
}
export function processTreeData(list, pid) {
  return list
    .filter((item) => item.pid === pid)
    .map((item) => ({
      pid,
      key: item.id,
      title: item.name,
      children: processTreeData(list, item.id),
    }))
}

export const loopTreeData = (data) =>
  data.map((item) => {
    const title = <span>{item.title}</span>
    if (item.children) {
      return {
        title,
        key: item.key,
        pid: item.pid,
        children: loopTreeData(item.children),
      }
    }
    return {
      title,
      key: item.key,
      pid: item.pid,
    }
  })
export function expandTree(a, b, setExpandedKeys) {
  if (b.expanded) {
    if (a.length > 0) {
      a.splice(0, a.length - 1)
    }
    setExpandedKeys(a)
  } else {
    const key = b.node.children
      .map((obj) => {
        if (a.indexOf(obj.key) > -1) {
          a.splice(a.indexOf(obj.key), 1)
          return obj.key
        }
        return ''
      })
      .filter((v) => v !== '')
    // index  是点击收起节点的下级展开节点
    const index = a.indexOf(key[0]) // 因为展开的时候会收起兄弟节点  所以这里应该只有一个
    if (index > 0) {
      a.splice(0, index + 1) // 从0开始  删除到点击的下一级已展开节点
    }
  }
  setExpandedKeys(a)
}
export const loopTreeDataWithSearch = (data, searchValue) =>
  data.map((item) => {
    const index = item.title.indexOf(searchValue)
    const beforeStr = item.title.substr(0, index)
    const afterStr = item.title.substr(index + searchValue.length)
    const title =
      index > -1 ? (
        <span>
          {beforeStr} <span style={{ color: '#D12604' }}>{searchValue}</span> {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      )
    if (item.children) {
      return {
        title,
        key: item.key,
        pid: item.pid,
        // selectable: item.flag,
        children: loopTreeDataWithSearch(item.children, searchValue),
      }
    }
    return {
      title,
      // selectable: item.flag,
      key: item.key,
      pid: item.pid,
    }
  })
export const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

export const _getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key.split('.').pop() === key)) {
        parentKey = node.key
      } else if (_getParentKey(key, node.children)) {
        parentKey = _getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
/*
 * 树形结构
 * @list 原数据
 * idField pidField 映射关系
 * */
export const makeTree = (list, idField, pidField) => {
  const map = {}
  list.forEach((e) => {
    map[e[idField]] = e
  })

  const roots = []
  list.forEach((e) => {
    const pid = e[pidField]
    const p = map[pid]
    e.key = p ? `${p.id}.${e.id}` : e.id
    e.title = e.name
    if (p) {
      if (!p.children) {
        p.children = []
      }
      p.children.push(e)
    } else {
      roots.push(e)
    }
  })
  return roots
}

export const isEmpty = (value) => {
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
