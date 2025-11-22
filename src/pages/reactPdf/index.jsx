import React, { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react'
import FixTabPanel from '@stateless/FixTabPanel'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// 设置PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

// 错误边界组件，用于捕获子组件错误
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('PDF渲染错误:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>加载PDF时发生错误，请重试。</div>
    }
    return this.props.children
  }
}

const ReactPdf = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 文档加载成功处理
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }, [])

  // 文档加载错误处理
  const onDocumentLoadError = useCallback((err) => {
    console.error('文档加载错误:', err)
    setError('无法加载PDF文档，请检查URL是否正确。')
    setIsLoading(false)
  }, [])

  // 页面渲染错误处理
  const onPageLoadError = useCallback((err) => {
    console.error('页面加载错误:', err)
    setError('加载页面时发生错误。')
  }, [])

  // 页面渲染成功处理
  const onPageLoadSuccess = useCallback(() => {
    setError(null)
  }, [])

  // 翻页处理
  const changePage = (offset) => {
    if (!numPages) return
    setPageNumber((prev) => {
      const newPage = prev + offset
      return Math.min(Math.max(newPage, 1), numPages)
    })
  }

  // 缩放处理
  const changeScale = (delta) => {
    setScale((prev) => {
      const newScale = prev + delta
      return Math.min(Math.max(newScale, 0.5), 2.0)
    })
  }

  const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'

  return (
    <FixTabPanel>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">React PDF Viewer</h1>
        </header>

        <main className="container mx-auto flex-grow p-4">
          <div className="mx-auto mb-4 w-full max-w-3xl rounded-lg bg-white p-4 shadow-md">
            {isLoading ? (
              <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">加载PDF文档中...</span>
              </div>
            ) : error ? (
              <div className="flex h-96 items-center justify-center text-red-500">{error}</div>
            ) : (
              <ErrorBoundary fallback={<div>PDF渲染失败，请重试。</div>}>
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  className="flex justify-center"
                >
                  <Page
                    key={`page-${pageNumber}-scale-${scale}`}
                    pageNumber={pageNumber}
                    scale={scale}
                    onLoadError={onPageLoadError}
                    onLoadSuccess={onPageLoadSuccess}
                    renderAnnotationLayer
                    renderTextLayer
                  />
                </Document>
              </ErrorBoundary>
            )}
          </div>

          {/* 控制按钮区域 */}
          {numPages && !error && (
            <div className="mt-4 flex items-center justify-center space-x-4">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="上一页"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <span className="mx-1 text-xl">
                第 {pageNumber} 页，共 {numPages} 页
              </span>

              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= numPages}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="下一页"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="mx-4 h-6 border-r border-gray-300" />

              <button
                onClick={() => changeScale(-0.1)}
                disabled={scale <= 0.5}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="缩小"
              >
                <ZoomOut className="h-6 w-6" />
              </button>

              <span className="text-gray-600">{Math.round(scale * 100)}%</span>

              <button
                onClick={() => changeScale(0.1)}
                disabled={scale >= 2.0}
                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="放大"
              >
                <ZoomIn className="h-6 w-6" />
              </button>
            </div>
          )}
        </main>
      </div>
    </FixTabPanel>
  )
}

export default ReactPdf
