import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
const capture = jest.fn()
const addImage = jest.fn()
const addPage = jest.fn()
const save = jest.fn().mockResolvedValue(undefined)
jest.doMock('./load', () => ({
  loadPdfTools: async () => [
    { default: capture },
    {
      jsPDF: class {
        addImage = addImage
        addPage = addPage
        save = save
        internal = { pageSize: { getWidth: () => 100, getHeight: () => 100 } }
      },
    },
  ],
}))
const PDFExport = require('./index').default as typeof import('./index').default
beforeEach(() => {
  capture.mockReset()
  addImage.mockClear()
  addPage.mockClear()
  save.mockClear()
})
test('exports caller content, isolates unsafe capture options, paginates and releases canvas', async () => {
  const canvas = { width: 100, height: 240, toDataURL: jest.fn().mockReturnValue('data:image/png;base64,AA') }
  capture.mockResolvedValue(canvas)
  const onComplete = jest.fn()
  render(
    <PDFExport fileName="caller.pdf" onComplete={onComplete}>
      <p>Caller report</p>
    </PDFExport>
  )
  fireEvent.click(screen.getByRole('button', { name: 'Export PDF' }))
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1))
  expect(capture.mock.calls[0][0]).toHaveTextContent('Caller report')
  const options = capture.mock.calls[0][1]
  expect(options).toMatchObject({ allowTaint: false, useCORS: false })
  const external = document.createElement('img')
  external.src = 'https://external.test/a.png'
  expect(options.ignoreElements(external)).toBe(true)
  expect(options.ignoreElements(document.createElement('iframe'))).toBe(true)
  expect(addImage).toHaveBeenCalledTimes(3)
  expect(addPage).toHaveBeenCalledTimes(2)
  expect(save).toHaveBeenCalledWith('caller.pdf', { returnPromise: true })
  expect(canvas.width).toBe(0)
  expect(canvas.height).toBe(0)
})
test('suppresses save after unmount and disposes a late canvas', async () => {
  let resolve!: (canvas: unknown) => void
  capture.mockReturnValue(
    new Promise((yes) => {
      resolve = yes
    })
  )
  const { unmount } = render(
    <PDFExport>
      <p>Report</p>
    </PDFExport>
  )
  fireEvent.click(screen.getByRole('button', { name: 'Export PDF' }))
  await waitFor(() => expect(capture).toHaveBeenCalled())
  unmount()
  const canvas = { width: 20, height: 20 }
  await act(async () => resolve(canvas))
  expect(save).not.toHaveBeenCalled()
  expect(canvas.width).toBe(0)
})
test('reports capture failure and restores export button', async () => {
  capture.mockRejectedValue(new Error('capture failed'))
  const onError = jest.fn()
  render(<PDFExport onError={onError} />)
  fireEvent.click(screen.getByRole('button', { name: 'Export PDF' }))
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
  expect(screen.getByRole('button')).toBeEnabled()
})
