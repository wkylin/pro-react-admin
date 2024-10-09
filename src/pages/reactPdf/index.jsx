import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function ReactPdf () {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)

  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages)
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => Math.min(Math.max(prevPageNumber + offset, 1), numPages || 1))
  }

  const changeScale = (delta) => {
    setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.5), 2.0))
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-blue-600 text-white p-4'>
        <h1 className='text-2xl font-bold'>React PDF Viewer</h1>
      </header>
      <main className='flex-grow container mx-auto p-4 flex flex-col items-center'>
        <div className='bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-3xl'>
          <Document
            file='https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
            onLoadSuccess={onDocumentLoadSuccess}
            className='flex justify-center'
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className='bg-blue-500 text-white p-2 rounded-full disabled:bg-gray-300'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <p className='text-lg'>
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1)}
            className='bg-blue-500 text-white p-2 rounded-full disabled:bg-gray-300'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
          <button onClick={() => changeScale(-0.1)} className='bg-blue-500 text-white p-2 rounded-full'>
            <ZoomOut className='w-6 h-6' />
          </button>
          <button onClick={() => changeScale(0.1)} className='bg-blue-500 text-white p-2 rounded-full'>
            <ZoomIn className='w-6 h-6' />
          </button>
        </div>
      </main>
    </div>
  )
}

export default ReactPdf
