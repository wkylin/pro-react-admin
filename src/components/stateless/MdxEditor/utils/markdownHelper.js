import TurndownService from 'turndown'
import { marked } from 'marked'

// 配置 Turndown (HTML -> Markdown)
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

// 自定义表格转换规则 - 处理 Tiptap 生成的表格结构
turndownService.addRule('table', {
  filter: 'table',
  replacement: function (content, node) {
    const rows = node.querySelectorAll('tr')
    if (rows.length === 0) return ''

    const result = []
    let isFirstRow = true

    rows.forEach((row) => {
      const cells = row.querySelectorAll('th, td')
      const cellContents = []

      cells.forEach((cell) => {
        // 提取单元格文本内容，去除内部 <p> 标签的影响
        let text = cell.textContent?.trim() || ''
        // 转义 Markdown 表格中的特殊字符
        text = text.replace(/\|/g, '\\|').replace(/\n/g, ' ')
        cellContents.push(text)
      })

      if (cellContents.length > 0) {
        result.push('| ' + cellContents.join(' | ') + ' |')

        // 第一行后添加分隔符行
        if (isFirstRow) {
          const separator = cellContents.map(() => '---').join(' | ')
          result.push('| ' + separator + ' |')
          isFirstRow = false
        }
      }
    })

    return result.length > 0 ? '\n\n' + result.join('\n') + '\n\n' : ''
  },
})

// 忽略 colgroup、col 等表格辅助元素
turndownService.addRule('tableHelpers', {
  filter: ['colgroup', 'col', 'thead', 'tbody', 'tfoot'],
  replacement: function (content) {
    return content
  },
})

// 表格行和单元格规则 - 让表格规则处理
turndownService.addRule('tableElements', {
  filter: ['tr', 'th', 'td'],
  replacement: function (content) {
    return content
  },
})

// 任务列表规则 [ ] -> <input type="checkbox">
turndownService.addRule('tasklist', {
  filter: function (node) {
    return node.nodeName === 'INPUT' && node.getAttribute('type') === 'checkbox'
  },
  replacement: function (content, node) {
    return node.checked ? '[x] ' : '[ ] '
  },
})

export const htmlToMarkdown = (html) => {
  return turndownService.turndown(html)
}

export const markdownToHtml = (markdown) => {
  return marked.parse(markdown)
}
