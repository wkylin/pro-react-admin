import OrgChart from './org-chart'

// 示例组织数据
const orgData = {
  id: 1,
  name: '总公司',
  children: [
    {
      id: 2,
      name: '技术部',
      children: [
        {
          id: 5,
          name: '前端组',
          children: [
            { id: 11, name: 'React 小组' },
            { id: 12, name: 'Vue 小组' },
            { id: 15, name: 'Angular 小组' },
            { id: 16, name: '移动端小组' },
          ],
        },
        {
          id: 6,
          name: '后端组',
          children: [
            { id: 13, name: 'Java 小组' },
            { id: 14, name: 'Python 小组' },
            { id: 17, name: 'Go 小组' },
            { id: 18, name: 'Node.js 小组' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: '市场部',
      children: [
        { id: 7, name: '推广组' },
        { id: 8, name: '销售组' },
        { id: 25, name: '品牌组' },
        { id: 26, name: '公关组' },
      ],
    },
    {
      id: 4,
      name: '人力资源部',
      children: [
        { id: 9, name: '招聘组' },
        { id: 10, name: '培训组' },
        { id: 27, name: '薪酬组' },
        { id: 28, name: '员工关系组' },
      ],
    },
  ],
}

function OrgChartDemo() {
  // 自定义样式
  const customStyles = {
    currentBox: {
      // 可以在这里覆盖默认样式
    },
    childBox: {
      // 可以在这里覆盖默认样式
    },
  }

  return (
    <div className="chart-container">
      <OrgChart
        data={orgData}
        defaultExpanded={true}
        highlightOnHover={true}
        animated={true}
        rootNodeClassName="custom-root-node"
        expandIcon="▶"
        collapseIcon="▼"
        showExpandIcon={true}
        customStyles={customStyles}
      />
    </div>
  )
}

export default OrgChartDemo
