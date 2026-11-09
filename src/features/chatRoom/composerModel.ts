import { CHAT_MESSAGE_LIMIT } from './model'

export interface ComposerEdit {
  value: string
  selectionStart: number
  selectionEnd: number
}

export type TextFormat = 'bold' | 'italic' | 'strike' | 'code' | 'quote' | 'bullet' | 'number'

function selection(value: string, start: number, end: number): [number, number] {
  const index = (position: number) =>
    Math.min(value.length, Math.max(0, Number.isFinite(position) ? Math.trunc(position) : value.length))
  return [Math.min(index(start), index(end)), Math.max(index(start), index(end))]
}

function edit(value: string, selectionStart: number, selectionEnd = selectionStart): ComposerEdit | undefined {
  return value.length > CHAT_MESSAGE_LIMIT ? undefined : { value, selectionStart, selectionEnd }
}

export function insertComposerText(
  value: string,
  start: number,
  end: number,
  insertion: string
): ComposerEdit | undefined {
  const [from, to] = selection(value, start, end)
  return edit(value.slice(0, from) + insertion + value.slice(to), from + insertion.length)
}

export function formatComposerSelection(
  value: string,
  start: number,
  end: number,
  format: TextFormat
): ComposerEdit | undefined {
  const [from, to] = selection(value, start, end)
  if (format === 'quote' || format === 'bullet' || format === 'number') {
    const first = from === 0 ? 0 : value.lastIndexOf('\n', from - 1) + 1
    const selectedEnd = to > from && value[to - 1] === '\n' ? to - 1 : to
    const followingBreak = value.indexOf('\n', selectedEnd)
    const last = followingBreak === -1 ? value.length : followingBreak
    const lines = value.slice(first, last).split('\n')
    const prefixes = lines.map((_line, index) =>
      format === 'quote' ? '> ' : format === 'bullet' ? '- ' : `${index + 1}. `
    )
    const replacement = lines.map((line, index) => prefixes[index] + line).join('\n')
    const next = value.slice(0, first) + replacement + value.slice(last)
    const added = prefixes.reduce((length, prefix) => length + prefix.length, 0)
    return edit(next, from + prefixes[0].length, from === to ? from + prefixes[0].length : to + added)
  }

  const selected = value.slice(from, to)
  let marker = format === 'bold' ? '**' : format === 'italic' ? '*' : format === 'strike' ? '~~' : '`'
  let padding = ''
  if (format === 'code') {
    const runs = selected.match(/`+/g) ?? []
    marker = '`'.repeat(Math.max(0, ...runs.map((run) => run.length)) + 1)
    padding = selected.startsWith('`') || selected.endsWith('`') ? ' ' : ''
  }
  const next = value.slice(0, from) + marker + padding + selected + padding + marker + value.slice(to)
  const selectedStart = from + marker.length + padding.length
  return edit(next, selectedStart, selectedStart + selected.length)
}

export function safeChatUrl(value: string): string | undefined {
  if (
    typeof value !== 'string' ||
    Array.from(value).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
  )
    return undefined
  try {
    const url = new URL(value.trim())
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined
  } catch {
    return undefined
  }
}

function escapeLabel(value: string): string {
  return value.replace(/([\\[\]()*_`~<>!|&])/g, '\\$1')
}

export function createChatLink(label: string, value: string): string | undefined {
  const url = safeChatUrl(value)
  if (!url) return undefined
  const destination = url.replace(/\(/g, '%28').replace(/\)/g, '%29')
  const text = label.trim().replace(/[\r\n]+/g, ' ') || url
  const markdown = `[${escapeLabel(text)}](${destination})`
  return markdown.length <= CHAT_MESSAGE_LIMIT ? markdown : undefined
}

export function buildQuotedReply(value: string, target?: { displayName: string; body: string }): string {
  if (!target?.body.trim()) return value
  const sender = escapeLabel(target.displayName.trim().replace(/\s+/g, ' ') || '…')
  const characters = Array.from(target.body.trim().replace(/\r\n?/g, '\n'))
  const excerpt = characters.length > 280 ? `${characters.slice(0, 279).join('')}…` : characters.join('')
  const quote = `> **${sender}**\n${excerpt
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')}`
  return `${quote}\n\n${value}`
}
