import { useState, useEffect, useMemo } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.less'

type NodeId = string | number

interface OrgChartNode {
  id: NodeId
  name: ReactNode
  children?: OrgChartNode[]
}

interface FlatOrgChartNode extends OrgChartNode {
  parentId: NodeId | null
  level: number
  childrenIds: NodeId[]
}

interface OrgChartCustomStyles {
  currentBox?: CSSProperties
  childBox?: CSSProperties
}

interface OrgChartProps {
  data: OrgChartNode
  onNodeClick?: (node: FlatOrgChartNode, event: MouseEvent<HTMLButtonElement>) => void
  onNodeExpand?: (node: FlatOrgChartNode, isExpanded: boolean) => void
  defaultExpanded?: boolean
  highlightOnHover?: boolean
  nodeClassName?: string
  rootNodeClassName?: string
  animated?: boolean
  expandIcon?: ReactNode
  collapseIcon?: ReactNode
  showExpandIcon?: boolean
  customStyles?: OrgChartCustomStyles
}

// 将树形数据转换为扁平化数据，并建立父子关系
const flattenTreeData = (node: OrgChartNode, parentId: NodeId | null = null, level = 0): FlatOrgChartNode[] => {
  const flatNode: FlatOrgChartNode = {
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
}: OrgChartProps) => {
  const [flatData, setFlatData] = useState<FlatOrgChartNode[]>([])
  const [hoveredNodeId, setHoveredNodeId] = useState<NodeId | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<NodeId>>(new Set())

  useEffect(() => {
    // 将树形数据转换为扁平化数据
    const flattened = flattenTreeData(data)

    // 使用 requestAnimationFrame 将 setState 延后，避免在 effect 中同步 setState 导致警告
    let rafId = 0
    let timeoutId = 0
    if (typeof requestAnimationFrame !== 'undefined') {
      rafId = requestAnimationFrame(() => {
        setFlatData(flattened)
        if (defaultExpanded) {
          const allNodeIds = new Set(flattened.map((node) => node.id))
          setExpandedNodes(allNodeIds)
        }
      })
    } else {
      timeoutId = window.setTimeout(() => {
        setFlatData(flattened)
        if (defaultExpanded) {
          const allNodeIds = new Set(flattened.map((node) => node.id))
          setExpandedNodes(allNodeIds)
        }
      }, 0)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [data, defaultExpanded])

  // 获取节点的所有父节点ID
  const getParentIds = (nodeId: NodeId): NodeId[] => {
    const node = flatData.find((n) => n.id === nodeId)
    if (!node?.parentId) return []
    return [node.parentId, ...getParentIds(node.parentId)]
  }

  // 检查节点是否应该高亮
  const isNodeHighlighted = (nodeId: NodeId) => {
    if (!highlightOnHover || !hoveredNodeId) return false
    const parentIds = getParentIds(hoveredNodeId)
    return parentIds.includes(nodeId) || nodeId === hoveredNodeId
  }

  // 切换节点展开/收起状态
  const toggleNodeExpansion = (nodeId: NodeId) => {
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
  const handleNodeClick = (node: FlatOrgChartNode, event: MouseEvent<HTMLButtonElement>) => {
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

  const nodeMap = useMemo(() => {
    const map = new Map<NodeId, FlatOrgChartNode>()
    flatData.forEach((n) => map.set(n.id, n))
    return map
  }, [flatData])

  const handleChildClick = (childId: NodeId, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    const childNode = nodeMap.get(childId)
    if (!childNode) return

    if (childNode.childrenIds.length > 0) {
      toggleNodeExpansion(childId)

      if (onNodeExpand) {
        const isExpanded = expandedNodes.has(childId)
        onNodeExpand(childNode, !isExpanded)
      }
    }

    if (onNodeClick) onNodeClick(childNode, event)
  }

  // 渲染单个节点及其子树
  const renderNodeTree = (nodeId: NodeId): ReactNode => {
    const node = nodeMap.get(nodeId)
    if (!node) return null

    const isHighlighted = isNodeHighlighted(nodeId)
    const isExpanded = expandedNodes.has(nodeId)
    const hasChildren = node.childrenIds.length > 0

    return (
      <div key={nodeId} className={styles.orgChart}>
        {/* 当前节点 */}
        <div className={styles.currentContainer}>
          <button
            type="button"
            className={` ${styles.currentBox} ${node.level === 0 ? styles.rootBox : ''} ${isHighlighted ? styles.highlightedParent : ''} ${nodeClassName || ''} ${node.level === 0 ? rootNodeClassName || '' : ''} ${animated ? styles.animated : ''} ${hasChildren ? styles.hasChildren : ''} `}
            style={customStyles.currentBox}
            aria-expanded={hasChildren ? isExpanded : undefined}
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
          </button>
          {hasChildren && isExpanded && <div className={`${styles.line} ${styles.downWithLine}`}></div>}
        </div>

        {/* 子节点容器 */}
        {hasChildren && isExpanded && (
          <div className={styles.childrenContainer}>
            <div className={styles.childrenScroll}>
              <div className={styles.childrenWrapper}>
                {node.childrenIds.map((childId) => (
                  <div key={childId} className={styles.childWrapper}>
                    <div className={`${styles.arrow} ${styles.arrowChild} ${styles.downArrowWithLine}`}></div>
                    <button
                      type="button"
                      className={` ${styles.childBox} ${isNodeHighlighted(childId) ? styles.highlightedChild : ''} ${animated ? styles.animated : ''} `}
                      style={customStyles.childBox}
                      onMouseEnter={() => highlightOnHover && setHoveredNodeId(childId)}
                      onMouseLeave={() => highlightOnHover && setHoveredNodeId(null)}
                      onClick={(e) => handleChildClick(childId, e)}
                    >
                      <div className={styles.childTitle}>{nodeMap.get(childId)?.name}</div>
                    </button>
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

OrgChart.propTypes = {
  data: PropTypes.object,
  onNodeClick: PropTypes.func,
  onNodeExpand: PropTypes.func,
  defaultExpanded: PropTypes.bool,
  highlightOnHover: PropTypes.bool,
  nodeClassName: PropTypes.string,
  rootNodeClassName: PropTypes.string,
  animated: PropTypes.bool,
  expandIcon: PropTypes.node,
  collapseIcon: PropTypes.node,
  showExpandIcon: PropTypes.bool,
  customStyles: PropTypes.object,
}
