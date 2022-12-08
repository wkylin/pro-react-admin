import { useRef, useState, useEffect, useCallback } from 'react'

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const uploadRef = useRef<XMLHttpRequest | null>(null)

  useEffect(
    () => () => {
      if (uploadRef.current) {
        uploadRef.current.abort()
      }
    },
    []
  )

  const uploadImage = useCallback(
    async ({
      file,
      uploadURL,
      onUploadComplete,
      onUploadError,
    }: {
      file: File
      uploadURL: string
      // eslint-disable-next-line no-unused-vars
      onUploadComplete: (response: any) => void
      // eslint-disable-next-line no-unused-vars
      onUploadError?: (error: any) => void
    }) => {
      const formData = new FormData()
      formData.append('file', file)

      uploadRef.current = new XMLHttpRequest()
      uploadRef.current.open('PUT', uploadURL)
      uploadRef.current.upload.addEventListener('progress', ({ loaded, total }) => {
        setUploadProgress((loaded * 100) / total)
      })
      uploadRef.current.send(formData)

      uploadRef.current.onload = async () => {
        const response = uploadRef.current?.response
        if (response) {
          const jsonResponse = JSON.parse(response)
          uploadRef.current = null
          onUploadComplete(jsonResponse.data || jsonResponse)
        }
      }
      uploadRef.current.onerror = async () => {
        const error = uploadRef.current?.response
        if (onUploadError) {
          onUploadError(error)
        }
      }
    },
    []
  )

  return {
    uploadImage,
    uploadProgress,
  }
}

export default useUploadImage
