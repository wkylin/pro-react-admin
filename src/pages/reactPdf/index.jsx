import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import FixTabPanel from '@stateless/FixTabPanel'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

const ReactPdf = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => Math.min(Math.max(prevPageNumber + offset, 1), numPages || 1))
  }

  const changeScale = (delta) => {
    setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.5), 2.0))
  }

  const httpsUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  return (
    <FixTabPanel>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">React PDF Viewer</h1>
        </header>
        <main className="container mx-auto flex grow flex-col items-center p-4">
          <div className="mb-4 w-full max-w-3xl rounded-lg bg-white p-4 shadow-md">
            <Document file={httpsUrl} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="rounded-full bg-blue-500 p-2 text-white disabled:bg-gray-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="mx-1 text-xl">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1)}
              className="rounded-full bg-blue-500 p-2 text-white disabled:bg-gray-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button onClick={() => changeScale(-0.1)} className="rounded-full bg-blue-500 p-2 text-white">
              <ZoomOut className="h-6 w-6" />
            </button>
            <button onClick={() => changeScale(0.1)} className="rounded-full bg-blue-500 p-2 text-white">
              <ZoomIn className="h-6 w-6" />
            </button>
          </div>
        </main>
        {/* <embed type="application/pdf" src={`${httpsUrl}`} key={`${httpsUrl}`} width="100%" height="600px" />; */}
      </div>
    </FixTabPanel>
  )
}

export default ReactPdf
