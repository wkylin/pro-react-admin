import React, { useState } from 'react'
import { Upload, Button, Progress, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import axios from 'axios'

const FileUpload = () => {
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [percent, setPercent] = useState(0)

  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })

    setUploading(true)

    console.log('formData', formData)

    axios({
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress: (progressEvent) => {
        // Do whatever you want with the native progress event
        console.log('progressEvent', progressEvent)
        const completedPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total)

        setPercent(completedPercent)
      },
    })
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
      .catch((error) => {
        setUploading(false)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        setPercent(0)
        message.error(error.message)
        // console.log(error.config)
      })
  }

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList((preFileList) => [...preFileList, file])
      return false
    },
    fileList,
    multiple: true,
  }

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      {`FileList: ${JSON.stringify(fileList, null, 2)}`}
      {`percent: ${percent}`}
      <Progress percent={percent} />
    </>
  )
}

export default FileUpload
