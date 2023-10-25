import { SSE } from 'sse'

const initSSE = (apiKey, apiContent) => {
  const source = new SSE(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    start: false,
    payload: JSON.stringify({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'assistant',
          content: apiContent,
        },
      ],
    }),
  })
  return source
}

export default initSSE
