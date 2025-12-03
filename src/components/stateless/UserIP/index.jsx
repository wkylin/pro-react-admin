import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { MapPin, Globe, Network, Loader2, RefreshCw } from 'lucide-react'

const UserIP = () => {
  const [ipData, setIpData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIpInfo = async (signal) => {
    setLoading(true)
    setError(null)
    try {
      // 备选方案：
      // 1. ipapi.co (推荐，支持 HTTPS，JSON 格式友好)
      // 2. ip-api.com (注意：免费版仅支持 HTTP，HTTPS 站点调用会报错)
      // 3. db-ip.com (每天限制次数)

      // 这里使用 ipapi.co，它支持 HTTPS 且字段比较标准
      const response = await fetch('https://ipapi.co/json/', { signal })

      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || '获取 IP 信息失败')
      }

      setIpData(data)
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('IP Fetch Error:', err)
      setError('无法获取位置信息，请检查网络设置')
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchIpInfo(controller.signal)
    return () => controller.abort()
  }, [])

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400'>
        <p className='mb-2 font-medium'>{error}</p>
        <button
          onClick={fetchIpInfo}
          className='flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60'
        >
          <RefreshCw size={16} /> 重试
        </button>
      </div>
    )
  }

  return (
    <div className='relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-900/50'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>当前网络信息</h2>
        {loading && <Loader2 className='animate-spin text-neutral-400' size={20} />}
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* IP Address */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
            <Globe size={16} />
            <span>IP 地址</span>
          </div>
          <div className='text-xl font-bold text-neutral-900 dark:text-neutral-100'>
            {loading
              ? (
                <div className='h-7 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800' />
                )
              : (
                  ipData?.ip
                )}
          </div>
        </div>

        {/* Location */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
            <MapPin size={16} />
            <span>地理位置</span>
          </div>
          <div className='text-lg font-medium text-neutral-900 dark:text-neutral-100'>
            {loading
              ? (
                <div className='h-7 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800' />
                )
              : (
                <span>
                  {ipData?.country_name} {ipData?.region} {ipData?.city}
                </span>
                )}
          </div>
        </div>

        {/* ISP */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
            <Network size={16} />
            <span>网络服务商</span>
          </div>
          <div className='text-lg font-medium text-neutral-900 dark:text-neutral-100'>
            {loading
              ? (
                <div className='h-7 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800' />
                )
              : (
                  ipData?.org || ipData?.asn || '未知'
                )}
          </div>
        </div>
      </div>

      {!loading && ipData && (
        <div className='mt-6 border-t border-neutral-100 pt-4 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500'>
          数据来源: {ipData.org}
        </div>
      )}
    </div>
  )
}

export default UserIP
