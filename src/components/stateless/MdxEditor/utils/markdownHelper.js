import TurndownService from 'turndown'
import { marked } from 'marked'

// 配置 Turndown (HTML -> Markdown)
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
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

// 表格规则 (基础支持)
turndownService.addRule('table', {
  filter: 'table',
  replacement: function (content, node) {
    return content
  },
})

export const htmlToMarkdown = (html) => {
  return turndownService.turndown(html)
}

export const markdownToHtml = (markdown) => {
  return marked.parse(markdown)
}
