import { Card, Typography } from 'antd'
import styles from './index.module.less'

const { Text } = Typography

const OrgChart = ({ data, isRoot = false }) => {
  const nodeWidth = 140
  const gap = 24

  // 递归计算节点及其整个子树的总宽度
  const calculateTotalWidth = (node) => {
    if (!node.children || node.children.length === 0) {
      return nodeWidth
    }

    const childWidths = node.children.map((child) => calculateTotalWidth(child))
    const totalChildrenWidth = childWidths.reduce((sum, width) => sum + width, 0)
    const totalGaps = Math.max(0, (childWidths.length - 1) * gap)
    const requiredWidth = totalChildrenWidth + totalGaps

    return Math.max(nodeWidth, requiredWidth)
  }

  // 计算水平连接线的宽度和位置
  const calculateHorizontalLine = (children) => {
    if (children.length <= 1) return { width: 0, positions: [] }

    const childWidths = children.map((child) => calculateTotalWidth(child))
    const positions = []
    let currentPos = 0

    childWidths.forEach((width, index) => {
      positions.push(currentPos + width / 2)
      currentPos += width + gap
    })

    const lineWidth = positions[positions.length - 1] - positions[0]
    return { width: lineWidth, positions }
  }

  const hasChildren = data.children && data.children.length > 0
  const totalWidth = calculateTotalWidth(data)
  const horizontalLineInfo = hasChildren ? calculateHorizontalLine(data.children) : { width: 0, positions: [] }

  return (
    <div className={styles.orgChart} style={{ width: `${totalWidth}px` }}>
      {/* 当前节点容器 */}
      <div className={styles.nodeContainer} style={{ width: `${totalWidth}px` }}>
        <Card className={`${styles.node} ${isRoot ? styles.rootNode : styles.childNode}`} size="small" hoverable>
          <Text className={styles.nodeTitle} ellipsis={{ tooltip: data.name }}>
            {data.name}
          </Text>
        </Card>

        {/* 向下的垂直线 */}
        {hasChildren && <div className={styles.verticalLineDown} />}
      </div>

      {/* 子节点区域 */}
      {hasChildren && (
        <div className={styles.childrenContainer} style={{ width: `${totalWidth}px` }}>
          {/* 水平连接线 */}
          {data?.children?.length > 1 && (
            <div
              className={styles.horizontalLine}
              style={{
                width: `${horizontalLineInfo.width}px`,
                left: `${horizontalLineInfo.positions[0]}px`,
              }}
            />
          )}

          {/* 子节点包装器 */}
          <div className={styles.childrenWrapper}>
            {data?.children?.map((child, index) => {
              const childWidth = calculateTotalWidth(child)
              const leftPosition = horizontalLineInfo.positions[index] - childWidth / 2

              return (
                <div
                  key={index}
                  className={styles.childContainer}
                  style={{
                    width: `${childWidth}px`,
                    position: 'absolute',
                    left: `${leftPosition}px`,
                    top: '0px',
                  }}
                >
                  {/* 向上的垂直线连接到水平线 */}
                  <div className={styles.verticalLineUp} />

                  {/* 递归渲染子节点 */}
                  <OrgChart data={child} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrgChart
