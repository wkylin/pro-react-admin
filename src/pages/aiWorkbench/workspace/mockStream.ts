import { DEFAULT_SETTINGS, type RuntimeSettings } from './model'

interface DemoResponseOptions {
  input: string
  systemPrompt: string
  settings: RuntimeSettings
  language: 'en' | 'zh'
  signal?: AbortSignal | null
}

export function createDemoResponse({ input, systemPrompt, settings, language, signal }: DemoResponseOptions): Response {
  const chinese = language === 'zh'
  const content = chinese
    ? `## 本地演示\n\n这是本地生成的流式预览，未调用 AI 模型或联网检索。\n\n### 你的问题\n${input.trim()}\n\n### 已应用的系统提示词\n${systemPrompt.trim() || '尚未应用系统提示词。'}\n\n### 示例工作流程\n1. 明确问题的目标与预期结果。\n2. 根据已应用的提示词整理约束和输出格式。\n3. 将当前输入与提示词交给未来接入的模型服务。`
    : `## Local demo\n\nThis is a locally generated streaming preview. No AI model or web search was called.\n\n### Your message\n${input.trim()}\n\n### Applied system prompt\n${systemPrompt.trim() || 'No system prompt applied.'}\n\n### Example workflow\n1. Clarify the goal and expected result.\n2. Organize constraints and output format from the applied prompt.\n3. Pass this input and prompt to a model service when one is connected.`
  const reasoning = settings.includeReasoning
    ? chinese
      ? '演示说明：以下内容是本地预设的步骤展示，不是真实模型的推理过程。'
      : 'Demo note: these are locally scripted steps, not reasoning from an AI model.'
    : ''
  const cadence =
    Number.isInteger(settings.cadence) && settings.cadence >= 40 && settings.cadence <= 280
      ? settings.cadence
      : DEFAULT_SETTINGS.cadence
  const chunkSize =
    Number.isInteger(settings.chunkSize) && settings.chunkSize >= 10 && settings.chunkSize <= 40
      ? settings.chunkSize
      : DEFAULT_SETTINGS.chunkSize
  const characters = Array.from(content)
  const chunks: { content: string; reasoning?: string }[] = reasoning ? [{ content: '', reasoning }] : []
  for (let index = 0; index < characters.length; index += chunkSize)
    chunks.push({ content: characters.slice(index, index + chunkSize).join('') })

  const encoder = new TextEncoder()
  let timer: ReturnType<typeof setTimeout> | undefined
  let finished = false
  let controller: ReadableStreamDefaultController<Uint8Array>
  const finish = (close = true) => {
    if (finished) return
    finished = true
    clearTimeout(timer)
    signal?.removeEventListener('abort', onAbort)
    if (close) controller.close()
  }
  const onAbort = () => finish()
  const stream = new ReadableStream<Uint8Array>({
    start(current) {
      controller = current
      if (signal?.aborted) {
        finish()
        return
      }
      signal?.addEventListener('abort', onAbort, { once: true })
      let index = 0
      const push = () => {
        if (finished) return
        if (signal?.aborted) {
          finish()
          return
        }
        if (index === chunks.length) {
          current.enqueue(encoder.encode('data: [DONE]\n\n'))
          finish()
          return
        }
        current.enqueue(encoder.encode(`data: ${JSON.stringify(chunks[index++])}\n\n`))
        timer = setTimeout(push, cadence)
      }
      push()
    },
    cancel() {
      finish(false)
    },
  })
  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
