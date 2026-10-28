import type { Meta, StoryObj } from '@storybook/react'
import PDFExport from './index'
const sales = [
  { name: '一月', value: 820 },
  { name: '二月', value: 932 },
  { name: '三月', value: 901 },
  { name: '四月', value: 934 },
  { name: '五月', value: 1290 },
  { name: '六月', value: 1330 },
]
const products = [
  { name: '产品A', value: 335 },
  { name: '产品B', value: 310 },
  { name: '产品C', value: 234 },
  { name: '产品D', value: 135 },
  { name: '产品E', value: 148 },
]
function SalesReport() {
  const total = sales.reduce((sum, item) => sum + item.value, 0)
  return (
    <article style={{ padding: 32, background: '#fff', color: '#222', maxWidth: 900 }}>
      <h1>数据分析报告</h1>
      <p>演示如何将包含图表的页面导出为 PDF 文件</p>
      <dl style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <dt>总销售额</dt>
          <dd>¥{total}万</dd>
        </div>
        <div>
          <dt>平均月销售</dt>
          <dd>¥{(total / sales.length).toFixed(1)}万</dd>
        </div>
        <div>
          <dt>最高月销售</dt>
          <dd>¥{Math.max(...sales.map((item) => item.value))}万</dd>
        </div>
        <div>
          <dt>产品种类</dt>
          <dd>{products.length}种</dd>
        </div>
      </dl>
      <h2>销售趋势图表</h2>
      <svg viewBox="0 0 600 250" role="img" aria-label="月度销售额柱状图" style={{ width: '100%' }}>
        {sales.map((item, index) => (
          <g key={item.name}>
            <rect x={index * 100 + 15} y={210 - item.value / 7} width={60} height={item.value / 7} fill="#1890ff" />
            <text x={index * 100 + 45} y={235} textAnchor="middle">
              {item.name}
            </text>
          </g>
        ))}
      </svg>
      <h2>详细数据</h2>
      <h3>月度销售数据</h3>
      <ul>
        {sales.map((item) => (
          <li key={item.name}>
            {item.name}：¥{item.value}万
          </li>
        ))}
      </ul>
      <h3>产品销售占比</h3>
      <ul>
        {products.map((item) => (
          <li key={item.name}>
            {item.name}：{item.value}件
          </li>
        ))}
      </ul>
      <p>Pro React Admin 6.0 — PDF export example</p>
    </article>
  )
}
const meta = {
  title: 'Components/Stateless/PDFExport',
  component: PDFExport,
  tags: ['autodocs'],
  args: { fileName: '数据报告.pdf', children: <SalesReport /> },
} satisfies Meta<typeof PDFExport>
export default meta
export const Default: StoryObj<typeof meta> = {}
