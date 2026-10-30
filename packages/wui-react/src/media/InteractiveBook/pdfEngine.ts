import type { pdfjs } from 'react-pdf'

export function configurePdfWorker(engine: typeof pdfjs, workerUrl: string): void {
  const options = engine.GlobalWorkerOptions
  // react-pdf assigns this bare default when its module initializes. Configure
  // afterwards, on the same API instance; leave host-owned workers/URLs alone.
  if (!options.workerPort && (!options.workerSrc || options.workerSrc === 'pdf.worker.mjs'))
    options.workerSrc = workerUrl
}

// Keep native PDF.js loading outside render and independently mockable in lifecycle tests.
export async function loadPdfEngine(): Promise<typeof pdfjs> {
  const engine = (await import('react-pdf')).pdfjs
  configurePdfWorker(engine, new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString())
  return engine
}
