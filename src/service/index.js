// https://github.com/ava/use-http
// https://react-query-v2.tanstack.com/
// https://github.com/umijs/umi-request
// https://www.npmjs.com/package/merced-react-hooks
// https://www.npmjs.com/package/react-request

import { reqFetch, getFetch, postFetch, putFetch, deleteFetch, patchFetch } from './fetch'
import { useReqFetch, usePostFetch, useGetFetch, usePutFetch, useDeleteFetch, usePatchFetch } from './useFetch'

export {
  useReqFetch,
  usePostFetch,
  useGetFetch,
  usePutFetch,
  useDeleteFetch,
  usePatchFetch,
  reqFetch,
  getFetch,
  postFetch,
  putFetch,
  deleteFetch,
  patchFetch,
}
