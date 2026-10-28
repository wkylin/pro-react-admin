import { useState, useEffect, useMemo } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import styles from './org-chart/index.module.less'

export type NodeId = string | number

export interface OrgChartNode {
  id: NodeId
  name: ReactNode
  children?: OrgChartNode[]
}

export interface FlatOrgChartNode extends OrgChartNode {
  parentId: NodeId | null
  level: number
  childrenIds: NodeId[]
}

export interface OrgChartCustomStyles {
  currentBox?: CSSProperties
  childBox?: CSSProperties
}

export interface OrgChartProps {
  data: OrgChartNode
  orientation?: 'vertical' | 'horizontal'
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
  orientation = 'vertical',
  onNodeClick,
  onNodeExpand,
  defaultExpanded = true,
  highlightOnHover = true,
  nodeClassName,
  rootNodeClassName,
  animated = true,
  expandIcon = orientation === 'horizontal' ? '▶' : '▼',
  collapseIcon = orientation === 'horizontal' ? '◀' : '▲',
  showExpandIcon = true,
  customStyles = {},
}: OrgChartProps) => {
  const flatData = useMemo(() => flattenTreeData(data), [data])
  const [hoveredNodeId, setHoveredNodeId] = useState<NodeId | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<NodeId>>(
    () => new Set(defaultExpanded ? flatData.map((node) => node.id) : [])
  )
  useEffect(() => {
    setExpandedNodes(new Set(defaultExpanded ? flatData.map((node) => node.id) : []))
  }, [flatData, defaultExpanded])

  // 获取节点的所有父节点ID
  const getParentIds = (nodeId: NodeId): NodeId[] => {
    const node = flatData.find((n) => n.id === nodeId)
    if (node?.parentId == null) return []
    return [node.parentId, ...getParentIds(node.parentId)]
  }

  // 检查节点是否应该高亮
  const isNodeHighlighted = (nodeId: NodeId) => {
    if (!highlightOnHover || hoveredNodeId == null) return false
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
            style={
              node.level === 0 ? customStyles.currentBox : { ...customStyles.currentBox, ...customStyles.childBox }
            }
            aria-expanded={hasChildren ? isExpanded : undefined}
            onMouseEnter={() => highlightOnHover && setHoveredNodeId(nodeId)}
            onMouseLeave={() => highlightOnHover && setHoveredNodeId(null)}
            onClick={(e) => handleNodeClick(node, e)}
          >
            <div className={styles.currentTitle}>
              {node.name}
              {showExpandIcon && hasChildren && (
                <span aria-hidden="true" className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
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
            {node.childrenIds.map((childId) => (
              <div key={childId} className={styles.childWrapper}>
                <div className={`${styles.arrow} ${styles.downArrowWithLine}`}></div>
                {renderNodeTree(childId)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // 获取根节点ID
  const rootNodeId = flatData.find((n) => n.level === 0)?.id

  if (rootNodeId == null) {
    return <div className={styles.emptyState}>暂无组织架构数据</div>
  }

  return (
    <div className={`${styles.chartContainer} ${orientation === 'horizontal' ? styles.horizontal : ''}`}>
      {renderNodeTree(rootNodeId)}
    </div>
  )
}

export default OrgChart
