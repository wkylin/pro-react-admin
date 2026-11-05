import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import Barcode from 'react-barcode'

const MyBarcode = () => (
  <FixTabPanel fill={false}>
    <div className={`${pageStyles.content} ${pageStyles.horizontal}`}>
      <Barcode value="https://github.com/wkylin/pro-react-admin" />
    </div>
  </FixTabPanel>
)

export default MyBarcode
