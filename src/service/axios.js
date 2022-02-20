// https://axios-http.com/
// https://axios-http.com/docs/cancellation
// https://www.npmjs.com/package/axios-retry
import axios from 'axios'

axios.get('endpointURL').then((res) => {
  console.log(res.data)
})

// cancel token
// useEffect(() => {
//   const controller = new AbortController()

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get(`endpointURL`, {
//         signal: controller.signal,
//       })
//       console.log(response.data)
//     } catch (err) {
//       console.log('There was a problem or request was cancelled.')
//     }
//   }
//   fetchPost()

//   return () => {
//     controller.abort()
//   }
// }, [])
