import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'

// 将树形数据转换为扁平化数据，并建立父子关系
const flattenTreeData = (node, parentId = null, level = 0) => {
  const flatNode = {
    ...node,
    parentId,
    level,
    childrenIds: node.children ? node.children.map((child) => child.id) : [],
  }

  let result = [flatNode]

  if (node.children) {
    node.children.forEach((child) => {
      result = result.concat(flattenTreeData(child, node.id, level + 1))
    })
  }

  return result
}

const OrgChart = ({
  data,
  onNodeClick,
  onNodeExpand,
  defaultExpanded = true,
  highlightOnHover = true,
  nodeClassName,
  rootNodeClassName,
  animated = true,
  expandIcon = '▼',
  collapseIcon = '▲',
  showExpandIcon = true,
  customStyles = {},
}) => {
  const [flatData, setFlatData] = useState([])
  const [hoveredNodeId, setHoveredNodeId] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const containerRefs = useRef({})

  useEffect(() => {
    // 将树形数据转换为扁平化数据
    const flattened = flattenTreeData(data)

    // 使用 requestAnimationFrame 将 setState 延后，避免在 effect 中同步 setState 导致警告
    let raf = 0
    if (typeof requestAnimationFrame !== 'undefined') {
      raf = requestAnimationFrame(() => {
        setFlatData(flattened)
        if (defaultExpanded) {
          const allNodeIds = new Set(flattened.map((node) => node.id))
          setExpandedNodes(allNodeIds)
        }
      })
    } else {
      const id = setTimeout(() => {
        setFlatData(flattened)
        if (defaultExpanded) {
          const allNodeIds = new Set(flattened.map((node) => node.id))
          setExpandedNodes(allNodeIds)
        }
      }, 0)
      raf = id
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [data, defaultExpanded])

  // 获取节点的所有父节点ID
  const getParentIds = (nodeId) => {
    const node = flatData.find((n) => n.id === nodeId)
    if (!node || !node.parentId) return []
    return [node.parentId, ...getParentIds(node.parentId)]
  }

  // 检查节点是否应该高亮
  const isNodeHighlighted = (nodeId) => {
    if (!highlightOnHover || !hoveredNodeId) return false
    const parentIds = getParentIds(hoveredNodeId)
    return parentIds.includes(nodeId) || nodeId === hoveredNodeId
  }

  // 切换节点展开/收起状态
  const toggleNodeExpansion = (nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  // 处理节点点击
  const handleNodeClick = (node, event) => {
    event.stopPropagation()

    // 如果有子节点，切换展开状态
    if (node.childrenIds.length > 0) {
      toggleNodeExpansion(node.id)

      // 调用展开/收起回调
      if (onNodeExpand) {
        const isExpanded = expandedNodes.has(node.id)
        onNodeExpand(node, !isExpanded)
      }
    }

    // 调用外部点击回调
    if (onNodeClick) {
      onNodeClick(node, event)
    }
  }

  // 渲染单个节点及其子树
  const renderNodeTree = (nodeId) => {
    const node = flatData.find((n) => n.id === nodeId)
    if (!node) return null

    const isHighlighted = isNodeHighlighted(nodeId)
    const isHovered = hoveredNodeId === nodeId
    const isExpanded = expandedNodes.has(nodeId)
    const hasChildren = node.childrenIds.length > 0

    return (
      <div key={nodeId} className={styles.orgChart}>
        {/* 当前节点 */}
        <div className={styles.currentContainer}>
          <div
            className={` ${styles.currentBox} ${node.level === 0 ? styles.rootBox : ''} ${isHighlighted ? styles.highlightedParent : ''} ${nodeClassName || ''} ${node.level === 0 ? rootNodeClassName || '' : ''} ${animated ? styles.animated : ''} ${hasChildren ? styles.hasChildren : ''} `}
            style={customStyles.currentBox}
            onMouseEnter={() => highlightOnHover && setHoveredNodeId(nodeId)}
            onMouseLeave={() => highlightOnHover && setHoveredNodeId(null)}
            onClick={(e) => handleNodeClick(node, e)}
          >
            <div className={styles.currentTitle}>
              {node.name}
              {showExpandIcon && hasChildren && (
                <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                  {isExpanded ? collapseIcon : expandIcon}
                </span>
              )}
            </div>
          </div>
          {hasChildren && isExpanded && <div className={`${styles.line} ${styles.downWithLine}`}></div>}
        </div>

        {/* 子节点容器 */}
        {hasChildren && isExpanded && (
          <div className={styles.childrenContainer}>
            <div className={styles.childrenScroll}>
              <div className={styles.childrenWrapper}>
                {node.childrenIds.map((childId, index) => (
                  <div key={childId} className={styles.childWrapper}>
                    <div className={`${styles.arrow} ${styles.arrowChild} ${styles.downArrowWithLine}`}></div>
                    <div
                      className={` ${styles.childBox} ${isNodeHighlighted(childId) ? styles.highlightedChild : ''} ${animated ? styles.animated : ''} `}
                      style={customStyles.childBox}
                      onMouseEnter={() => highlightOnHover && setHoveredNodeId(childId)}
                      onMouseLeave={() => highlightOnHover && setHoveredNodeId(null)}
                      onClick={(e) => {
                        const childNode = flatData.find((n) => n.id === childId)
                        if (childNode) handleNodeClick(childNode, e)
                      }}
                    >
                      <div className={styles.childTitle}>{flatData.find((n) => n.id === childId)?.name}</div>
                    </div>
                    {/* 递归渲染子节点 */}
                    {renderNodeTree(childId)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 获取根节点ID
  const rootNodeId = flatData.find((n) => n.level === 0)?.id

  if (!rootNodeId) {
    return <div className={styles.emptyState}>暂无组织架构数据</div>
  }

  return <div className={styles.chartContainer}>{renderNodeTree(rootNodeId)}</div>
}

export default OrgChart
