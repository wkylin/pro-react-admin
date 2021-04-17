import React, { useState } from 'react'
import BasicInfo from 'container/basicInfo'

const Basic = () => {
  const [editFlag] = useState(true)
  return (
    <>
      <BasicInfo editFlag={editFlag}/>
    </>
  )
}

export default Basic
