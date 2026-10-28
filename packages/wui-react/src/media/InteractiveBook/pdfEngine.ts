import type { pdfjs } from 'react-pdf'

// Keep native PDF.js loading outside render and independently mockable in lifecycle tests.
export async function loadPdfEngine(): Promise<typeof pdfjs> {
  return (await import('react-pdf')).pdfjs
}
