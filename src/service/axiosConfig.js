import axios from 'axios'

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.APP_BASE_URL || '', // Default base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      // Handle different status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('token')
          // You might want to redirect to login page here
          break
        case 403:
          // Handle forbidden access
          break
        case 404:
        // Handle not found
        case 500:
          // Handle server error
          break
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

// 保存文件到本地
const saveFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 下载文件
export const downloadFile = async (url, data, onDownloadProgress, setProgress, setProgressStatus, filename) => {
  try {
    setProgressStatus('default')
    setProgress(0)
    const response = await axios({
      method: 'POST',
      url: process.env.APP_BASE_URL + url,
      responseType: 'blob',
      data,
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(progress)
        } else {
          console.log('Download progress: unknown')
        }
        if (onDownloadProgress) {
          onDownloadProgress(progressEvent)
        }
      }
    })
    setProgressStatus('success')
    saveFile(response.data, filename)
  } catch (error) {
    setProgressStatus('exception')
  } finally {
    setProgress(100)
  }
}

export default axiosInstance
