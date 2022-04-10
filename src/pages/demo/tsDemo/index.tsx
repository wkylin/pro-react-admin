import React from 'react'

import { useGetFetch } from '@src/service'

import UserDemo from './user'

const TsDemo: React.FC = () => {
  const [booksLoading, booksError] = useGetFetch('/faker/shops')
  return (
    <>
      <div>TSX is cool!</div>
      <h4>ShopsList:</h4>
      <h4>{booksLoading && 'Books Loading...'}</h4>
      <h4>{booksError && 'error'}</h4>
      {/* <h4>{booksRes?.map((item: { shopName: any }) => item.shopName)}</h4> */}

      <UserDemo user={{ name: 'wkylin', age: 16, address: 'shanghai', dob: new Date('2022-01-01') }} />
    </>
  )
}

export default TsDemo
