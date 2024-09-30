import React, { useRef } from 'react'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { useReactToPrint } from 'react-to-print'

const MyPrint = () => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <FixTabPanel>
      <div ref={componentRef}>This contains all the files you intend to export[download]</div>
      <Button onClick={handlePrint}>Print</Button>
    </FixTabPanel>
  )
}

export default MyPrint
