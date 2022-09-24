import React from 'react'
import { useGetFetch } from '@src/service'

const ShopsList = () => {
  const [booksRes, booksLoading, booksError] = useGetFetch('/faker/shops')

  return (
    <>
      <h4>ShopsList:</h4>
      <h4>{booksLoading && 'Books Loading...'}</h4>
      <h4>{booksError && 'error'}</h4>
      <h4>{booksRes?.map((item) => item.shopName)}</h4>
    </>
  )
}

export default ShopsList
