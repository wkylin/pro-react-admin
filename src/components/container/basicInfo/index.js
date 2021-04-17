import React from 'react'
import { Form, Input, Tag } from 'antd'
// import { baseUrl, useFetch } from '@/service'

const { TextArea } = Input

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

const BasicInfo = (props) => {
  const [form] = Form.useForm()
  const { editFlag, saleChannel } = props

  const channels = []
  if (saleChannel && (saleChannel === 1 || saleChannel[0] === 1)) {
    channels.push(1)
  } else {
    if ((saleChannel & 16911) !== 0) {
      channels.push(16911)
    }

    if ((saleChannel & 16) !== 0) {
      channels.push(16)
    }
  }

  if ((saleChannel & 2048) !== 0) {
    channels.push(2048)
  }

  if ((saleChannel & 64) !== 0) {
    channels.push(64)
  }

  const onFinish = (values) => {
    console.log(values)
  }

  let statusDesc, className
  const activityStatus = form.getFieldValue('status')
  switch (activityStatus) {
    case 'NOT_ENABLED':
      className = 'warning'
      statusDesc = '待提交'
      break
    case 'AUDITING':
      className = 'success'
      statusDesc = '审核中'
      break
    case 'NOT_START':
      className = 'gold'
      statusDesc = '未开始'
      break
    case 'AVAILABLE':
      className = 'gold'
      statusDesc = '生效中'
      break
    case 'DISABLED':
      className = 'gold'
      statusDesc = '已关闭'
      break
    case 'COMPLETED':
      className = 'gold'
      statusDesc = '已完结'
      break
    case 'ABANDONED':
      className = 'error'
      statusDesc = '审核不通过'
      break
  }

  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        {editFlag ? (
          <Form.Item name="status" label="活动状态">
            <Tag color={className}>{statusDesc}</Tag>
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item
          name="activityCode"
          label="活动代码"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="请填写活动代码，若不填写则自动生成" disabled={editFlag} />
        </Form.Item>
        <Form.Item
          name="activityName"
          label="活动名称"
          extra={
            channels && channels.indexOf('16') > -1 && channels !== '16911' ? '京东到家：截取前6个字作为活动广告语' : ''
          }
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入活动名称，30字以内" disabled={editFlag} />
        </Form.Item>
        <Form.Item
          name="description"
          label="活动描述"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea placeholder="请输入活动描述，100字以内" rows={4} disabled={editFlag} />
        </Form.Item>
      </Form>
    </>
  )
}

export default BasicInfo
