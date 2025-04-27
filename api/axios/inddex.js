import axiosInstance from '@/services/axiosConfig'
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time))

const venuesExchange = async (data, customBaseUrl) => {
  if (customBaseUrl) {
    axiosInstance.defaults.baseURL = customBaseUrl
  } else {
    axiosInstance.defaults.baseURL = ''
  }
  const response = await axiosInstance.post('/video/clientMeeting/checkExpertInfo', data)
  return response
}

export { venuesExchange, sleep }
