// https://axios-http.com/
// https://axios-http.com/docs/cancellation
// https://www.npmjs.com/package/axios-retry
import axios from 'axios'

import { useEffect, useState } from 'react'

// Get 方式
const useFetcher = ({ url }) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    status: 'idle',
  })

  useEffect(() => {
    const controller = new AbortController()
    let shouldSetData = true
    setState({ data: null, error: null, status: 'loading' })
    ;(async () => {
      try {
        const response = await axios.get(url, { signal: controller.signal })
        if (shouldSetData) {
          setState({ data: response, error: null, status: 'resolved' })
        }
      } catch (error) {
        if (shouldSetData) {
          setState({ data: null, error, status: 'errored' })
        }
      }
    })()
    return () => {
      shouldSetData = false
      controller.abort()
    }
  }, [url])
  return state
}

export default useFetcher

// 下载需要指定 responseType: 'blob'
// 另参见 aidFn.js中 getFileType 及 exportFile
// .then(async (response) => {
//   const contentType = response.headers['content-type'];
//   const responseType = response.config.responseType;
//   const fileReader = new FileReader();
//   let resData = null;
//   let isBlob = ['arraybuffer', 'blob'].includes(responseType);
//   if (!isBlob) {
//     resData = response.data;
//     if (resData.status === -1) {
//       message.error(resData.message);
//     }
//     return resData;
//   } else {
//     if (contentType.indexOf('application/json') > -1) {
//       fileReader.onloadend = () => {
//         let jsonData = JSON.parse(fileReader.result as string);
//         if (jsonData.status === -1) {
//           message.error(jsonData.message);
//         }
//         return jsonData;
//       };
//       fileReader.readAsText(response.data);
//     } else {
//       resData = response;
//     }
//   }
//   return resData;
// })
