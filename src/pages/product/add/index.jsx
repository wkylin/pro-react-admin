import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps

const AddCoupons = () => (
  <>
    <Steps current={1}>
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>

    <div style={{ height: 10000 }}>Scroll to top</div>
  </>
)

export default AddCoupons
