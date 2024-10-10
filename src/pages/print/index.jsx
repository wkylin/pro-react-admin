import React, { useRef } from 'react'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { useReactToPrint } from 'react-to-print'

import ComponentToPrint from './test/toPrint'

const MyPrint = () => {
  const componentRef = React.useRef(null)

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called')
  }, [])

  const handleBeforePrint = React.useCallback(() => {
    console.log('`onBeforePrint` called')
    return Promise.resolve()
  }, [])

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'AwesomeFileName',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint
  })
  return (
    <FixTabPanel>
      <ComponentToPrint ref={componentRef} />
      <Button type='primary' onClick={printFn}>
        Print
      </Button>
    </FixTabPanel>
  )
}

export default MyPrint
