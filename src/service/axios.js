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
// 后端设置：
// response.setHeader("Access-Control-Expose-Headers", "Content-Disposition")
// response.setHeader("Content-Disposition", "attchment; filename*=UTF8''真实文件名.pdf")
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

// 'use strict';
// import axios from 'axios';
// import { notification, message } from 'antd';
// import env from '../../env.js';

// message.config({
//   maxCount: 1,
//   duration: 2,
// });
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const errorText = codeMessage[response.status] || response.statusText;
//   if (response.status !== 401) {
//     notification.error({
//       message: `请求错误 ${response.status}: ${response.url}`,
//       description: errorText,
//     });
//   }
//   const error = new Error(errorText);
//   error.name = response.status;
//   error.response = response;
//   throw error;
// }
// // 设置axios的返回拦截(超时)
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.message.includes('timeout')) {
//       return Promise.reject(error); // reject这个错误信息
//     } // 判断请求异常信息中是否含有超时timeout字符串
//     return Promise.reject(error);
//   },
// );

// const useRequest = (
//   url,
//   params,
//   method,
//   responseType='json',
// ) => {
//   try {
//     let token =
//       process.env.NODE_ENV === 'production'
//         ? localStorage.loginToken
//         : 'cn-7b2a1742-6408-495c-9fcf-c30025dbebfd-ut';
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//     }
//   } catch (e) {
//     console.error(e);
//   }
//   const options = {
//     // `url` 是用于请求的服务器 URL
//     url: url,
//     // `method` 是创建请求时使用的方法 get 或者 post 是小写
//     method: method,
//     // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
//     // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
//     baseURL:
//       process.env.NODE_ENV === 'production'
//         ? env.prod.API_PREFIX
//         : env.dev.API_PREFIX,
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     responseType,
//     timeout: 10000,
//   };

//   if (method === 'post' && !URLMount) {
//     options.data = params;
//   } else {
//     options.params = { ...params };
//   }
//   return axios(options)
//     .then(checkStatus)
//     .then(async (response) => {
//       const contentType = response.headers['content-type'];
//       const responseType = response.config.responseType;
//       const fileReader = new FileReader();
//       let resData = null;
//       let isBlob = ['arraybuffer', 'blob'].includes(responseType);
//       if (!isBlob) {
//         resData = response.data;
//         if (resData.status === -1) {
//           message.error(resData.message);
//         }
//         return resData;
//       } else {
//         if (contentType.indexOf('application/json') > -1) {
//           fileReader.onloadend = () => {
//             let jsonData = JSON.parse(fileReader.result);
//             if (jsonData.status === -1) {
//               message.error(jsonData.message);
//             }
//             return jsonData;
//           };
//           fileReader.readAsText(response.data);
//         } else {
//           resData = response;
//         }
//       }
//       return resData;
//     })
//     .catch((error) => {
//       try {
//         let { status, data, statusText } = error.response;
//         if (status === 400) {
//           message.error(data.message || statusText);
//         }
//         if (status === 401) {
//           message.info('请重新登录！', () => {
//             setTimeout(() => {
//               let url = env.prod.BASE_URL + '/login';
//               window.open(url, '_self');
//             }, 0);
//           });
//         }
//         if (status === 403) {
//           history.push('/exception/403');
//           return;
//         }
//         if (status <= 504 && status >= 500) {
//           history.push('/exception/500');
//           return;
//         }
//         if (status >= 404 && status < 422) {
//           history.push('/exception/404');
//         }
//       } catch {
//         history.push('/exception/404');
//       }
//       return error.response;
//     });
// }

// export default useRequest
