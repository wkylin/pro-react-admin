import { loadPdfTools } from './load'
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import AnimatedIcon from '../../AnimatedIcon'
import { Download } from 'lucide-react'
import styles from '../display.module.less'
/** Package-owned options keep unrelated group consumers independent of PDF peer types. */
export interface PDFDocumentOptions {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape'
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc'
  format?: string | number[]
  compress?: boolean
  precision?: number
  filters?: string[]
  userUnit?: number
  encryption?: {
    userPassword?: string
    ownerPassword?: string
    userPermissions?: ('print' | 'modify' | 'copy' | 'annot-forms')[]
  }
  putOnlyUsedFonts?: boolean
  hotfixes?: string[]
  floatPrecision?: number | 'smart'
}
export interface PDFExportProps {
  children?: ReactNode
  contentRef?: RefObject<HTMLElement | null>
  fileName?: string
  pdfOptions?: PDFDocumentOptions
  scale?: number
  label?: string
  onError?: (error: unknown) => void
  onComplete?: () => void
}
/** Captures caller-owned DOM. Remote image elements are excluded; supply local data/blob images. */
export default function PDFExport({
  children,
  contentRef,
  fileName = 'document.pdf',
  pdfOptions,
  scale = 2,
  label = 'Export PDF',
  onError,
  onComplete,
}: PDFExportProps) {
  const inner = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  const busy = useRef(false)
  const [exporting, setExporting] = useState(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  const exportPdf = async () => {
    if (busy.current) return
    const element = contentRef?.current ?? inner.current
    if (!element) {
      onError?.(new Error('PDF content is unavailable'))
      return
    }
    busy.current = true
    setExporting(true)
    let canvas: HTMLCanvasElement | undefined
    try {
      const [{ default: html2canvas }, { jsPDF }] = await loadPdfTools()
      if (!mounted.current) return
      canvas = await html2canvas(element, {
        scale: Number.isFinite(scale) ? Math.min(4, Math.max(0.25, scale)) : 2,
        allowTaint: false,
        useCORS: false,
        logging: false,
        ignoreElements: (node) =>
          ['SCRIPT', 'IFRAME', 'OBJECT', 'EMBED'].includes(node.tagName) ||
          (node.tagName === 'IMG' && !/^(data:|blob:)/i.test(node.getAttribute('src') ?? '')),
      })
      if (!mounted.current) return
      if (!canvas.width || !canvas.height) throw new Error('PDF content is empty')
      const pdf = new jsPDF(pdfOptions)
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imageHeight = (canvas.height * pageWidth) / canvas.width
      if (!Number.isFinite(imageHeight) || imageHeight / pageHeight > 100) throw new Error('PDF exceeds 100 pages')
      const image = canvas.toDataURL('image/png')
      for (let offset = 0; offset < imageHeight; offset += pageHeight) {
        if (offset) pdf.addPage()
        pdf.addImage(image, 'PNG', 0, -offset, pageWidth, imageHeight)
      }
      await pdf.save(fileName, { returnPromise: true })
      if (mounted.current) onComplete?.()
    } catch (error) {
      if (mounted.current) onError?.(error)
    } finally {
      if (canvas) {
        canvas.width = 0
        canvas.height = 0
      }
      busy.current = false
      if (mounted.current) setExporting(false)
    }
  }
  return (
    <div className={styles.pdf}>
      <button type="button" disabled={exporting} aria-busy={exporting} onClick={() => void exportPdf()}>
        <AnimatedIcon>
          <Download size={16} />
        </AnimatedIcon>
        {label}
      </button>
      <div ref={inner}>{children}</div>
    </div>
  )
}
