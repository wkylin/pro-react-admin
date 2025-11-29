import React, { useRef, useState } from 'react'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { useReactToPrint } from 'react-to-print'

import ComponentToPrint from './test/toPrint'

const MyPrint = () => {
  const componentRef = React.useRef(null)
  const [loading, setLoading] = useState(false)

  const handleAfterPrint = React.useCallback(() => {
    setLoading(false)
  }, [])

  const handleBeforePrint = React.useCallback(() => {
    setLoading(true)
    return Promise.resolve()
  }, [])

  const handlePrintError = React.useCallback(() => {
    setLoading(false)
  }, [])

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'AwesomeFileName',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
    onPrintError: handlePrintError,
  })
  return (
    <FixTabPanel>
      <ComponentToPrint ref={componentRef} />
      <Button type="primary" onClick={printFn} loading={loading}>
        Print
      </Button>
    </FixTabPanel>
  )
}

export default MyPrint
