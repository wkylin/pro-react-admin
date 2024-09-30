import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import Barcode from 'react-barcode'

const MyBarcode = () => (
  <FixTabPanel>
    <Barcode value='https://github.com/wkylin/pro-react-admin' />
  </FixTabPanel>
)

export default MyBarcode
