// https://axios-http.com/
// https://axios-http.com/docs/cancellation
import axios from 'axios'

axios.get('endpointURL').then((res) => {
  console.log(res.data)
})

// cancel token
// useEffect(() => {
//   const source = axios.CancelToken.source() // <-- 1st step
//   const controller = new AbortController()

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`endpointURL`, {
//         cancelToken: source.token, // <-- 2nd step
//         signal: controller.signal,
//       })
//       console.log(response.data)
//     } catch (err) {
//       console.log('There was a problem or request was cancelled.')
//     }
//   }
//   fetchPost()

//   return () => {
//     // cancel the request (the message parameter is optional)
//     source.cancel('Operation canceled by the user.') // <-- 3rd step

//     // the message parameter is not supported
//     controller.abort()
//   }
// }, [])
