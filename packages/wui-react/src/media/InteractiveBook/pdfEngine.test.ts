import { configurePdfWorker } from './pdfEngine'
import type { pdfjs } from 'react-pdf'

test('the bare PDF worker default is resolved after loading the API', () => {
  const engine = { GlobalWorkerOptions: { workerSrc: 'pdf.worker.mjs', workerPort: null } } as unknown as typeof pdfjs
  configurePdfWorker(engine, '/assets/pdf.worker.min.hash.mjs')
  expect(engine.GlobalWorkerOptions.workerSrc).toBe('/assets/pdf.worker.min.hash.mjs')
})

test('caller worker URLs and ports remain untouched', () => {
  const engine = { GlobalWorkerOptions: { workerSrc: '/my-worker.mjs', workerPort: null } } as unknown as typeof pdfjs
  configurePdfWorker(engine, '/assets/default.mjs')
  expect(engine.GlobalWorkerOptions.workerSrc).toBe('/my-worker.mjs')
  const port = {} as Worker
  engine.GlobalWorkerOptions.workerPort = port
  engine.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs'
  configurePdfWorker(engine, '/assets/default.mjs')
  expect(engine.GlobalWorkerOptions.workerPort).toBe(port)
  expect(engine.GlobalWorkerOptions.workerSrc).toBe('pdf.worker.mjs')
})
